
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Game, ValidationErrors } from "@/utils/cadastroTypes";

interface InteressesStepProps {
  formData: {
    interesses: number[];
    bio: string;
  };
  errors: ValidationErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleInterestToggle: (gameId: number) => void;
  gamesList: Game[];
}

const InteressesStep: React.FC<InteressesStepProps> = ({
  formData,
  errors,
  handleChange,
  handleInterestToggle,
  gamesList,
}) => {
  return (
    <Card className="bg-card shadow-md border-0">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold">Interesses em eSports</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Selecione seus jogos de eSports favoritos
            </p>
            {errors.interesses && (
              <p className="text-sm text-red-500 mt-1">{errors.interesses}</p>
            )}

            <div className="space-y-2 mt-2">
              {gamesList.map((game) => (
                <div key={game.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`game-${game.id}`}
                    checked={formData.interesses.includes(game.id)}
                    onCheckedChange={() => handleInterestToggle(game.id)}
                  />
                  <Label 
                    htmlFor={`game-${game.id}`}
                    className="text-base cursor-pointer"
                  >
                    {game.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Conte-nos um pouco sobre você e sua experiência com eSports
            </p>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Escreva algo sobre você..."
              className="min-h-[120px]"
            />
            {errors.bio && (
              <p className="text-sm text-red-500 mt-1">{errors.bio}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteressesStep;
