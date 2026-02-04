"use client";

import { Button } from "@/components/ui/button";
import { useSiteData } from "@/lib/site-context";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { config } = useSiteData();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase bg-primary/20 text-primary-foreground border border-primary/30 rounded-full">
          Más de 20 años de experiencia
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
          {config.slogan}
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 text-pretty">
          {config.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="text-base px-8">
            <a href="#contacto">
              Contáctanos
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="text-base px-8 bg-transparent text-white border-white hover:bg-white hover:text-foreground"
          >
            <a href="#proyectos">Ver Proyectos</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Proyectos Completados" },
            { value: "20+", label: "Años de Experiencia" },
            { value: "150+", label: "Empleados" },
            { value: "98%", label: "Clientes Satisfechos" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
