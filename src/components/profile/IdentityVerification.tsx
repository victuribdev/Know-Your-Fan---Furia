
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IdentityVerification = () => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Verificação de Identidade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start">
          <div className="mr-4 mt-0.5 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-green-500">Verificado</h3>
            <p className="text-sm text-muted-foreground">
              Sua identidade foi verificada em 10/04/2025. Este status garante acesso a recursos exclusivos.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default IdentityVerification;
