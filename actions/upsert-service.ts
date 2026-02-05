'use server';
import prisma from '@/lib/prisma';
import { ActionResponse } from '../interfaces/site.interfaces';
import { revalidatePath } from 'next/cache';
import { ServiceSchema } from '@/schemas/service.schema';

export const updateService = async ({
	id,
	service,
}: {
	id?: string;
	service: ServiceSchema;
}): Promise<ActionResponse> => {
	try {
		await prisma.service.update({
			where: { id },
			data: service,
		});
		revalidatePath('/', 'page');
		revalidatePath('/admin/services', 'page');
		return { success: true };
	} catch (error) {
		console.error('Error updating config:', error);
		return {
			success: false,
			error: `Error al actualizar el servicio ${service.title}`,
		};
	}
};

export const addService = async (): Promise<ActionResponse> => {
	try {
		await prisma.service.create({
			data: {
				title: 'Nuevo Servicio',
				description: 'Descripción del servicio...',
				icon: 'home',
			},
		});

		revalidatePath('/admin/services');
		return { success: true };
	} catch (error) {
		console.error('Error al crear el servicio:', error);
		return {
			success: false,
			error: 'No se pudo crear el nuevo servicio',
		};
	}
};
