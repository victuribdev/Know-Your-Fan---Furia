
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SocialMediaInput from "@/components/SocialMediaInput";

interface SocialInputs {
  twitter: string;
  instagram: string;
  facebook: string;
  tiktok: string;
}

interface EsportsProfile {
  platform: string;
  username: string;
  url: string;
  verified: boolean;
}

interface ConnectionsTabProps {
  socialInputs: SocialInputs;
  esportsProfiles: EsportsProfile[];
  handleSocialChange: (platform: keyof SocialInputs, value: string) => void;
  onAddMoreConnections: () => void;
}

const ConnectionsTab = ({
  socialInputs,
  esportsProfiles,
  handleSocialChange,
  onAddMoreConnections
}: ConnectionsTabProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-4">Redes Sociais</h3>
      <SocialMediaInput
        platform="twitter"
        value={socialInputs.twitter}
        onChange={(e) => handleSocialChange("twitter", e.target.value)}
        className="mb-4"
      />
      <SocialMediaInput
        platform="instagram"
        value={socialInputs.instagram}
        onChange={(e) => handleSocialChange("instagram", e.target.value)}
        className="mb-4"
      />
      <SocialMediaInput
        platform="tiktok"
        value={socialInputs.tiktok}
        onChange={(e) => handleSocialChange("tiktok", e.target.value)}
        className="mb-4"
      />
      
      <Separator className="my-6" />
      
      <h3 className="font-medium mb-4">Perfis de eSports</h3>
      {esportsProfiles.map((profile, index) => (
        <div key={index} className="border rounded-lg p-4 flex items-center space-x-4">
          <div className="w-10 h-10 rounded bg-orange-600 flex items-center justify-center font-bold text-white">
            {profile.platform.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h4 className="font-medium">{profile.platform}</h4>
              {profile.verified && (
                <Badge className="ml-2 bg-green-600">Verificado</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
        </div>
      ))}
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onAddMoreConnections}
      >
        Adicionar mais conexões
      </Button>
    </div>
  );
};

export default ConnectionsTab;
