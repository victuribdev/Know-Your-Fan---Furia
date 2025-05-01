
import React from "react";

interface ActivityItemProps {
  title: string;
  description: string;
  date: string;
  icon: string;
}

const ActivityItem = ({ title, description, date, icon }: ActivityItemProps) => {
  return (
    <div className="flex items-start space-x-4 pb-4 border-b last:border-0">
      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{title}</h3>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
