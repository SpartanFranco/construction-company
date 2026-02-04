"use client";

import Link from "next/link";
import { useSiteData } from "@/lib/site-context";

export function Footer() {
  const { config } = useSiteData();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">CM</span>
              </div>
              <span className="font-semibold text-lg">{config.companyName}</span>
            </div>
            <p className="text-background/70 text-sm">{config.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {[
                { href: "#inicio", label: "Inicio" },
                { href: "#servicios", label: "Servicios" },
                { href: "#proyectos", label: "Proyectos" },
                { href: "#contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>{config.phone}</li>
              <li>{config.email}</li>
              <li>{config.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            {new Date().getFullYear()} {config.companyName}. Todos los derechos
            reservados.
          </p>
          <Link
            href="/admin"
            className="text-sm text-background/40 hover:text-background/60 transition-colors"
          >
            Administración
          </Link>
        </div>
      </div>
    </footer>
  );
}
