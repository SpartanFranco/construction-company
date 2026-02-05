export interface SiteConfig {
	companyName: string;
	slogan: string;
	description: string;
	whatsapp: string;
	email: string;
	phone: string;
	address: string;
}

export interface Service {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export interface CarouselImage {
	id: string;
	url: string;
	alt: string;
}

export const defaultSiteConfig: SiteConfig = {
	companyName: 'Constructora Moderna',
	slogan: 'Construimos tus sueños con calidad y compromiso',
	description:
		'Somos una empresa líder en el sector de la construcción, con más de 20 años de experiencia. Nos especializamos en obras residenciales, comerciales y reformas integrales.',
	whatsapp: '+34612345678',
	email: 'contacto@constructoramoderna.com',
	phone: '+34 912 345 678',
	address: 'Calle Principal 123, Madrid, España',
};

export const defaultServices: Service[] = [
	{
		id: '1',
		title: 'Construcción Residencial',
		description:
			'Construcción de viviendas unifamiliares y edificios residenciales con los más altos estándares de calidad.',
		icon: 'home',
	},
	{
		id: '2',
		title: 'Obras Comerciales',
		description:
			'Desarrollo de espacios comerciales, oficinas y locales adaptados a las necesidades de tu negocio.',
		icon: 'building',
	},
	{
		id: '3',
		title: 'Reformas Integrales',
		description:
			'Renovación completa de espacios existentes, modernizando y optimizando cada rincón.',
		icon: 'hammer',
	},
	{
		id: '4',
		title: 'Proyectos Industriales',
		description:
			'Construcción de naves industriales, almacenes y centros logísticos de alta eficiencia.',
		icon: 'factory',
	},
];

export const defaultCarouselImages: CarouselImage[] = [
	{
		id: '1',
		url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop',
		alt: 'Proyecto de construcción moderna',
	},
	{
		id: '2',
		url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=600&fit=crop',
		alt: 'Estructura de edificio en construcción',
	},
	{
		id: '3',
		url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop',
		alt: 'Arquitectura moderna residencial',
	},
	{
		id: '4',
		url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
		alt: 'Edificio comercial terminado',
	},
];
