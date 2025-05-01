
/**
 * Edge Function para Validação de Perfis de eSports
 * 
 * Esta função valida perfis de usuários em plataformas de eSports,
 * analisando sua relevância, jogos associados e conexões com equipes.
 * Usa a API da OpenAI para análise avançada e retorna resultados
 * detalhados sobre o perfil.
 * 
 * @module functions/validate-esports-profile
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

    const { profileUrl, username, platform, userInterests } = await req.json();

    if (!profileUrl) {
      throw new Error('Profile URL is required');
    }

    /**
     * Função para buscar e analisar dados de perfil da URL fornecida
     * 
     * @param {string} url - URL do perfil para análise
     * @param {string} platform - Nome da plataforma de eSports
     * @returns {Object} Dados extraídos do perfil e status do resultado
     */
    const fetchProfileData = async (url: string, platform: string) => {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; EsportsFanApp/1.0)',
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Extrair dados básicos do perfil com base na plataforma
        let extractedData = { username: '', description: '', activities: [] };
        
        // Extração simplificada para fins de demonstração
        if (platform.toLowerCase() === 'furia') {
          extractedData.username = username || url.split('/').pop() || '';
          
          // Extração básica de conteúdo - apenas para demonstração
          if (html.includes('profile-header') || html.includes('user-profile')) {
            extractedData.description = 'Found FURIA profile page content';
            
            // Procurar por padrões comuns
            if (html.toLowerCase().includes('cs') || html.toLowerCase().includes('counter') || 
                html.toLowerCase().includes('csgo') || html.toLowerCase().includes('cs2')) {
              extractedData.activities.push('CS2/CSGO interest detected');
            }
            
            if (html.toLowerCase().includes('valorant')) {
              extractedData.activities.push('Valorant interest detected');
            }
            
            if (html.toLowerCase().includes('tournament') || html.toLowerCase().includes('championship')) {
              extractedData.activities.push('Tournament participation detected');
            }
          }
        } else if (platform.toLowerCase() === 'faceit') {
          extractedData.username = username || url.split('/').pop() || '';
          
          if (html.includes('player-profile') || html.includes('faceit-user')) {
            extractedData.description = 'Found FACEIT profile page content';
            
            // Extrair estatísticas básicas
            const statsMatch = html.match(/elo["'\s:]+(\d+)/i);
            if (statsMatch && statsMatch[1]) {
              extractedData.activities.push(`ELO rating approximately ${statsMatch[1]}`);
            }
          }
        } else {
          // Extração genérica para outras plataformas
          extractedData.username = username;
          extractedData.description = `Content fetched from ${platform} profile`;
        }
        
        return {
          success: true,
          data: extractedData,
          rawHtml: html.substring(0, 1000) // Incluir apenas um trecho para análise
        };
      } catch (error) {
        console.error('Error scraping profile:', error);
        return { 
          success: false, 
          error: error.message,
          data: { username, description: 'Unable to fetch profile data' }
        };
      }
    };

    // Buscar dados do perfil
    const profileResult = await fetchProfileData(profileUrl, platform);
    let profileData = "";
    
    if (profileResult.success) {
      profileData = `Username: ${profileResult.data.username}\n` +
                   `Platform: ${platform}\n` +
                   `Description: ${profileResult.data.description}\n` +
                   `Activities: ${profileResult.data.activities.join(', ')}\n` +
                   `URL: ${profileUrl}\n` +
                   `Raw sample: ${profileResult.rawHtml?.substring(0, 300)}...`;
    } else {
      profileData = `Unable to fetch profile data from ${platform}. Using available information for analysis. Error: ${profileResult.error}`;
    }
    
    // Preparar prompt para OpenAI baseado na plataforma e interesses do usuário
    let systemPrompt = `You are an eSports profile validator. Analyze the provided eSports profile information and determine:
1. If this appears to be a genuine eSports fan profile
2. How relevant the profile's content is to eSports, particularly for games like ${userInterests?.join(', ') || 'Counter-Strike, League of Legends, Valorant'}
3. If there are any indicators this person follows or supports teams like FURIA
4. A relevance score from 0-100% measuring how strongly this profile is connected to eSports
5. Extract any specific information such as:
   - Games they play or follow
   - Teams they support
   - Tournaments they've participated in or watched
   - Skill level indicators if available

Provide detailed reasoning for your assessment.`;

    // Enviar para a API da OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user", 
            content: `Please analyze this eSports profile: ${profileUrl}\n\nUsername: ${username}\nPlatform: ${platform}\n\nAvailable profile information: ${profileData}`
          }
        ],
        max_tokens: 800
      }),
    });

    const result = await response.json();
    
    // Extrair resultados da análise
    const analysisText = result.choices?.[0]?.message?.content || "Unable to analyze profile";
    
    // Extrair pontos-chave dos dados
    // Pontuação de relevância
    const relevanceMatch = analysisText.match(/(\d+)(%|percent|relevance|score)/i);
    const relevanceScore = relevanceMatch ? parseInt(relevanceMatch[1]) : null;
    
    // Extração de jogos
    const gamesRegex = /games.*?:.*?(counter[- ]strike|cs2?|csgo|valorant|league of legends|lol|dota|apex|fortnite|free fire|rainbow six)[\s,\.]/i;
    const gamesMatches = [...analysisText.matchAll(new RegExp(gamesRegex, 'gi'))];
    const games = gamesMatches.map(match => match[1]).filter(Boolean);
    
    // Extração de times
    const teamsRegex = /teams?.*?:.*?(furia|navi|liquid|cloud9|fnatic|g2|pain|loud|mibr)[\s,\.]/i;
    const teamsMatches = [...analysisText.matchAll(new RegExp(teamsRegex, 'gi'))];
    const teams = teamsMatches.map(match => match[1]).filter(Boolean);
    
    // Determinar se o perfil é relevante (acima de 50% de relevância)
    const isRelevant = relevanceScore !== null && relevanceScore >= 50;

    // Retornar resposta formatada
    return new Response(JSON.stringify({ 
      isRelevant,
      relevanceScore,
      analysis: analysisText,
      platform,
      username,
      verified: isRelevant,
      extractedGames: games,
      extractedTeams: teams,
      profileUrl
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error validating profile:', error);
    
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
