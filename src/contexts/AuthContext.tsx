
/**
 * Contexto de autenticação
 * 
 * Este contexto gerencia o estado de autenticação do usuário na aplicação,
 * fornecendo funções para registro, login e logout, além de compartilhar
 * informações sobre o usuário atual com todos os componentes.
 * 
 * @module contexts/AuthContext
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Defina o tipo para o contexto de autenticação
type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Crie o contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook personalizado para acessar o contexto de autenticação
 * 
 * Fornece acesso fácil às funções e dados de autenticação em qualquer componente
 * 
 * @returns {AuthContextType} O contexto de autenticação
 * @throws {Error} Se usado fora de um AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

/**
 * Provedor de autenticação
 * 
 * Componente que gerencia o estado de autenticação e fornece funcionalidades
 * relacionadas a autenticação para toda a aplicação
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.children - Componentes filhos
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Efeito para monitorar mudanças no estado de autenticação
  useEffect(() => {
    // Primeiro, configure o listener de mudança de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state change event:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
        
        // Usando setTimeout para evitar problemas de recursão com supabase
        if (currentSession?.user) {
          setTimeout(() => {
            console.log("Usuário autenticado:", currentSession.user.id);
          }, 0);
        }
      }
    );

    // Em seguida, verifique se já existe uma sessão
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Session check:", currentSession ? "Sessão encontrada" : "Nenhuma sessão");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // Limpe a inscrição ao desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Função para registrar um novo usuário
   * 
   * @param {string} email - Email do usuário
   * @param {string} password - Senha escolhida
   * @param {Object} userData - Dados adicionais do usuário (nome, etc)
   */
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log("Tentando registrar:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
          },
        },
      });

      if (error) {
        console.error("Erro ao registrar:", error.message);
        throw error;
      }

      console.log("Registro bem-sucedido:", data);
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Verifique seu email para confirmar o cadastro.',
      });

      // Redirecionar para a página de validação após o cadastro
      if (data.user) {
        navigate('/validacao');
      }
    } catch (error: any) {
      console.error("Erro no registro:", error.message);
      toast({
        variant: 'destructive',
        title: 'Erro ao criar conta',
        description: error.message || 'Ocorreu um erro ao criar sua conta.',
      });
    }
  };

  /**
   * Função para autenticar um usuário existente
   * 
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   */
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Tentando login:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro ao fazer login:", error.message);
        throw error;
      }

      console.log("Login bem-sucedido:", data);
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo de volta!',
      });

      navigate('/perfil');
    } catch (error: any) {
      console.error("Erro no login:", error.message);
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: error.message || 'Verifique suas credenciais e tente novamente.',
      });
    }
  };

  /**
   * Função para encerrar a sessão do usuário
   */
  const signOut = async () => {
    try {
      console.log("Fazendo logout");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error.message);
        throw error;
      }
      
      console.log("Logout bem-sucedido");
      toast({
        title: 'Logout realizado com sucesso',
      });
      
      navigate('/');
    } catch (error: any) {
      console.error("Erro no logout:", error.message);
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer logout',
        description: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
