import { ICON } from '@/consts/icons-map';

export interface SiteConfig {
	id: string;
	companyName: string;
	phone: string;
	slogan: string;
	description: string;
	email: string;
	whatsapp: string;
	address: string;
	updatedAt?: Date;
}

export interface CarouselImage {
	id: string;
	url: string;
	alt: string;
	order: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface Service {
	id: string;
	title: string;
	description: string;
	icon: ICON; // 'home' | 'building' | 'hammer' | 'factory'
	order: number;
	createdAt?: Date;
	updatedAt?: Date;
}

// --- Tipos para las Server Actions (Payloads) ---

export type UpdateSiteConfigInput = Omit<SiteConfig, 'id' | 'updatedAt'>;

export type UpdateCarouselImageInput = Omit<
	CarouselImage,
	'id' | 'createdAt' | 'updatedAt'
> & {
	id?: string;
};

export type UpdateServiceInput = Omit<
	Service,
	'id' | 'createdAt' | 'updatedAt'
> & {
	id?: string;
};

// --- Tipos para las respuestas de las Actions ---

export interface ActionResponse {
	success: boolean;
	message?: string;
	error?: string;
}
