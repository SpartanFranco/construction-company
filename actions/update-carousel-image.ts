// actions/create-image-carousel.ts
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const updateCarouselAction = async (formData: FormData) => {
	try {
		const altTexts = formData.getAll('alt') as string[];
		const files = formData.getAll('files') as File[];
		const existingUrls = formData.getAll('urls') as string[];

		// 1. Procesar imágenes (Cloudinary)
		const uploadPromises = files.map(async (file, index) => {
			if (file.size === 0) return existingUrls[index]; // No cambió, usar URL vieja

			const buffer = await file.arrayBuffer();
			const base64 = Buffer.from(buffer).toString('base64');
			const res = await cloudinary.uploader.upload(
				`data:${file.type};base64,${base64}`,
				{
					folder: 'carousel',
				},
			);
			return res.secure_url;
		});

		const finalUrls = await Promise.all(uploadPromises);

		// 2. Persistir en DB con Prisma
		await prisma.$transaction(async (tx) => {
			// Eliminamos las actuales para reflejar la nueva lista exacta (incluyendo borrados)
			await tx.carouselImage.deleteMany({});

			// Creamos las nuevas con el orden actual
			await tx.carouselImage.createMany({
				data: finalUrls.map((url, index) => ({
					url,
					alt: altTexts[index] || '',
					order: index,
				})),
			});
		});

		revalidatePath('/admin/carousel'); // Refresca las props del componente
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Error al actualizar la base de datos' };
	}
};
