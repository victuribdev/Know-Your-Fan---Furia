
import React from "react";
import EsportsProfileValidator from "@/components/EsportsProfileValidator";

interface EsportsTabProps {
  userInterests: string[];
  onValidationComplete: (result: any) => void;
}

const EsportsTab = ({ userInterests, onValidationComplete }: EsportsTabProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-4">Validar Perfil de eSports</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Vincule seu perfil em plataformas de eSports para comprovar que você é um 
        verdadeiro fã e ter acesso a recursos exclusivos.
      </p>
      
      <EsportsProfileValidator 
        onValidationComplete={onValidationComplete}
        userInterests={userInterests}
      />
    </div>
  );
};

export default EsportsTab;
