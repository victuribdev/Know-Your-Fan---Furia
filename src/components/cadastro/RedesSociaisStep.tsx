
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialMediaInput from "@/components/SocialMediaInput";

interface RedesSociaisStepProps {
  formData: {
    twitter: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    perfilFuria: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSocialInputs: (inputs: any) => void;
}

const RedesSociaisStep: React.FC<RedesSociaisStepProps> = ({
  formData,
  handleChange,
  setSocialInputs,
}) => {
  // Função para lidar com as alterações nos campos de redes sociais
  const handleSocialChange = (platform: string, value: string) => {
    // Atualizando diretamente o formData através da função setSocialInputs
    setSocialInputs({ [platform]: value });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <Label>Conecte suas redes sociais</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Isso nos ajuda a verificar sua identidade e conectar você com outros fãs
            </p>
            
            <div className="space-y-4 mt-2">
              <SocialMediaInput
                platform="twitter"
                value={formData.twitter || ''}
                onChange={(e) => handleChange({
                  ...e,
                  target: {...e.target, name: 'twitter'}
                })}
              />
              
              <SocialMediaInput
                platform="instagram"
                value={formData.instagram || ''}
                onChange={(e) => handleChange({
                  ...e,
                  target: {...e.target, name: 'instagram'}
                })}
              />
              
              <SocialMediaInput
                platform="facebook"
                value={formData.facebook || ''}
                onChange={(e) => handleChange({
                  ...e,
                  target: {...e.target, name: 'facebook'}
                })}
              />
              
              <SocialMediaInput
                platform="tiktok"
                value={formData.tiktok || ''}
                onChange={(e) => handleChange({
                  ...e,
                  target: {...e.target, name: 'tiktok'}
                })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="perfilFuria">Link do seu perfil FURIA (opcional)</Label>
            <Input
              id="perfilFuria"
              name="perfilFuria"
              placeholder="https://furia.gg/perfil/seu-username"
              value={formData.perfilFuria}
              onChange={handleChange}
              className="bg-muted/50"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedesSociaisStep;
