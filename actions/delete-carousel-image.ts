'use server';

import { ActionResponse } from '@/interfaces/site.interfaces';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

/**
 * Función reutilizable para borrar archivos de Cloudinary
 */
export const deleteFromCloudinary = async (
	imageUrl: string,
): Promise<boolean> => {
	try {
		if (!imageUrl || !imageUrl.includes('res.cloudinary.com')) return false;

		// Extraemos el public_id (ej: carousel/nombre_imagen)
		const parts = imageUrl.split('/');
		const fileName = parts.pop()?.split('.')[0] ?? '';
		const folder = parts.pop(); // Si usas carpetas
		const publicId = folder ? `${folder}/${fileName}` : fileName;

		await cloudinary.uploader.destroy(publicId);
		return true;
	} catch (error) {
		console.error('Error Cloudinary Destroy:', error);
		return false;
	}
};

/**
 * Borrado completo (DB + Cloudinary)
 */
export const deleteCarouselImage = async (
	imageId: string,
	imageUrl: string,
): Promise<ActionResponse> => {
	try {
		// 1. Intentar borrar de Cloudinary si aplica
		await deleteFromCloudinary(imageUrl);

		// 2. Borrar de la DB (Solo si tiene un ID real de base de datos)
		// Verificamos que no sea un UUID temporal del cliente
		if (imageId && imageId.length > 20) {
			// Asumiendo que tus IDs de DB son CUID o Int largos
			await prisma.carouselImage.delete({
				where: { id: imageId },
			});
		}

		revalidatePath(`/`);
		revalidatePath(`/admin/carousel`);

		return { success: true, message: 'Imagen eliminada correctamente' };
	} catch (error) {
		return { success: false, error: 'No se pudo eliminar de la base de datos' };
	}
};
