"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  type SiteConfig,
  type Service,
  type CarouselImage,
  defaultSiteConfig,
  defaultServices,
  defaultCarouselImages,
} from "./site-data";

interface SiteContextType {
  config: SiteConfig;
  services: Service[];
  carouselImages: CarouselImage[];
  updateConfig: (config: SiteConfig) => void;
  updateServices: (services: Service[]) => void;
  updateCarouselImages: (images: CarouselImage[]) => void;
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const STORAGE_KEYS = {
  config: "site-config",
  services: "site-services",
  carousel: "site-carousel",
};

export function SiteProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>(defaultCarouselImages);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos del localStorage al montar
  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEYS.config);
    const savedServices = localStorage.getItem(STORAGE_KEYS.services);
    const savedCarousel = localStorage.getItem(STORAGE_KEYS.carousel);

    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedCarousel) setCarouselImages(JSON.parse(savedCarousel));

    setIsLoading(false);
  }, []);

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(newConfig));
  };

  const updateServices = (newServices: Service[]) => {
    setServices(newServices);
    localStorage.setItem(STORAGE_KEYS.services, JSON.stringify(newServices));
  };

  const updateCarouselImages = (newImages: CarouselImage[]) => {
    setCarouselImages(newImages);
    localStorage.setItem(STORAGE_KEYS.carousel, JSON.stringify(newImages));
  };

  return (
    <SiteContext.Provider
      value={{
        config,
        services,
        carouselImages,
        updateConfig,
        updateServices,
        updateCarouselImages,
        isLoading,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteProvider");
  }
  return context;
}
