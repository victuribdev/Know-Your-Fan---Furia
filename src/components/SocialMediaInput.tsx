
/**
 * Componente para entrada de redes sociais
 * 
 * Este componente fornece um campo de entrada personalizado para
 * redes sociais, exibindo o ícone correspondente a cada plataforma.
 * 
 * @module components/SocialMediaInput
 */

import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SocialMediaInputProps {
  platform: "twitter" | "instagram" | "facebook" | "tiktok";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Componente SocialMediaInput
 * 
 * @param {SocialMediaInputProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente de entrada para redes sociais
 */
const SocialMediaInput = ({
  platform,
  value,
  onChange,
  placeholder,
  className,
}: SocialMediaInputProps) => {
  /**
   * Retorna o ícone SVG correspondente à plataforma de mídia social
   * 
   * @returns {JSX.Element} Ícone SVG da plataforma
   */
  const getPlatformIcon = () => {
    switch (platform) {
      case "twitter":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        );
      case "instagram":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case "facebook":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        );
      case "tiktok":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
            <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"></path>
            <path d="M16 8v8"></path>
            <path d="M12 16v-8"></path>
            <path d="M20 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  // Placeholders padrão para cada plataforma
  const defaultPlaceholder = {
    twitter: "@username",
    instagram: "@username",
    facebook: "facebook.com/username",
    tiktok: "@username",
  }[platform];

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {getPlatformIcon()}
      </div>
      <Input
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder || defaultPlaceholder}
        className="pl-10 bg-muted/50 border-muted"
      />
    </div>
  );
};

export default SocialMediaInput;
