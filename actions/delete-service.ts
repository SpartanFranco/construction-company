'use server';

import { ActionResponse } from '@/interfaces/site.interfaces';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteService = async (id: string): Promise<ActionResponse> => {
	try {
		await prisma.service.delete({
			where: { id },
		});

		revalidatePath('/', 'layout');
		revalidatePath('/admin/services');

		return { success: true };
	} catch (error) {
		console.error('Error al eliminar el servicio:', error);
		return {
			success: false,
			error: 'No se pudo eliminar el servicio. Es posible que ya no exista.',
		};
	}
};
