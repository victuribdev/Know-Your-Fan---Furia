
/**
 * Componente de Validação de Documentos
 * 
 * Este componente gerencia o processo de validação de documentos de identidade
 * usando inteligência artificial através de uma Edge Function do Supabase.
 * 
 * O componente exibe um card com status de validação, permite iniciar o processo
 * e mostra o resultado com pontuação de confiança.
 * 
 * @module components/DocumentValidation
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface DocumentValidationProps {
  documentPath: string;
  documentType: 'ID' | 'DRIVERS_LICENSE';
  onValidationComplete?: (result: ValidationResult) => void;
}

export interface ValidationResult {
  isValid: boolean;
  confidenceScore: number | null;
  analysis: string;
  status: 'approved' | 'rejected' | 'pending' | 'error';
}

/**
 * Componente DocumentValidation
 * 
 * @param {DocumentValidationProps} props - Propriedades do componente
 * @param {string} props.documentPath - Caminho do documento no storage do Supabase
 * @param {string} props.documentType - Tipo de documento a ser validado
 * @param {Function} props.onValidationComplete - Callback executado quando a validação é concluída
 * @returns {JSX.Element} Componente de validação de documentos
 */
const DocumentValidation = ({ documentPath, documentType, onValidationComplete }: DocumentValidationProps) => {
  const { toast } = useToast();
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  /**
   * Inicia o processo de validação do documento
   * 
   * Chama a Edge Function validate-document e processa o resultado
   */
  const startValidation = async () => {
    setIsValidating(true);
    
    try {
      // Obter URL pública do documento
      const { data: publicUrl } = supabase.storage
        .from('user-documents')
        .getPublicUrl(documentPath);
      
      // Chamar a Edge Function para validar o documento
      const { data, error } = await supabase.functions.invoke("validate-document", {
        body: { documentUrl: documentPath, documentType },
      });

      if (error) throw error;

      setValidationResult(data);
      
      if (onValidationComplete) {
        onValidationComplete(data);
      }
      
      toast({
        title: data.isValid ? "Documento validado" : "Documento rejeitado",
        description: data.isValid 
          ? "Seu documento foi verificado com sucesso." 
          : "Houve problemas com a validação do seu documento.",
        variant: data.isValid ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error validating document:", error);
      
      const errorResult = {
        isValid: false,
        confidenceScore: null,
        analysis: error instanceof Error ? error.message : "Erro desconhecido ao validar documento",
        status: 'error' as const
      };
      
      setValidationResult(errorResult);
      
      if (onValidationComplete) {
        onValidationComplete(errorResult);
      }
      
      toast({
        title: "Erro na validação",
        description: "Ocorreu um erro ao validar seu documento. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * Retorna o ícone baseado no estado da validação
   */
  const getStatusIcon = () => {
    if (!validationResult) return <Clock className="h-8 w-8 text-muted-foreground" />;
    
    if (validationResult.status === 'error') {
      return <AlertCircle className="h-8 w-8 text-destructive" />;
    }
    
    return validationResult.isValid 
      ? <CheckCircle className="h-8 w-8 text-green-500" /> 
      : <AlertCircle className="h-8 w-8 text-destructive" />;
  };

  /**
   * Retorna o badge de status baseado no estado da validação
   */
  const getStatusBadge = () => {
    if (!validationResult) return <Badge variant="outline">Pendente</Badge>;
    
    if (validationResult.status === 'error') {
      return <Badge variant="destructive">Erro</Badge>;
    }
    
    return validationResult.isValid 
      ? <Badge variant="default" className="bg-green-500">Aprovado</Badge>
      : <Badge variant="destructive">Rejeitado</Badge>;
  };

  return (
    <Card className="border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Validação de Documento
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>
          Nossa IA analisará seu documento para verificar sua autenticidade
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isValidating ? (
          <div className="flex flex-col items-center space-y-4 py-6">
            <div className="relative">
              <svg className="animate-spin h-10 w-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">Analisando documento...</p>
            <Progress value={45} className="h-2 w-full" />
          </div>
        ) : (
          <>
            {validationResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-4">
                  {getStatusIcon()}
                </div>
                
                {validationResult.confidenceScore !== null && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Confiança</span>
                      <span>{validationResult.confidenceScore}%</span>
                    </div>
                    <Progress 
                      value={validationResult.confidenceScore} 
                      className={`h-2 ${
                        validationResult.confidenceScore >= 70 ? "bg-green-500" : 
                        validationResult.confidenceScore >= 40 ? "bg-yellow-500" : 
                        "bg-red-500"
                      }`} 
                    />
                  </div>
                )}
                
                <div className="border rounded-md p-3 text-sm">
                  <p className="font-medium mb-1">Análise:</p>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {validationResult.analysis}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Clique no botão abaixo para iniciar a validação do seu documento
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center">
        {!validationResult && !isValidating && (
          <Button 
            onClick={startValidation}
            className="bg-accent hover:bg-accent/90"
          >
            Iniciar Validação
          </Button>
        )}
        
        {validationResult && validationResult.status === 'error' && (
          <Button 
            onClick={startValidation}
            variant="outline"
          >
            Tentar Novamente
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DocumentValidation;
