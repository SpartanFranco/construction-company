"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteData } from "@/lib/site-context";
import { Plus, Trash2, Check } from "lucide-react";
import { ImageIcon } from "lucide-react";
import type { CarouselImage } from "@/lib/site-data";

export function CarouselTab() {
  const { carouselImages, updateCarouselImages } = useSiteData();
  const [localImages, setLocalImages] = useState<CarouselImage[]>(carouselImages);
  const [saved, setSaved] = useState(false);

  const addImage = () => {
    const newImage: CarouselImage = {
      id: Date.now().toString(),
      url: "",
      alt: "Nueva imagen",
    };
    setLocalImages([...localImages, newImage]);
  };

  const removeImage = (id: string) => {
    setLocalImages(localImages.filter((img) => img.id !== id));
  };

  const updateImage = (id: string, field: keyof CarouselImage, value: string) => {
    setLocalImages(
      localImages.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    );
  };

  const handleSave = () => {
    updateCarouselImages(localImages);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Imágenes del Carrusel</CardTitle>
            <CardDescription>
              Administra las imágenes que se muestran en el carrusel de proyectos.
            </CardDescription>
          </div>
          <Button onClick={addImage} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Añadir Imagen
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {localImages.map((image, index) => (
            <div
              key={image.id}
              className="border border-border rounded-lg overflow-hidden bg-muted/50"
            >
              {/* Image Preview */}
              <div className="aspect-video bg-muted relative">
                {image.url ? (
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>

              {/* Image Controls */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Imagen {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeImage(image.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">URL de la Imagen</Label>
                  <Input
                    value={image.url}
                    onChange={(e) => updateImage(image.id, "url", e.target.value)}
                    placeholder="https://..."
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Texto Alternativo</Label>
                  <Input
                    value={image.alt}
                    onChange={(e) => updateImage(image.id, "alt", e.target.value)}
                    placeholder="Descripción de la imagen"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {localImages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No hay imágenes. Añade una para empezar.
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
