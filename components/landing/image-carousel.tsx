"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/lib/site-context";
import { cn } from "@/lib/utils";

export function ImageCarousel() {
  const { carouselImages } = useSiteData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, [carouselImages.length]);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (carouselImages.length === 0) return null;

  return (
    <section id="proyectos" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Nuestro Trabajo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 text-balance">
            Proyectos Destacados
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Cada proyecto refleja nuestro compromiso con la excelencia y la
            atención al detalle.
          </p>
        </div>

        <div className="relative">
          {/* Main Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
            {carouselImages.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  index === currentIndex ? "opacity-100" : "opacity-0"
                )}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-0"
            onClick={prevSlide}
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-0"
            onClick={nextSlide}
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
