import { z } from 'zod';

export const serviceSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(3, 'Mínimo 3 caracteres'),
	icon: z.string().min(1, 'Selecciona un icono'),
	description: z.string().min(10, 'Mínimo 10 caracteres'),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
