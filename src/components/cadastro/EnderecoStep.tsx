
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationErrors } from "@/hooks/useCadastroForm";

interface EnderecoStepProps {
  formData: {
    enderecoRua: string;
    enderecoNumero: string;
    enderecoBairro: string;
    enderecoCEP: string;
    enderecoCidade: string;
    enderecoEstado: string;
  };
  errors: ValidationErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EnderecoStep: React.FC<EnderecoStepProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="enderecoRua">Rua</Label>
              <Input
                id="enderecoRua"
                name="enderecoRua"
                placeholder="Nome da rua"
                value={formData.enderecoRua}
                onChange={handleChange}
                className={`bg-muted/50 ${errors.enderecoRua ? "border-red-500" : ""}`}
              />
              {errors.enderecoRua && (
                <p className="text-sm text-red-500 mt-1">{errors.enderecoRua}</p>
              )}
            </div>
            <div>
              <Label htmlFor="enderecoNumero">Número</Label>
              <Input
                id="enderecoNumero"
                name="enderecoNumero"
                placeholder="Nº"
                value={formData.enderecoNumero}
                onChange={handleChange}
                className={`bg-muted/50 ${errors.enderecoNumero ? "border-red-500" : ""}`}
              />
              {errors.enderecoNumero && (
                <p className="text-sm text-red-500 mt-1">{errors.enderecoNumero}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="enderecoBairro">Bairro</Label>
            <Input
              id="enderecoBairro"
              name="enderecoBairro"
              placeholder="Seu bairro"
              value={formData.enderecoBairro}
              onChange={handleChange}
              className="bg-muted/50"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="enderecoCEP">CEP</Label>
              <Input
                id="enderecoCEP"
                name="enderecoCEP"
                placeholder="00000-000"
                value={formData.enderecoCEP}
                onChange={handleChange}
                className={`bg-muted/50 ${errors.enderecoCEP ? "border-red-500" : ""}`}
              />
              {errors.enderecoCEP && (
                <p className="text-sm text-red-500 mt-1">{errors.enderecoCEP}</p>
              )}
            </div>
            <div>
              <Label htmlFor="enderecoCidade">Cidade</Label>
              <Input
                id="enderecoCidade"
                name="enderecoCidade"
                placeholder="Sua cidade"
                value={formData.enderecoCidade}
                onChange={handleChange}
                className={`bg-muted/50 ${errors.enderecoCidade ? "border-red-500" : ""}`}
              />
              {errors.enderecoCidade && (
                <p className="text-sm text-red-500 mt-1">{errors.enderecoCidade}</p>
              )}
            </div>
            <div>
              <Label htmlFor="enderecoEstado">Estado</Label>
              <Input
                id="enderecoEstado"
                name="enderecoEstado"
                placeholder="UF"
                value={formData.enderecoEstado}
                onChange={handleChange}
                className={`bg-muted/50 ${errors.enderecoEstado ? "border-red-500" : ""}`}
              />
              {errors.enderecoEstado && (
                <p className="text-sm text-red-500 mt-1">{errors.enderecoEstado}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnderecoStep;
