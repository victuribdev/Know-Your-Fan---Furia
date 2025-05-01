
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ValidationErrors } from "@/hooks/useCadastroForm";

interface DocumentosStepProps {
  formData: {
    aceitaTermos: boolean;
  };
  errors: ValidationErrors;
  uploadedDocumentFile: File | null;
  handleCheckboxChange: (checked: boolean) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentosStep: React.FC<DocumentosStepProps> = ({
  formData,
  errors,
  uploadedDocumentFile,
  handleCheckboxChange,
  handleFileChange,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <Label>Upload de Documento</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Faça o upload de um documento com foto para verificação (RG, CNH)
            </p>
            
            <div 
              className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer"
              onClick={() => document.getElementById('documentUpload')?.click()}
            >
              <div className="flex flex-col items-center justify-center">
                <input
                  type="file"
                  id="documentUpload"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground mb-3"
                >
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                  <path d="M12 12v9"></path>
                  <path d="m16 16-4-4-4 4"></path>
                </svg>
                {uploadedDocumentFile ? (
                  <div className="text-sm">
                    <span className="font-medium">Arquivo selecionado:</span> {uploadedDocumentFile.name}
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-1">
                      Arraste e solte seu documento aqui
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ou <span className="text-accent underline">escolha um arquivo</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              id="aceitaTermos"
              checked={formData.aceitaTermos}
              onCheckedChange={handleCheckboxChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="aceitaTermos"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Eu aceito os termos e condições
              </label>
              <p className="text-sm text-muted-foreground">
                Ao marcar esta caixa, você concorda com nossos{" "}
                <a href="#" className="text-accent underline">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="#" className="text-accent underline">
                  Política de Privacidade
                </a>
                .
              </p>
              {errors.aceitaTermos && (
                <p className="text-sm text-red-500 mt-1">{errors.aceitaTermos}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentosStep;
