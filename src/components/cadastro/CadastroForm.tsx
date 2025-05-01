import React from "react";
import { Button } from "@/components/ui/button";
import FormStepIndicator from "@/components/FormStepIndicator";
import PessoalInfoStep from "@/components/cadastro/PessoalInfoStep";
import EnderecoStep from "@/components/cadastro/EnderecoStep";
import InteressesStep from "@/components/cadastro/InteressesStep";
import RedesSociaisStep from "@/components/cadastro/RedesSociaisStep";
import DocumentosStep from "@/components/cadastro/DocumentosStep";
import { useCadastroForm } from "@/hooks/useCadastroForm";
import { gamesList } from "@/utils/cadastroTypes";

const formSteps = ["Informações Pessoais", "Endereço", "Interesses", "Redes Sociais", "Documentos"];

const CadastroForm: React.FC = () => {
  const {
    formData,
    setFormData,
    currentStep,
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
  } = useCadastroForm();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PessoalInfoStep 
            formData={formData} 
            errors={errors}
            handleChange={handleChange} 
          />
        );
      case 1:
        return (
          <EnderecoStep 
            formData={formData} 
            errors={errors}
            handleChange={handleChange} 
          />
        );
      case 2:
        return (
          <InteressesStep 
            formData={formData} 
            errors={errors}
            handleChange={handleChange} 
            handleInterestToggle={handleInterestToggle}
            gamesList={gamesList}
          />
        );
      case 3:
        return (
          <RedesSociaisStep 
            formData={formData} 
            handleChange={handleChange}
            setSocialInputs={(inputs) => setFormData(prev => ({ ...prev, ...inputs }))}
          />
        );
      case 4:
        return (
          <DocumentosStep 
            formData={formData} 
            errors={errors}
            uploadedDocumentFile={uploadedDocumentFile}
            handleCheckboxChange={handleCheckboxChange}
            handleFileChange={handleFileChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <FormStepIndicator steps={formSteps} currentStep={currentStep} />
      
      {renderStep()}
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Voltar
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={isUploading}
          className="bg-accent hover:bg-accent/90"
        >
          {isUploading ? "Processando..." : currentStep === formSteps.length - 1 ? "Finalizar" : "Próximo"}
        </Button>
      </div>
    </div>
  );
};

export default CadastroForm;
