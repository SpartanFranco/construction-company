"use client";

import { SiteProvider } from "@/lib/site-context";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { ImageCarousel } from "@/components/landing/image-carousel";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <SiteProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Services />
          <ImageCarousel />
          <Contact />
        </main>
        <Footer />
      </div>
    </SiteProvider>
  );
}
