
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { gameThemeColors, gameIcons, gameSVGIcons, gameFallbackUrls } from "@/utils/gameAssets";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

interface GameAvatarProps {
  gameName: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GameAvatar = ({ gameName, imageUrl, size = "md", className }: GameAvatarProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(imageUrl || null);
  const [imageError, setImageError] = useState(false);

  // Tamanhos predefinidos
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14"
  };

  // Carregar imagem de fallback se a principal falhar
  useEffect(() => {
    if (imageError && gameName && gameFallbackUrls[gameName]) {
      const fallbackImage = new Image();
      fallbackImage.src = gameFallbackUrls[gameName];
      
      fallbackImage.onload = () => {
        setImageSrc(gameFallbackUrls[gameName]);
        setImageError(false);
        setIsLoading(false);
      };
      
      fallbackImage.onerror = () => {
        setImageSrc(null);
        setIsLoading(false);
      };
    }
  }, [imageError, gameName]);

  // Verificar se existe um SVG para o jogo
  const svgIcon = gameName ? gameSVGIcons[gameName] : null;
  const themeColor = gameName ? gameThemeColors[gameName] || "#333" : "#333";
  const textIcon = gameName ? gameIcons[gameName] || gameName.substring(0, 2).toUpperCase() : "??";

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {isLoading && <Skeleton className="h-full w-full rounded-full" />}
      
      {!isLoading && !imageError && imageSrc && (
        <div className="h-full w-full rounded-full overflow-hidden">
          <img
            src={imageSrc}
            alt={`${gameName} logo`}
            className="h-full w-full object-cover"
            onError={handleImageError}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </div>
      )}
      
      <AvatarFallback 
        style={{ 
          backgroundColor: themeColor,
          color: "#fff",
          display: imageError || !imageSrc ? "flex" : "none" 
        }}
      >
        {svgIcon ? (
          <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: svgIcon }} />
        ) : (
          textIcon
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default GameAvatar;
