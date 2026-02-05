'use server';

import {
	ActionResponse,
	UpdateSiteConfigInput,
} from '@/interfaces/site.interfaces';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateSiteConfigAction(
	data: UpdateSiteConfigInput,
): Promise<ActionResponse> {
	try {
		await prisma.siteConfig.upsert({
			where: { id: 'singleton' },
			update: data,
			create: {
				id: 'singleton',
				...data,
			},
		});

		revalidatePath('/', 'layout');
		revalidatePath('/admin', 'page');
		return { success: true };
	} catch (error) {
		console.error('Error updating config:', error);
		return { success: false, error: 'Error al guardar la configuración' };
	}
}
