'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CarouselImage } from '@/interfaces/site.interfaces';
import Image from 'next/image';

interface Props {
	carouselImages: CarouselImage[];
}
export function ImageCarousel({ carouselImages }: Props) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
	}, [carouselImages.length]);

	const prevSlide = useCallback(() => {
		setCurrentIndex(
			(prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
		);
	}, [carouselImages.length]);

	// Auto-advance slides
	useEffect(() => {
		const timer = setInterval(nextSlide, 5000);
		return () => clearInterval(timer);
	}, [nextSlide]);

	if (carouselImages.length === 0) return null;

	return (
		<section
			id='proyectos'
			className='bg-muted py-20'
		>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-12 text-center'>
					<span className='text-primary text-sm font-medium tracking-wider uppercase'>
						Nuestro Trabajo
					</span>
					<h2 className='text-foreground mt-2 text-3xl font-bold text-balance sm:text-4xl'>
						Proyectos Destacados
					</h2>
					<p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
						Cada proyecto refleja nuestro compromiso con la excelencia y la
						atención al detalle.
					</p>
				</div>

				<div className='relative'>
					{/* Main Image */}
					<div className='relative aspect-[16/9] overflow-hidden rounded-lg md:aspect-[21/9]'>
						{carouselImages.map((image, index) => (
							<div
								key={image.id}
								className={cn(
									'absolute inset-0 transition-opacity duration-700',
									index === currentIndex ? 'opacity-100' : 'opacity-0',
								)}
							>
								<Image
									src={image.url || '/placeholder.svg'}
									alt={image.alt}
									width={1000}
									height={900}
									className='h-full w-full object-cover'
								/>
								<div className='from-foreground/50 absolute inset-0 bg-gradient-to-t to-transparent' />
								<div className='absolute right-6 bottom-6 left-6'>
									<p className='text-lg font-medium text-white'>{image.alt}</p>
								</div>
							</div>
						))}
					</div>

					{/* Navigation Buttons */}
					<Button
						variant='outline'
						size='icon'
						className='bg-background/80 hover:bg-background absolute top-1/2 left-4 -translate-y-1/2 border-0'
						onClick={prevSlide}
						aria-label='Imagen anterior'
					>
						<ChevronLeft className='h-5 w-5' />
					</Button>
					<Button
						variant='outline'
						size='icon'
						className='bg-background/80 hover:bg-background absolute top-1/2 right-4 -translate-y-1/2 border-0'
						onClick={nextSlide}
						aria-label='Siguiente imagen'
					>
						<ChevronRight className='h-5 w-5' />
					</Button>

					{/* Dots */}
					<div className='mt-6 flex items-center justify-center gap-2'>
						{carouselImages.map((_, index) => (
							<button
								key={index}
								type='button'
								className={cn(
									'h-2 w-2 rounded-full transition-all',
									index === currentIndex
										? 'bg-primary w-8'
										: 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
								)}
								onClick={() => setCurrentIndex(index)}
								aria-label={`Ir a imagen ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
