
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Event {
  name: string;
  date: string;
  attended?: boolean;
  registered?: boolean;
}

interface EventsTabProps {
  events: Event[];
}

const EventsTab = ({ events }: EventsTabProps) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <h3 className="font-medium">{event.name}</h3>
            <p className="text-sm text-muted-foreground">{event.date}</p>
          </div>
          <Badge className={event.attended ? "bg-green-600" : "bg-blue-600"}>
            {event.attended ? "Participou" : "Registrado"}
          </Badge>
        </div>
      ))}
      
      <Button variant="outline" className="w-full">
        Ver todos os eventos
      </Button>
    </div>
  );
};

export default EventsTab;
