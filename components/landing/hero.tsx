'use client';

import { Button } from '@/components/ui/button';
import { SiteConfig } from '@/interfaces/site.interfaces';
import { ArrowRight } from 'lucide-react';

interface Props {
	config: SiteConfig | null;
}
export function Hero({ config }: Props) {
	return (
		<section
			id='inicio'
			className='relative flex min-h-screen items-center justify-center pt-16'
		>
			{/* Background Image */}
			<div
				className='absolute inset-0 bg-cover bg-center bg-no-repeat'
				style={{
					backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop')`,
				}}
			>
				<div className='bg-foreground/70 absolute inset-0' />
			</div>

			{/* Content */}
			<div className='relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
				<span className='bg-primary/20 text-primary-foreground border-primary/30 mb-6 inline-block rounded-full border px-4 py-1.5 text-xs font-medium tracking-wider uppercase'>
					Más de 20 años de experiencia
				</span>

				<h1 className='mb-6 text-4xl leading-tight font-bold text-balance text-white sm:text-5xl lg:text-7xl'>
					{config?.slogan}
				</h1>

				<p className='mx-auto mb-10 max-w-2xl text-lg text-pretty text-white/80 sm:text-xl'>
					{config?.description}
				</p>

				<div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
					<Button
						size='lg'
						asChild
						className='px-8 text-base'
					>
						<a href='#contacto'>
							Contáctanos
							<ArrowRight className='ml-2 h-5 w-5' />
						</a>
					</Button>
					<Button
						size='lg'
						variant='outline'
						asChild
						className='hover:text-foreground border-white bg-transparent px-8 text-base text-white hover:bg-white'
					>
						<a href='#proyectos'>Ver Proyectos</a>
					</Button>
				</div>

				{/* Stats */}
				<div className='mt-20 grid grid-cols-2 gap-8 md:grid-cols-4'>
					{[
						{ value: '500+', label: 'Proyectos Completados' },
						{ value: '20+', label: 'Años de Experiencia' },
						{ value: '150+', label: 'Empleados' },
						{ value: '98%', label: 'Clientes Satisfechos' },
					].map((stat) => (
						<div
							key={stat.label}
							className='text-center'
						>
							<p className='text-3xl font-bold text-white sm:text-4xl'>
								{stat.value}
							</p>
							<p className='mt-1 text-sm text-white/70'>{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
