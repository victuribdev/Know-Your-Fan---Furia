
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationErrors } from "@/hooks/useCadastroForm";

interface PessoalInfoStepProps {
  formData: {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
  };
  errors: ValidationErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PessoalInfoStep: React.FC<PessoalInfoStepProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              name="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              className={`bg-muted/50 ${errors.nome ? "border-red-500" : ""}`}
            />
            {errors.nome && (
              <p className="text-sm text-red-500 mt-1">{errors.nome}</p>
            )}
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              name="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
              className={`bg-muted/50 ${errors.cpf ? "border-red-500" : ""}`}
            />
            {errors.cpf && (
              <p className="text-sm text-red-500 mt-1">{errors.cpf}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className={`bg-muted/50 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={formData.telefone}
              onChange={handleChange}
              className={`bg-muted/50 ${errors.telefone ? "border-red-500" : ""}`}
            />
            {errors.telefone && (
              <p className="text-sm text-red-500 mt-1">{errors.telefone}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PessoalInfoStep;
