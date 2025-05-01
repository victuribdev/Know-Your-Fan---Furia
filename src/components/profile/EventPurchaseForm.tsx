
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Check, ChevronsUpDown, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface EventPurchaseFormProps {
  onSubmit?: (data: any) => void;
}

const EventPurchaseForm: React.FC<EventPurchaseFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("event");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  
  const eventTypeOptions = [
    { label: "Torneio", value: "tournament" },
    { label: "Fan Meetup", value: "meetup" },
    { label: "Convenção", value: "convention" },
    { label: "Transmissão ao Vivo", value: "watch_party" },
    { label: "Outro", value: "other" },
  ];

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const eventData = {
      name: formData.get("name") as string,
      date: date,
      location: formData.get("location") as string,
      attended: (formData.get("attended") as string) === "on",
      type: eventType,
    };
    
    toast({
      title: "Evento registrado!",
      description: `${eventData.name} foi adicionado ao seu perfil.`,
    });
    
    if (onSubmit) onSubmit(eventData);
    form.reset();
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const purchaseData = {
      description: formData.get("description") as string,
      amount: parseFloat(formData.get("amount") as string),
      date: date,
    };
    
    toast({
      title: "Compra registrada!",
      description: `${purchaseData.description} foi adicionada ao seu perfil.`,
    });
    
    if (onSubmit) onSubmit(purchaseData);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Atividades</CardTitle>
        <CardDescription>Adicione eventos que você participou ou compras relacionadas a eSports</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="event" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="event">Eventos</TabsTrigger>
            <TabsTrigger value="purchase">Compras</TabsTrigger>
          </TabsList>
          
          <TabsContent value="event">
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Evento</Label>
                <Input id="name" name="name" placeholder="ESL Pro League, CBLOL, etc." required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Local</Label>
                <Input id="location" name="location" placeholder="São Paulo, Online, etc." required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Evento</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {eventType
                        ? eventTypeOptions.find((option) => option.value === eventType)?.label
                        : "Selecione um tipo..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar tipo..." />
                      <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
                      <CommandGroup>
                        {eventTypeOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            onSelect={() => {
                              setEventType(option.value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                eventType === option.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="attended" name="attended" className="border-primary rounded h-4 w-4" />
                <Label htmlFor="attended">Participei deste evento</Label>
              </div>
              
              <Button type="submit" className="w-full">Registrar Evento</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="purchase">
            <form onSubmit={handlePurchaseSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Item</Label>
                <Input id="description" name="description" placeholder="Camiseta FURIA, Mouse Gamer, etc." required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Data da Compra</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input id="amount" name="amount" type="number" step="0.01" min="0" placeholder="99.90" required />
              </div>
              
              <Button type="submit" className="w-full">Registrar Compra</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EventPurchaseForm;
