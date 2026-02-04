"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigTab } from "@/components/admin/config-tab";
import { ServicesTab } from "@/components/admin/services-tab";
import { CarouselTab } from "@/components/admin/carousel-tab";
import { useSiteData } from "@/lib/site-context";

export default function AdminPage() {
  const { isLoading } = useSiteData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Configuración del Sitio</h2>
        <p className="text-muted-foreground mt-1">
          Administra el contenido y la información de tu página web.
        </p>
      </div>

      <Tabs defaultValue="config" className="space-y-6">
        <TabsList className="bg-background border border-border">
          <TabsTrigger value="config">Información General</TabsTrigger>
          <TabsTrigger value="services">Servicios</TabsTrigger>
          <TabsTrigger value="carousel">Carrusel</TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <ConfigTab />
        </TabsContent>

        <TabsContent value="services">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="carousel">
          <CarouselTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
