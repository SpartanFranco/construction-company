"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSiteData } from "@/lib/site-context";

export function Contact() {
  const { config } = useSiteData();

  const whatsappLink = `https://wa.me/${config.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hola, me gustaría solicitar información sobre sus servicios de construcción.")}`;
  const emailLink = `mailto:${config.email}?subject=${encodeURIComponent("Solicitud de información")}&body=${encodeURIComponent("Hola, me gustaría solicitar información sobre sus servicios de construcción.")}`;

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Hablemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 text-balance">
            Contacta con Nosotros
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Estamos aquí para ayudarte a hacer realidad tu proyecto. Contáctanos
            por el medio que prefieras.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Teléfono</h3>
                  <p className="text-muted-foreground">{config.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">{config.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Dirección</h3>
                  <p className="text-muted-foreground">{config.address}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="flex-1">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1 bg-transparent">
                <a href={emailLink}>
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Envíanos un mensaje
            </h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" placeholder="Tu teléfono" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
