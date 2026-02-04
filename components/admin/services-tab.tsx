"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSiteData } from "@/lib/site-context";
import { Plus, Trash2, Check, Home, Building2, Hammer, Factory } from "lucide-react";
import type { Service } from "@/lib/site-data";

const iconOptions = [
  { value: "home", label: "Casa", icon: Home },
  { value: "building", label: "Edificio", icon: Building2 },
  { value: "hammer", label: "Martillo", icon: Hammer },
  { value: "factory", label: "Fábrica", icon: Factory },
];

export function ServicesTab() {
  const { services, updateServices } = useSiteData();
  const [localServices, setLocalServices] = useState<Service[]>(services);
  const [saved, setSaved] = useState(false);

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: "Nuevo Servicio",
      description: "Descripción del servicio",
      icon: "home",
    };
    setLocalServices([...localServices, newService]);
  };

  const removeService = (id: string) => {
    setLocalServices(localServices.filter((s) => s.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setLocalServices(
      localServices.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = () => {
    updateServices(localServices);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Servicios</CardTitle>
            <CardDescription>
              Administra los servicios que ofrece tu empresa.
            </CardDescription>
          </div>
          <Button onClick={addService} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Añadir Servicio
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {localServices.map((service, index) => (
          <div
            key={service.id}
            className="p-4 border border-border rounded-lg space-y-4 bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Servicio {index + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeService(service.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={service.title}
                  onChange={(e) => updateService(service.id, "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Icono</Label>
                <Select
                  value={service.icon}
                  onValueChange={(value) => updateService(service.id, "icon", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                value={service.description}
                onChange={(e) => updateService(service.id, "description", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        ))}

        {localServices.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No hay servicios. Añade uno para empezar.
          </div>
        )}

        <Button onClick={handleSave}>
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Guardado
            </>
          ) : (
            "Guardar Cambios"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
