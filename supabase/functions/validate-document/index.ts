
/**
 * Edge Function para Validação de Documentos
 * 
 * Esta função serve como API segura que integra com a OpenAI para validar
 * documentos de identidade enviados pelos usuários. A função analisa imagens
 * de documentos usando o modelo GPT-4o e fornece um resultado detalhado.
 * 
 * @module functions/validate-document
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Cabeçalhos CORS para permitir requisições de diferentes origens
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificar se a chave da API OpenAI está configurada
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { documentUrl, documentType } = await req.json();

    if (!documentUrl) {
      throw new Error('Document URL is required');
    }

    // Download da imagem do Storage
    const { data: supabaseClient } = await supabaseBrowserClient(req);
    const bucketResponse = await supabaseClient.storage.from('user-documents').download(documentUrl);
    
    if (!bucketResponse.data) {
      throw new Error('Failed to download document from storage');
    }

    // Converter para base64
    const buffer = await bucketResponse.data.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

    // Preparar mensagem de sistema baseada no tipo de documento
    let systemMessage = "You are a document validator. Analyze the provided document image and verify if it appears to be a valid identification document. ";
    if (documentType === "ID") {
      systemMessage += "Focus on elements typically found in official ID documents: photo, name, document number, official seals or watermarks. Be particularly alert for signs of tampering, inconsistencies, or photoshopping.";
    } else if (documentType === "DRIVERS_LICENSE") {
      systemMessage += "Check for standard driver's license features: photo, name, license number, issue/expiration dates, and official seals. Flag any irregularities that could indicate forgery.";
    }

    // Enviar para a API da OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemMessage
          },
          {
            role: "user", 
            content: [
              { 
                type: "text", 
                text: "Please analyze this ID document and tell me if it appears to be a valid official document. Provide a detailed assessment including any potential issues or red flags. Finally, give a confidence score from 0-100% about this document's legitimacy."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${base64}`
                }
              }
            ]
          }
        ],
        max_tokens: 500
      }),
    });

    const result = await response.json();
    
    // Extrair resultados da validação
    const analysisText = result.choices?.[0]?.message?.content || "Unable to analyze document";
    
    // Extração simples da pontuação de confiança (procura por porcentagens no texto)
    const confidenceMatch = analysisText.match(/(\d+)(%|percent|confidence)/i);
    const confidenceScore = confidenceMatch ? parseInt(confidenceMatch[1]) : null;
    
    // Determinar se o documento passa na validação (acima de 70% de confiança)
    const isValid = confidenceScore !== null && confidenceScore >= 70;

    // Retornar resposta formatada
    return new Response(JSON.stringify({ 
      isValid,
      confidenceScore,
      analysis: analysisText,
      status: isValid ? 'approved' : 'rejected'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error validating document:', error);
    
    // Retornar erro formatado
    return new Response(JSON.stringify({ 
      error: error.message,
      status: 'error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * Helper para obter cliente Supabase autenticado usando cabeçalhos da requisição
 * 
 * @param {Request} req - Objeto de requisição
 * @returns {Object} Cliente Supabase configurado para operações de storage
 */
async function supabaseBrowserClient(req: Request) {
  const authHeader = req.headers.get('Authorization') || '';
  const apikey = req.headers.get('apikey') || '';
  
  return { data: { 
    storage: { 
      from: (bucket: string) => ({
        download: async (path: string) => {
          const url = `https://vkzbcqdjvcggscmkbldz.supabase.co/storage/v1/object/public/${bucket}/${path}`;
          const response = await fetch(url, {
            headers: { Authorization: authHeader, apikey }
          });
          
          if (!response.ok) {
            throw new Error(`Failed to download: ${response.statusText}`);
          }
          
          const blob = await response.blob();
          return { data: blob };
        }
      }) 
    } 
  }};
}
