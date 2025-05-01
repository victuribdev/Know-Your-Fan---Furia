
import React from "react";
import { Card } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { useProfileData } from "@/hooks/useProfileData";

// Import profile components
import ProfileHeader from "@/components/profile/ProfileHeader";
import FavoriteTeams from "@/components/profile/FavoriteTeams";
import FavoriteGames from "@/components/profile/FavoriteGames";
import ProfileTabs from "@/components/profile/ProfileTabs";
import IdentityVerification from "@/components/profile/IdentityVerification";

const Perfil = () => {
  const {
    userData,
    isLoading,
    currentTab,
    setCurrentTab,
    socialInputs,
    esportsProfiles,
    handleSocialChange,
    handleProfileValidated
  } = useProfileData();

  if (isLoading) {
    return (
      <PageLayout title="Perfil do Fã" subtitle="Carregando seu perfil...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Perfil do Fã" subtitle="Gerencie seu perfil e conexões na comunidade">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Left Column - Profile Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-purple-600 to-blue-500"></div>
            <ProfileHeader user={userData} />
          </Card>

          <Card>
            <FavoriteTeams teams={userData.teams} />
          </Card>

          <Card>
            <FavoriteGames games={userData.games} />
          </Card>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <ProfileTabs
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              events={userData.events}
              socialInputs={socialInputs}
              esportsProfiles={esportsProfiles}
              handleSocialChange={handleSocialChange}
              handleProfileValidated={handleProfileValidated}
              userInterests={userData.games}
            />
          </Card>

          <Card>
            <IdentityVerification />
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Perfil;
