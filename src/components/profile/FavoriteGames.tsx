
import React, { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gameAssets, gameThemeColors, gameIcons, gameSVGIcons } from "@/utils/gameAssets";

interface FavoriteGamesProps {
  games: string[];
}

const FavoriteGames = ({ games }: FavoriteGamesProps) => {
  if (!games || games.length === 0) {
    return (
      <>
        <CardHeader>
          <CardTitle className="text-lg">Jogos Favoritos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Nenhum jogo favorito definido ainda.</p>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Jogos Favoritos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {games.map((game, index) => {
            const hasImage = gameAssets[game] || false;
            const backgroundColor = gameThemeColors[game] || "#333";
            const icon = gameIcons[game] || game.substring(0, 2).toUpperCase();
            const svgIcon = gameSVGIcons[game];
            
            return (
              <Badge 
                key={index} 
                variant="outline" 
                className="flex items-center gap-1.5 px-3 py-1.5 border-accent/30"
              >
                {hasImage ? (
                  <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-black relative">
                    <img 
                      src={gameAssets[game]} 
                      alt={`${game} logo`} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {/* SVG fallback - exibido se a imagem não carregar */}
                    <span 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ 
                        backgroundColor,
                        opacity: 0,  // Inicialmente invisível
                        transition: "opacity 0.2s"
                      }}
                      onError={(e: any) => {
                        e.currentTarget.style.opacity = 1;
                      }}
                    >
                      {svgIcon ? (
                        <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: svgIcon }} />
                      ) : (
                        icon
                      )}
                    </span>
                  </span>
                ) : (
                  <span 
                    className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-semibold"
                    style={{ backgroundColor }}
                  >
                    {svgIcon ? (
                      <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: svgIcon }} />
                    ) : (
                      icon
                    )}
                  </span>
                )}
                {game}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </>
  );
};

export default memo(FavoriteGames);
