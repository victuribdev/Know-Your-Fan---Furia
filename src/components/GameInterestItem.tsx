
import React, { memo } from "react";
import { Check, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Game } from "@/utils/cadastroTypes";
import { gameThemeColors, gameIcons, gameSVGIcons } from "@/utils/gameAssets";

interface GameInterestItemProps {
  game: Game;
  isSelected: boolean;
  onToggle: () => void;
}

const GameInterestItem = ({
  game,
  isSelected,
  onToggle,
}: GameInterestItemProps) => {
  const { name, image } = game;
  const themeColor = gameThemeColors[name] || "#333";
  const textIcon = gameIcons[name] || name.substring(0, 2).toUpperCase();
  const svgIcon = gameSVGIcons[name];

  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
        isSelected
          ? "border-accent"
          : "border-transparent hover:border-accent/30"
      )}
      onClick={onToggle}
    >
      {/* Área principal com fundo padrão, sempre visível */}
      <div 
        className="w-full aspect-square flex items-center justify-center"
        style={{ backgroundColor: themeColor }}
      >
        {/* SVG Icon (visível quando não há imagem) */}
        {svgIcon && (
          <div 
            className="absolute inset-0 flex items-center justify-center text-white z-10 pointer-events-none"
            style={{ opacity: image ? 0.15 : 0.9 }}
          >
            <div className="w-16 h-16" dangerouslySetInnerHTML={{ __html: svgIcon }} />
          </div>
        )}

        {/* Fallback de ícone (caso não tenha SVG nem imagem) */}
        {!svgIcon && (
          <div 
            className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold z-10 pointer-events-none"
            style={{ opacity: image ? 0.2 : 1 }}
          >
            {textIcon || <Gamepad2 size={32} />}
          </div>
        )}
        
        {/* Tentativa de carregar a imagem (quando disponível) */}
        {image && (
          <div className="absolute inset-0 bg-black z-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Overlay de gradiente + nome do jogo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-3 z-20">
        <p className="text-white font-medium text-sm">{name}</p>
      </div>

      {/* Indicador de seleção */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-accent rounded-full p-1 z-30">
          <Check size={14} className="text-black" />
        </div>
      )}
    </div>
  );
};

export default memo(GameInterestItem);
