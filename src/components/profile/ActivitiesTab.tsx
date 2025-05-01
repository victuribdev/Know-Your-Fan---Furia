
import React from "react";
import ActivityItem from "./ActivityItem";

const ActivitiesTab = () => {
  return (
    <div className="space-y-4">
      <ActivityItem
        title="Perfil atualizado"
        description="Você atualizou sua foto de perfil"
        date="21/04/2025"
        icon="🔄"
      />
      <ActivityItem
        title="Badge adquirida"
        description="Você recebeu a badge 'Fan Club FURIA'"
        date="19/04/2025"
        icon="🏆"
      />
      <ActivityItem
        title="Evento registrado"
        description="Você se registrou para CBLOL Finals 2024"
        date="15/04/2025"
        icon="📅"
      />
      <ActivityItem
        title="Perfil verificado"
        description="Sua identidade foi verificada com sucesso"
        date="10/04/2025"
        icon="✅"
      />
    </div>
  );
};

export default ActivitiesTab;
