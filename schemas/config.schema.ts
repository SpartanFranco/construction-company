import { z } from 'zod';

export const siteConfigSchema = z.object({
	companyName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
	phone: z.string().min(5, 'Número de teléfono no válido'),
	slogan: z.string().min(5, 'El eslogan es muy corto'),
	description: z.string().min(10, 'La descripción debe ser más detallada'),
	email: z.string().email('Email no válido'),
	whatsapp: z.string().min(7, 'WhatsApp no válido'),
	address: z.string().min(5, 'La dirección es requerida'),
});

export type SiteConfigSchema = z.infer<typeof siteConfigSchema>;
