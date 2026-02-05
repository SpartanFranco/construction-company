// @/app/actions/site-actions.ts
'use server';

import {
	CarouselImage,
	Service,
	SiteConfig,
} from '@/interfaces/site.interfaces';
import prisma from '@/lib/prisma';

/**
 * OBTIENE LA CONFIGURACIÓN GLOBAL
 * Si no existe, devuelve un objeto vacío o valores por defecto para evitar errores.
 */
export async function getSiteConfig(): Promise<SiteConfig | null> {
	try {
		const config = await prisma.siteConfig.findUnique({
			where: { id: 'singleton' },
		});
		return config;
	} catch (error) {
		console.error('Error fetching site config:', error);
		return null;
	}
}

/**
 * OBTIENE TODOS LOS SERVICIOS
 * Ordenados por el campo 'order' de forma ascendente.
 */
export async function getServices(): Promise<Service[]> {
	try {
		const services = await prisma.service.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
		return services as Service[];
	} catch (error) {
		console.error('Error fetching services:', error);
		return [];
	}
}

/**
 * OBTIENE LAS IMÁGENES DEL CARRUSEL
 * Ordenadas por el campo 'order' de forma ascendente.
 */
export async function getCarouselImages(): Promise<CarouselImage[]> {
	try {
		const images = await prisma.carouselImage.findMany({
			orderBy: {
				order: 'asc',
			},
		});
		return images;
	} catch (error) {
		console.error('Error fetching carousel images:', error);
		return [];
	}
}

/**
 * HELPER: OBTIENE TODOS LOS DATOS EN UNA SOLA LLAMADA (Ideal para el Contexto)
 */
export async function getAllSiteData() {
	try {
		const [config, services, carouselImages] = await Promise.all([
			getSiteConfig(),
			getServices(),
			getCarouselImages(),
		]);

		return {
			config,
			services,
			carouselImages,
		};
	} catch (error) {
		console.error('Error fetching all site data:', error);
		return {
			config: null,
			services: [],
			carouselImages: [],
		};
	}
}
