
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { AlertCircle, Award, Calendar, Check, Clock, ShoppingBag, User, Users } from "lucide-react";

// Create an alias for the Award icon to represent game controllers
const GameIcon = Award;

interface UserInsightsDashboardProps {
  userData: {
    name: string;
    username: string;
    games: string[];
    teams: string[];
    totalEvents: number;
    totalPurchases: number;
    level: number;
    levelProgress: number;
    profileCompleteness: number;
    verificationStatus: {
      identity: boolean;
      esports: boolean;
      social: boolean;
    };
    gameStats?: {
      gameName: string;
      hoursPlayed: number;
      skill: string;
      recentMatches: number;
    }[];
    recentEvents?: {
      id: string;
      name: string;
      date: string;
      attended: boolean;
    }[];
    recentPurchases?: {
      id: string;
      description: string;
      amount: number;
      date: string;
    }[];
    socialActivity?: {
      platform: string;
      engagementLevel: number;
      relatedToEsports: number;
    }[];
  };
}

const UserInsightsDashboard: React.FC<UserInsightsDashboardProps> = ({ userData }) => {
  // Calculate some metrics for the dashboard
  const totalVerifications = 
    (userData.verificationStatus.identity ? 1 : 0) +
    (userData.verificationStatus.esports ? 1 : 0) +
    (userData.verificationStatus.social ? 1 : 0);
  
  const verificationPercentage = (totalVerifications / 3) * 100;
  
  // Data for charts
  const platformEngagementData = userData.socialActivity?.map(activity => ({
    name: activity.platform,
    engagement: activity.engagementLevel,
    esports: activity.relatedToEsports
  })) || [];

  const gameDistributionData = userData.gameStats?.map(game => ({
    name: game.gameName,
    value: game.hoursPlayed
  })) || [];

  const eventsAttendanceData = [
    { name: 'Attended', value: userData.recentEvents?.filter(event => event.attended).length || 0 },
    { name: 'Registered', value: userData.recentEvents?.filter(event => !event.attended).length || 0 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Completeness */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Perfil Completo</span>
                <span className="text-sm font-medium">{userData.profileCompleteness}%</span>
              </div>
              <Progress value={userData.profileCompleteness} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Verificações</span>
                <span className="text-sm font-medium">{totalVerifications}/3</span>
              </div>
              <Progress value={verificationPercentage} className="h-2" />
              <div className="flex gap-2 mt-2">
                <Badge variant={userData.verificationStatus.identity ? "default" : "outline"} className="text-xs">
                  <Check className={`h-3 w-3 mr-1 ${userData.verificationStatus.identity ? "" : "opacity-30"}`} />
                  Identidade
                </Badge>
                <Badge variant={userData.verificationStatus.esports ? "default" : "outline"} className="text-xs">
                  <Check className={`h-3 w-3 mr-1 ${userData.verificationStatus.esports ? "" : "opacity-30"}`} />
                  eSports
                </Badge>
                <Badge variant={userData.verificationStatus.social ? "default" : "outline"} className="text-xs">
                  <Check className={`h-3 w-3 mr-1 ${userData.verificationStatus.social ? "" : "opacity-30"}`} />
                  Social
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Count */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Calendar className="h-10 w-10 text-muted-foreground/80" />
              <div>
                <p className="text-sm text-muted-foreground">Eventos</p>
                <h3 className="text-2xl font-bold">{userData.totalEvents}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchases Count */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/80" />
              <div>
                <p className="text-sm text-muted-foreground">Compras</p>
                <h3 className="text-2xl font-bold">{userData.totalPurchases}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="games">Jogos</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="activities">Atividades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interesses em eSports</CardTitle>
                <CardDescription>Distribuição dos seus jogos e times favoritos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PieChart 
                    data={gameDistributionData.length ? gameDistributionData : [
                      {name: 'CS2', value: 65},
                      {name: 'Valorant', value: 25},
                      {name: 'League of Legends', value: 10}
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engajamento por Plataforma</CardTitle>
                <CardDescription>Seu engajamento em diferentes plataformas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart 
                    data={platformEngagementData.length ? platformEngagementData : [
                      {name: 'Twitter', engagement: 80, esports: 70},
                      {name: 'Instagram', engagement: 65, esports: 50},
                      {name: 'FURIA', engagement: 90, esports: 90},
                      {name: 'TikTok', engagement: 45, esports: 35}
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="games">
          <Card>
            <CardHeader>
              <CardTitle>Performance nos Jogos</CardTitle>
              <CardDescription>Estatísticas dos seus jogos favoritos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {(userData.gameStats || [
                  {gameName: 'Counter-Strike 2', hoursPlayed: 120, skill: 'Intermediário', recentMatches: 15},
                  {gameName: 'Valorant', hoursPlayed: 85, skill: 'Iniciante', recentMatches: 8},
                  {gameName: 'League of Legends', hoursPlayed: 200, skill: 'Avançado', recentMatches: 25}
                ]).map((game, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GameIcon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{game.gameName}</span>
                      </div>
                      <Badge>{game.skill}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Horas Jogadas</span>
                        <span>{game.hoursPlayed}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Partidas Recentes</span>
                        <span>{game.recentMatches}</span>
                      </div>
                    </div>
                    <Progress value={(game.hoursPlayed / 250) * 100} className="h-1.5" />
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interação nas Redes Sociais</CardTitle>
                <CardDescription>Atividade relacionada a eSports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <LineChart 
                    data={[
                      {date: 'Jan', interactions: 50},
                      {date: 'Fev', interactions: 35},
                      {date: 'Mar', interactions: 85},
                      {date: 'Abr', interactions: 60},
                      {date: 'Mai', interactions: 95}
                    ]} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verificações de Perfil</CardTitle>
                <CardDescription>Status de validação das suas contas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(userData.socialActivity || [
                    {platform: 'Twitter', engagementLevel: 80, relatedToEsports: 70},
                    {platform: 'Instagram', engagementLevel: 65, relatedToEsports: 50},
                    {platform: 'FURIA', engagementLevel: 90, relatedToEsports: 90},
                    {platform: 'TikTok', engagementLevel: 45, relatedToEsports: 35}
                  ]).map((activity, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{activity.platform}</span>
                        <Badge className={activity.relatedToEsports > 60 ? "bg-green-600" : "bg-orange-500"}>
                          {activity.relatedToEsports}% relevante
                        </Badge>
                      </div>
                      <Progress value={activity.engagementLevel} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Eventos Recentes</CardTitle>
                <CardDescription>Eventos que você registrou ou participou</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] overflow-auto">
                <div className="space-y-4">
                  {(userData.recentEvents || [
                    {id: '1', name: 'ESL Pro League Season 19', date: '2024-05-15', attended: true},
                    {id: '2', name: 'CBLOL Finals 2024', date: '2024-04-22', attended: true},
                    {id: '3', name: 'FURIA Fan Meetup', date: '2024-06-10', attended: false},
                    {id: '4', name: 'Valorant Champions Tour', date: '2024-07-05', attended: false}
                  ]).map((event) => (
                    <div key={event.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <Badge className={event.attended ? "bg-green-600" : "bg-blue-600"}>
                        {event.attended ? "Participou" : "Registrado"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compras Recentes</CardTitle>
                <CardDescription>Suas compras relacionadas a eSports</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] overflow-auto">
                <div className="space-y-4">
                  {(userData.recentPurchases || [
                    {id: '1', description: 'Camiseta FURIA', amount: 149.90, date: '2024-05-02'},
                    {id: '2', description: 'Ingresso ESL Pro League', amount: 199.90, date: '2024-04-15'},
                    {id: '3', description: 'Mouse Gamer', amount: 329.90, date: '2024-03-22'},
                    {id: '4', description: 'Pacote VIP CBLOL', amount: 399.90, date: '2024-03-10'}
                  ]).map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{purchase.description}</p>
                        <p className="text-sm text-muted-foreground">{purchase.date}</p>
                      </div>
                      <p className="font-medium">R$ {purchase.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserInsightsDashboard;
