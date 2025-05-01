
/**
 * Componente para validação de perfis de eSports
 * 
 * Este componente permite aos usuários validar seus perfis em diferentes
 * plataformas de eSports usando IA para analisar sua relevância e autenticidade.
 * 
 * @module components/EsportsProfileValidator
 */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Award, Check } from "lucide-react";

interface EsportsProfileValidatorProps {
  onValidationComplete?: (result: {
    isRelevant: boolean;
    relevanceScore: number | null;
    analysis: string;
    platform: string;
    username: string;
    verified: boolean;
    extractedGames?: string[];
    extractedTeams?: string[];
    profileUrl: string;
  }) => void;
  platform?: string;
  username?: string;
  profileUrl?: string;
  userInterests?: string[];
}

/**
 * Componente EsportsProfileValidator
 * 
 * Este componente permite que os usuários validem seus perfis em plataformas de eSports,
 * verificando sua relevância e autenticidade usando IA.
 * 
 * @param {EsportsProfileValidatorProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente de validação de perfil de eSports
 */
const EsportsProfileValidator: React.FC<EsportsProfileValidatorProps> = ({
  onValidationComplete,
  platform = "",
  username = "",
  profileUrl = "",
  userInterests = [],
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isRelevant?: boolean;
    relevanceScore?: number | null;
    analysis?: string;
    platform?: string;
    username?: string;
    verified?: boolean;
    extractedGames?: string[];
    extractedTeams?: string[];
    profileUrl?: string;
  } | null>(null);
  const [inputUrl, setInputUrl] = useState(profileUrl);
  const [inputUsername, setInputUsername] = useState(username);
  const [inputPlatform, setInputPlatform] = useState(platform || "FURIA");

  // Lista de plataformas suportadas
  const platformOptions = [
    { value: "FURIA", label: "FURIA" },
    { value: "MIBR", label: "MIBR" },
    { value: "FACEIT", label: "FACEIT" },
    { value: "ESEA", label: "ESEA" },
    { value: "Battlefy", label: "Battlefy" },
    { value: "Gamersclub", label: "Gamersclub" },
  ];

  /**
   * Inicia o processo de validação do perfil de eSports
   * 
   * Chama a Edge Function validate-esports-profile e processa o resultado
   */
  const validateProfile = async () => {
    if (!inputUrl) {
      toast({
        title: "URL obrigatória",
        description: "Por favor, informe a URL do seu perfil",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Chamar a Edge Function para validar o perfil
      const { data, error } = await supabase.functions.invoke("validate-esports-profile", {
        body: {
          profileUrl: inputUrl,
          username: inputUsername,
          platform: inputPlatform,
          userInterests,
        },
      });

      if (error) throw error;

      setValidationResult(data);
      
      if (onValidationComplete) {
        onValidationComplete(data);
      }

      toast({
        title: data.isRelevant ? "Perfil validado!" : "Perfil não relevante",
        description: data.isRelevant 
          ? `Seu perfil foi validado com ${data.relevanceScore}% de relevância para eSports.` 
          : "Seu perfil não apresenta relevância suficiente para eSports.",
      });
    } catch (error) {
      console.error("Erro ao validar perfil:", error);
      toast({
        title: "Erro na validação",
        description: "Não foi possível validar seu perfil. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-white/10">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Validação de Perfil eSports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="platform" className="text-sm font-medium">
            Plataforma
          </label>
          <select
            id="platform"
            value={inputPlatform}
            onChange={(e) => setInputPlatform(e.target.value)}
            disabled={isLoading}
            className="w-full bg-muted/50 border border-input rounded-md h-10 px-3 py-2"
          >
            {platformOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Nome de usuário
          </label>
          <Input
            id="username"
            placeholder="Seu nome de usuário na plataforma"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="profileUrl" className="text-sm font-medium">
            Link do Perfil
          </label>
          <Input
            id="profileUrl"
            placeholder="https://exemplo.com/seu-perfil"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {validationResult && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Relevância para eSports</span>
              <Badge
                className={
                  validationResult.isRelevant ? "bg-green-600" : "bg-red-600"
                }
              >
                {validationResult.relevanceScore}%
              </Badge>
            </div>
            <Progress
              value={validationResult.relevanceScore || 0}
              className="h-2"
            />
            
            {validationResult.extractedGames && validationResult.extractedGames.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-4 w-4" />
                  <h4 className="font-medium">Jogos Detectados</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {validationResult.extractedGames.map((game, index) => (
                    <Badge key={index} variant="outline" className="bg-muted/30">
                      {game}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {validationResult.extractedTeams && validationResult.extractedTeams.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-4 w-4" />
                  <h4 className="font-medium">Times Detectados</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {validationResult.extractedTeams.map((team, index) => (
                    <Badge key={index} variant="outline" className="bg-accent/20">
                      {team}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <Separator />
            
            <div className="text-sm text-muted-foreground">
              <h4 className="font-medium text-white mb-1">Análise</h4>
              <p className="whitespace-pre-line">{validationResult.analysis}</p>
            </div>
            <div className="flex items-center">
              <Badge className={validationResult.verified ? "bg-green-600" : "bg-red-600"}>
                {validationResult.verified ? (
                  <><Check className="h-3 w-3 mr-1" /> Verificado</>
                ) : (
                  "Não Verificado"
                )}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={validateProfile}
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90"
        >
          {isLoading ? "Validando..." : "Validar Perfil"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EsportsProfileValidator;
