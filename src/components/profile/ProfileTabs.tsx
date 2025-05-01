
/**
 * Componente de Abas do Perfil
 * 
 * Este componente gerencia a navegação entre as diferentes seções do perfil
 * de usuário, como atividades, eventos, conexões e eSports.
 * 
 * @module components/profile/ProfileTabs
 */

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent, CardHeader } from "@/components/ui/card";
import ActivitiesTab from "./ActivitiesTab";
import EventsTab from "./EventsTab";
import ConnectionsTab from "./ConnectionsTab";
import EsportsTab from "./EsportsTab";
import EventPurchaseForm from "./EventPurchaseForm";

interface ProfileTabsProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  events: Array<{
    name: string;
    date: string;
    attended?: boolean;
    registered?: boolean;
  }>;
  socialInputs: {
    twitter: string;
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  esportsProfiles: Array<{
    platform: string;
    username: string;
    url: string;
    verified: boolean;
  }>;
  handleSocialChange: (platform: string, value: string) => void;
  handleProfileValidated: (result: any) => void;
  userInterests: string[];
}

/**
 * Componente ProfileTabs
 * 
 * @param {ProfileTabsProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente de abas do perfil
 */
const ProfileTabs = ({
  currentTab,
  setCurrentTab,
  events,
  socialInputs,
  esportsProfiles,
  handleSocialChange,
  handleProfileValidated,
  userInterests
}: ProfileTabsProps) => {
  /**
   * Manipula o envio do formulário de compra/registro de evento
   * 
   * @param {any} data - Dados do formulário de evento
   */
  const handleEventPurchaseSubmit = (data: any) => {
    console.log('Event/Purchase submitted:', data);
    // In a real app, this would update the state and database
  };
  
  return (
    <Tabs defaultValue="activities" onValueChange={setCurrentTab} value={currentTab}>
      <CardHeader className="pb-0">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="activities">Atividades</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="connections">Conexões</TabsTrigger>
          <TabsTrigger value="esports">eSports</TabsTrigger>
          <TabsTrigger value="register">Registrar</TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent className="pt-6">
        <TabsContent value="activities">
          <ActivitiesTab />
        </TabsContent>

        <TabsContent value="events">
          <EventsTab events={events} />
        </TabsContent>

        <TabsContent value="connections">
          <ConnectionsTab 
            socialInputs={socialInputs}
            esportsProfiles={esportsProfiles}
            handleSocialChange={handleSocialChange}
            onAddMoreConnections={() => setCurrentTab("esports")}
          />
        </TabsContent>
        
        <TabsContent value="esports">
          <EsportsTab 
            userInterests={userInterests} 
            onValidationComplete={handleProfileValidated}
          />
        </TabsContent>
        
        <TabsContent value="register">
          <EventPurchaseForm onSubmit={handleEventPurchaseSubmit} />
        </TabsContent>
      </CardContent>
    </Tabs>
  );
};

export default ProfileTabs;
