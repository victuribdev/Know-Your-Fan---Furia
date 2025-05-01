
import React from "react";
import PageLayout from "@/components/PageLayout";
import CadastroForm from "@/components/cadastro/CadastroForm";

const Cadastro: React.FC = () => {
  return (
    <PageLayout 
      title="Cadastro de Fã" 
      subtitle="Complete o formulário para se juntar à nossa comunidade de eSports"
    >
      <CadastroForm />
    </PageLayout>
  );
};

export default Cadastro;
