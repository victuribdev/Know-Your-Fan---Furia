
import { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { submitForm } from '@/utils/formSubmitter';
import { validateFormStep } from '@/utils/formValidator';
import { FormData, ValidationErrors, gamesList } from '@/utils/cadastroTypes';

// Re-exportando gamesList para manter compatibilidade com o código existente
export { gamesList } from '@/utils/cadastroTypes';
export type { FormData, ValidationErrors } from '@/utils/cadastroTypes';

export const useCadastroForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedDocumentFile, setUploadedDocumentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    enderecoRua: "",
    enderecoNumero: "",
    enderecoBairro: "",
    enderecoCidade: "",
    enderecoEstado: "",
    enderecoCEP: "",
    interesses: [],
    bio: "",
    twitter: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    perfilFuria: "",
    aceitaTermos: false,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpar erro quando o campo é editado
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, aceitaTermos: checked }));
    
    if (errors.aceitaTermos) {
      setErrors(prev => ({ ...prev, aceitaTermos: undefined }));
    }
  }, [errors]);

  const handleInterestToggle = useCallback((gameId: number) => {
    setFormData((prev) => ({
      ...prev,
      interesses: prev.interesses.includes(gameId)
        ? prev.interesses.filter((id) => id !== gameId)
        : [...prev.interesses, gameId],
    }));
    
    if (errors.interesses) {
      setErrors(prev => ({ ...prev, interesses: undefined }));
    }
  }, [errors]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedDocumentFile(e.target.files[0]);
    }
  }, []);

  const validateCurrentStep = useCallback(() => {
    const validation = validateFormStep(formData, currentStep);
    setErrors(validation.errors);
    return validation.isValid;
  }, [currentStep, formData]);

  const handleNext = useCallback(() => {
    const isValid = validateCurrentStep();
    
    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    } else {
      toast({
        title: "Verifique os campos",
        description: "Há erros no formulário que precisam ser corrigidos.",
        variant: "destructive",
      });
    }
  }, [currentStep, validateCurrentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSubmit = async () => {
    try {
      setIsUploading(true);
      
      await submitForm(formData, uploadedDocumentFile);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para a página de validação.",
      });
      
      setTimeout(() => {
        navigate("/validacao");
      }, 2000);
      
    } catch (error: any) {
      toast({
        title: "Erro ao registrar",
        description: error.message || "Ocorreu um erro ao processar seu cadastro.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    uploadedDocumentFile,
    isUploading,
    errors,
    handleChange,
    handleCheckboxChange,
    handleInterestToggle,
    handleFileChange,
    handleNext,
    handleBack,
    validateCurrentStep,
  };
};
