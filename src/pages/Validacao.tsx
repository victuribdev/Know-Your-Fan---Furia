
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";
import DocumentValidation, { ValidationResult } from "@/components/DocumentValidation";
import { supabase } from "@/integrations/supabase/client";

const stages = [
  { id: 1, name: "Validando documentação..." },
  { id: 2, name: "Verificando dados pessoais..." },
  { id: 3, name: "Analisando perfil..." },
  { id: 4, name: "Confirmando identidade..." },
  { id: 5, name: "Pronto!" },
];

const Validacao = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [userDocument, setUserDocument] = useState<{path: string, type: 'ID' | 'DRIVERS_LICENSE'} | null>(null);
  const [documentValidated, setDocumentValidated] = useState(false);

  useEffect(() => {
    // Get current user and their document
    const fetchUserDocument = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session?.session) {
          navigate('/');
          return;
        }
        
        const userId = session.session.user.id;
        
        // Fetch the user's document
        const { data: documents, error } = await supabase
          .from('user_documents')
          .select('*')
          .eq('user_id', userId)
          .order('uploaded_at', { ascending: false })
          .limit(1);
          
        if (error) throw error;
        
        if (documents && documents.length > 0) {
          setUserDocument({
            path: documents[0].file_path,
            type: documents[0].document_type as 'ID' | 'DRIVERS_LICENSE'
          });
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };
    
    fetchUserDocument();
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // If document has been validated, accelerate progress
        const increment = documentValidated ? 2 : 0.5;
        
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prevProgress + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [documentValidated]);

  useEffect(() => {
    if (progress === 100 && !isComplete) {
      setIsComplete(true);
      toast({
        title: "Verificação concluída!",
        description: "Sua identidade foi verificada com sucesso.",
      });
    }
  }, [progress, isComplete, toast]);

  useEffect(() => {
    const stageThresholds = [20, 40, 60, 80, 100];
    const newStage = stageThresholds.findIndex((threshold) => progress < threshold);
    setCurrentStage(newStage === -1 ? stages.length - 1 : newStage);
  }, [progress]);

  const handleValidationComplete = (result: ValidationResult) => {
    setDocumentValidated(true);
    
    // If validation passed, update the document status in the database
    if (result.isValid && userDocument) {
      supabase.from('user_documents')
        .update({ 
          verification_status: result.isValid ? 'approved' : 'rejected',
          verified_at: new Date().toISOString()
        })
        .eq('file_path', userDocument.path)
        .then(({ error }) => {
          if (error) console.error("Error updating document status:", error);
        });
    }
  };

  const handleContinue = () => {
    navigate("/perfil");
  };

  return (
    <PageLayout title="Validação de Identidade" subtitle="Estamos verificando suas informações para garantir a segurança da comunidade">
      <div className="max-w-md mx-auto mb-8">
        <Card className="border border-white/10">
          <CardContent className="p-6 space-y-6">
            <div className="relative">
              <Progress value={progress} className="h-2" />
            </div>

            <div className="min-h-[200px] flex flex-col items-center justify-center text-center">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mb-6">
                {isComplete ? (
                  <div className="text-5xl animate-bounce">✅</div>
                ) : (
                  <svg
                    className="animate-spin h-10 w-10 text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </div>

              <h3 className="text-xl font-display font-bold mb-2">
                {isComplete ? "Verificação Completa!" : stages[currentStage].name}
              </h3>
              
              <p className="text-muted-foreground">
                {isComplete
                  ? "Sua identidade foi verificada com sucesso. Você agora tem acesso completo à plataforma."
                  : "Por favor, aguarde enquanto nossos sistemas verificam suas informações..."}
              </p>

              {isComplete && (
                <Button
                  onClick={handleContinue}
                  className="mt-6 bg-accent hover:bg-accent/90 btn-glow"
                >
                  Continuar para o perfil
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-xs ${
                      index <= currentStage
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStage ? "✓" : index + 1}
                  </div>
                  <span
                    className={
                      index <= currentStage ? "text-white" : "text-muted-foreground"
                    }
                  >
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {userDocument && (
        <div className="max-w-md mx-auto">
          <DocumentValidation 
            documentPath={userDocument.path} 
            documentType={userDocument.type}
            onValidationComplete={handleValidationComplete}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default Validacao;
