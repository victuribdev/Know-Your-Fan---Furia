
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-display font-bold mb-4 text-glow">404</h1>
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl"></div>
          <p className="text-xl text-white relative">Página não encontrada</p>
        </div>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando parece não existir ou foi movida para outro endereço.
        </p>
        <Link to="/">
          <Button className="bg-accent hover:bg-accent/90">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
