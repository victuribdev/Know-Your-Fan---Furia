
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FavoriteTeamsProps {
  teams: string[];
}

const FavoriteTeams = ({ teams }: FavoriteTeamsProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Times Favoritos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {teams.map((team, index) => (
            <li key={index} className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                {team.charAt(0)}
              </div>
              <span>{team}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </>
  );
};

export default FavoriteTeams;
