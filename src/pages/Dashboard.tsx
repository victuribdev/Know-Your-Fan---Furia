
import React from "react";
import PageLayout from "@/components/PageLayout";
import UserInsightsDashboard from "@/components/dashboard/UserInsightsDashboard";
import { useProfileData } from "@/hooks/useProfileData";

const Dashboard: React.FC = () => {
  const { userData } = useProfileData();
  
  // Transform userData to match the dashboard component's expectations
  const dashboardData = {
    ...userData,
    totalEvents: userData.events?.length || 0,
    totalPurchases: 4, // Mock data, would come from real purchases API
    profileCompleteness: 75, // This would be calculated based on filled profile fields
    verificationStatus: {
      identity: true,
      esports: userData.esportsProfiles?.some(p => p.verified) || false,
      social: userData.social && Object.values(userData.social).some(v => v) || false,
    },
  };

  return (
    <PageLayout 
      title="Dashboard do Fã" 
      subtitle="Visualize seus insights e engajamento na comunidade de eSports"
    >
      <UserInsightsDashboard userData={dashboardData} />
    </PageLayout>
  );
};

export default Dashboard;
