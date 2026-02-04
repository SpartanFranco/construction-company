"use client";

import React from "react"

import { Home, Building2, Hammer, Factory } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteData } from "@/lib/site-context";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  building: Building2,
  hammer: Hammer,
  factory: Factory,
};

export function Services() {
  const { services } = useSiteData();

  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Lo que hacemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 text-balance">
            Nuestros Servicios
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ofrecemos soluciones integrales de construcción adaptadas a cada
            proyecto y cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Home;
            return (
              <Card
                key={service.id}
                className="group border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
