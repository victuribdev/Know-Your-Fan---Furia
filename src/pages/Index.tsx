import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Users,
  Award,
  Calendar,
  Check,
  Star,
  Gamepad
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import PageLayout from "@/components/PageLayout";

// Popular games in Brazil
const popularGames = [
  { name: "Free Fire", players: "125M+", category: "Battle Royale" },
  { name: "League of Legends", players: "80M+", category: "MOBA" },
  { name: "CS2", players: "45M+", category: "FPS" },
  { name: "Valorant", players: "35M+", category: "FPS" },
];

// Events data
const upcomingEvents = [
  { name: "CBLOL 2025 Summer Split", date: "Janeiro 2025", location: "São Paulo" },
  { name: "Brasil Game Show", date: "Outubro 2025", location: "Rio de Janeiro" },
  { name: "Free Fire World Cup 2025", date: "Março 2025", location: "Belo Horizonte" },
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-5xl mx-auto mb-12">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl"></div>
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
              alt="Arena de eSports" 
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent/80">
                    A Elite dos eSports no Brasil
                  </span>
                </h1>
                <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                  Conecte-se com profissionais, participe de torneios exclusivos e acompanhe as maiores competições do cenário brasileiro de eSports.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/cadastro">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground btn-glow">
                      Iniciar Jornada
                    </Button>
                  </Link>
                  <Link to="/perfil">
                    <Button variant="outline" size="lg">
                      Perfil Demo
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="outline" size="lg">
                      Dashboard de Insights
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Games Section */}
        <div className="w-full max-w-5xl mx-auto mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-white">
              Jogos em Destaque
            </h2>
            <Badge variant="outline" className="border-accent/50 text-accent">
              Populares no Brasil
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGames.map((game) => (
              <Card key={game.name} className="bg-card/70 backdrop-blur border border-accent/10 hover:border-accent/30 transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="font-display">{game.name}</CardTitle>
                  <CardDescription>{game.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-accent">
                    <Users size={16} />
                    <span className="text-sm">{game.players} jogadores</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full max-w-5xl mx-auto mb-16 py-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">
            Como Funciona a Plataforma
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Gamepad size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Crie seu Perfil</h3>
              <p className="text-muted-foreground">Cadastre-se e crie seu perfil personalizado de jogador, destaque suas habilidades e jogos favoritos.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Users size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Conecte-se</h3>
              <p className="text-muted-foreground">Encontre outros jogadores e profissionais do setor para expandir sua rede no mundo dos eSports.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Award size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Participe</h3>
              <p className="text-muted-foreground">Acesse torneios exclusivos, eventos e conteúdos premium para membros verificados.</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="w-full max-w-5xl mx-auto mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-white">
              Próximos Eventos
            </h2>
            <Badge className="bg-accent/80">Em breve</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.name} className="bg-card/70 backdrop-blur border border-white/5 hover:border-accent/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="font-display">{event.name}</CardTitle>
                  <CardDescription>{event.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-accent">
                    <Calendar size={16} />
                    <span className="text-sm">{event.date}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Detalhes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-white text-center">
              Benefícios para Membros
            </h2>
            <p className="text-muted-foreground text-center mt-2 mb-8">
              Junte-se à comunidade e desfrute de vantagens exclusivas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              title="Rede de Jogadores"
              description="Conecte-se com jogadores profissionais e amadores que compartilham os mesmos interesses e objetivos"
              icon={<Users className="text-accent" size={28} />}
            />
            <FeatureCard 
              title="Eventos Exclusivos"
              description="Acesso prioritário a torneios, campeonatos e eventos premium do cenário de eSports"
              icon={<Calendar className="text-accent" size={28} />}
            />
            <FeatureCard 
              title="Perfil Verificado"
              description="Obtenha um selo de verificação que comprova sua identidade e credibilidade na comunidade"
              icon={<Check className="text-accent" size={28} />}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-white/5 hover:border-accent/20 transition-all duration-300 backdrop-blur-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-display font-semibold mb-2 text-white">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
