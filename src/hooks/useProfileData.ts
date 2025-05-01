
/**
 * Hook para gerenciar dados de perfil do usuário
 * 
 * Este hook centraliza toda a lógica de gerenciamento de dados do perfil
 * do usuário, incluindo a obtenção de dados do Supabase, gerenciamento de
 * estado local e funções para atualização de informações do perfil.
 * 
 * @module hooks/useProfileData
 */

import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { gameAssets } from '@/utils/gameAssets';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Lista de jogos com imagens oficiais
export const gamesWithImages = gameAssets;

export const useProfileData = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    level: 1,
    levelProgress: 0,
    verified: false,
    joinDate: "",
    profileImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200",
    games: [] as string[],
    teams: [] as string[],
    social: {
      twitter: "",
      instagram: "",
      facebook: "",
      tiktok: "",
    },
    events: [] as any[],
    badges: [] as any[],
    esportsProfiles: [] as any[]
  });
  
  const [currentTab, setCurrentTab] = useState("activities");
  const [socialInputs, setSocialInputs] = useState(userData.social);
  const [esportsProfiles, setEsportsProfiles] = useState(userData.esportsProfiles);
  
  /**
   * Efeito para buscar dados do perfil do usuário
   * 
   * Executa quando o usuário estiver autenticado e busca todos
   * os dados relacionados ao perfil do Supabase, incluindo:
   * - Perfil básico
   * - Jogos de interesse
   * - Redes sociais
   * - Perfis de plataformas de eSports
   * - Eventos registrados
   */
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Buscar perfil do usuário
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // Buscar jogos do usuário
        const { data: userGames, error: gamesError } = await supabase
          .from('user_games')
          .select('games(name)')
          .eq('user_id', user.id);

        // Buscar perfis de redes sociais
        const { data: socialMedia, error: socialError } = await supabase
          .from('user_social_media')
          .select('*')
          .eq('user_id', user.id);

        // Buscar perfis de jogos
        const { data: gamingProfiles, error: profilesError } = await supabase
          .from('user_gaming_profiles')
          .select('*')
          .eq('user_id', user.id);

        // Buscar eventos do usuário
        const { data: userEvents, error: eventsError } = await supabase
          .from('user_events')
          .select('events(*), attended')
          .eq('user_id', user.id);

        // Montar objeto de dados do usuário
        const games = userGames?.map(item => item.games?.name) || [];
        const socialData = socialMedia?.reduce((acc, item) => {
          acc[item.platform.toLowerCase()] = item.username;
          return acc;
        }, {twitter: "", instagram: "", facebook: "", tiktok: ""});
        
        const profiles = gamingProfiles?.map(profile => ({
          platform: profile.platform,
          username: profile.username,
          url: profile.profile_url,
          verified: profile.validation_status === 'verified'
        })) || [];

        const events = userEvents?.map(event => ({
          name: event.events?.name,
          date: event.events?.date ? new Date(event.events.date).toLocaleDateString('pt-BR', {month: '2-digit', year: 'numeric'}) : "",
          attended: !!event.attended,
          registered: true
        })) || [];

        // Formatar data de join
        const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR', {month: 'short', year: 'numeric'}) : "Mai 2025";
        
        const updatedUserData = {
          name: profileData?.full_name || user.user_metadata?.full_name || "Usuário Anônimo",
          username: `@${user.email?.split('@')[0] || "usuario"}`,
          level: 1,
          levelProgress: 20,
          verified: false,
          joinDate,
          profileImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200",
          games,
          teams: ["FURIA", "LOUD", "paiN Gaming"], // Dados mockados por enquanto
          social: socialData,
          events,
          badges: [
            { name: "Fan Club FURIA", color: "bg-amber-500" },
          ],
          esportsProfiles: profiles
        };

        setUserData(updatedUserData);
        setSocialInputs(socialData);
        setEsportsProfiles(profiles);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Erro ao carregar dados do perfil:", error.message);
        toast({
          title: "Erro ao carregar perfil",
          description: "Não foi possível carregar seus dados de perfil",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  /**
   * Atualiza os dados de redes sociais do usuário
   * 
   * @param platform - Plataforma de rede social (twitter, instagram, etc)
   * @param value - Nome de usuário na plataforma
   */
  const handleSocialChange = (platform: keyof typeof socialInputs, value: string) => {
    setSocialInputs(prev => ({ ...prev, [platform]: value }));
    
    // Aqui poderia ter uma lógica para salvar no Supabase após um tempo
    // usando debounce, mas por simplicidade vamos apenas atualizar o estado local
  };
  
  /**
   * Salva um perfil de eSports validado no Supabase
   * 
   * @param result - Resultado da validação do perfil de eSports
   */
  const handleProfileValidated = async (result: any) => {
    if (!user) return;
    
    try {
      if (result.verified) {
        // Salvar o perfil validado no Supabase
        const { data, error } = await supabase
          .from('user_gaming_profiles')
          .insert({
            platform: result.platform,
            username: result.username,
            profile_url: result.profileUrl,
            user_id: user.id,
            validation_status: result.isRelevant ? 'verified' : 'pending'
          });

        if (error) throw error;

        // Atualizar o estado local
        setEsportsProfiles(prev => [...prev, {
          platform: result.platform,
          username: result.username,
          url: result.profileUrl,
          verified: result.isRelevant
        }]);
        
        toast({
          title: "Perfil adicionado com sucesso!",
          description: "Seu perfil de eSports foi verificado e adicionado à sua conta."
        });
      }
    } catch (error: any) {
      console.error("Erro ao salvar perfil:", error.message);
      toast({
        title: "Erro ao salvar perfil",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return {
    userData,
    isLoading,
    currentTab,
    setCurrentTab,
    socialInputs,
    esportsProfiles,
    handleSocialChange,
    handleProfileValidated
  };
};
