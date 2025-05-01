
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, LogOut, User } from 'lucide-react';

const AuthButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const goToProfile = () => {
    navigate('/perfil');
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={goToProfile}
          className="flex items-center gap-2"
        >
          <User size={18} />
          <span className="hidden md:inline">Perfil</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAuthAction}
          className="flex items-center gap-2"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Sair</span>
        </Button>
      </div>
    );
  }

  return (
    <Button 
      size="sm" 
      onClick={handleAuthAction}
      className="flex items-center gap-2"
    >
      <LogIn size={18} />
      <span>Entrar</span>
    </Button>
  );
};

export default AuthButton;
