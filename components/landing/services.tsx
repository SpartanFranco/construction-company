'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ICONS_MAP } from '@/consts/icons-map';
import { Service } from '@/interfaces/site.interfaces';

interface Props {
	services: Service[];
}
export function Services({ services }: Props) {
	return (
		<section
			id='servicios'
			className='bg-background py-20'
		>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-16 text-center'>
					<span className='text-primary text-sm font-medium tracking-wider uppercase'>
						Lo que hacemos
					</span>
					<h2 className='text-foreground mt-2 text-3xl font-bold text-balance sm:text-4xl'>
						Nuestros Servicios
					</h2>
					<p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
						Ofrecemos soluciones integrales de construcción adaptadas a cada
						proyecto y cliente.
					</p>
				</div>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{services.map((service) => {
						const IconComponent = ICONS_MAP[service.icon] || ICONS_MAP['home'];
						return (
							<Card
								key={service.id}
								className='group border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg'
							>
								<CardHeader>
									<div className='bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors'>
										<IconComponent className='text-primary h-6 w-6' />
									</div>
									<CardTitle className='text-foreground text-lg font-semibold'>
										{service.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className='text-muted-foreground'>
										{service.description}
									</CardDescription>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
