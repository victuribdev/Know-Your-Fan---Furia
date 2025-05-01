
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProfileLevel from "@/components/ProfileLevel";

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    level: number;
    levelProgress: number;
    verified: boolean;
    profileImage: string;
    badges: Array<{
      name: string;
      color: string;
    }>;
  };
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="px-4 pb-4 pt-0 flex flex-col items-center">
      <div className="relative -mt-12 mb-4">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-card object-cover"
        />
        {user.verified && (
          <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        )}
      </div>
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-sm text-muted-foreground">{user.username}</p>

      <div className="flex gap-2 mt-3">
        {user.badges.map((badge, index) => (
          <Badge
            key={index}
            className={`${badge.color} hover:${badge.color}`}
          >
            {badge.name}
          </Badge>
        ))}
      </div>

      <div className="w-full mt-6">
        <ProfileLevel
          level={user.level}
          progress={user.levelProgress}
        />
      </div>

      <Button className="w-full mt-4 bg-accent hover:bg-accent/90">
        Editar Perfil
      </Button>
    </div>
  );
};

export default ProfileHeader;
