import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
	defaultCarouselImages,
	defaultServices,
	defaultSiteConfig,
} from './data';

export async function main() {
	await prisma.session.deleteMany();
	await prisma.account.deleteMany();
	await prisma.user.deleteMany();
	await prisma.service.deleteMany();
	await prisma.carouselImage.deleteMany();
	await prisma.siteConfig.deleteMany();

	const user = await auth.api.signUpEmail({
		body: {
			email: 'geovani@gmail.com',
			name: 'Geovani Franco',
			password: '12345678',
		},
	});

	await prisma.user.update({
		where: { id: user.user.id },
		data: { role: 'admin' },
	});

	console.log('Admin creado correctamente');

	await prisma.siteConfig.upsert({
		where: { id: 'singleton' },
		update: { ...defaultSiteConfig },
		create: {
			id: 'singleton',
			...defaultSiteConfig,
		},
	});
	console.log('✅ Configuración del sitio inicializada');

	await prisma.service.createMany({
		data: defaultServices.map((service, index) => ({
			title: service.title,
			description: service.description,
			icon: service.icon,
			order: index,
		})),
	});
	console.log('✅ Servicios inicializados');

	await prisma.carouselImage.createMany({
		data: defaultCarouselImages.map((image, index) => ({
			url: image.url,
			alt: image.alt,
			order: index,
		})),
	});
	console.log('✅ Imágenes del carrusel inicializadas');
}

main();
