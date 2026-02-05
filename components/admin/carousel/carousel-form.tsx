'use client';

import { useState, useTransition } from 'react';
import { CarouselImage } from '@/interfaces/site.interfaces';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus, Trash2, Check, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { updateCarouselAction } from '@/actions/update-carousel-image';
import {
	deleteFromCloudinary,
	deleteCarouselImage,
} from '@/actions/delete-carousel-image';

export function CarouselForm({
	carouselImages,
}: {
	carouselImages: CarouselImage[];
}) {
	// Inicializamos con tempId igual al id de la DB para las existentes
	const [localImages, setLocalImages] = useState<
		(Partial<CarouselImage> & { file?: File; tempId: string })[]
	>(carouselImages.map((img) => ({ ...img, tempId: img.id })));

	const [isPending, startTransition] = useTransition();
	const [saved, setSaved] = useState(false);

	const addImage = () => {
		setLocalImages((prev) => [
			...prev,
			{
				tempId: crypto.randomUUID(),
				url: '',
				alt: '',
				file: undefined,
			},
		]);
	};

	const handleFileChange = (tempId: string, file: File) => {
		const previewUrl = URL.createObjectURL(file);
		setLocalImages((prev) =>
			prev.map((img) =>
				img.tempId === tempId ? { ...img, url: previewUrl, file } : img,
			),
		);
	};

	const onRemoveImage = async (
		image: Partial<CarouselImage> & { file?: File; tempId: string },
	) => {
		if (!image.url && !image.file) {
			setLocalImages((prev) => prev.filter((i) => i.tempId !== image.tempId));
			return;
		}

		startTransition(async () => {
			// Caso B: Imagen ya existe en la Base de Datos
			if (image.id) {
				const res = await deleteCarouselImage(image.id, image.url!);
				if (res.success) {
					setLocalImages((prev) =>
						prev.filter((i) => i.tempId !== image.tempId),
					);
					toast.success(res.message);
				} else {
					toast.error(res.error);
				}
			}
			// Caso C: Imagen subida a Cloudinary pero el formulario NO se ha guardado todavía
			else if (image.url && image.url.startsWith('http')) {
				await deleteFromCloudinary(image.url);
				setLocalImages((prev) => prev.filter((i) => i.tempId !== image.tempId));
				toast.success('Imagen eliminada de Cloudinary');
			}
			// Caso D: Solo era una previa local (Blob URL)
			else {
				setLocalImages((prev) => prev.filter((i) => i.tempId !== image.tempId));
			}
		});
	};

	const handleSave = async () => {
		const formData = new FormData();
		localImages.forEach((img) => {
			formData.append('id', img.id || 'new');
			formData.append('alt', img.alt || '');
			formData.append('urls', img.file ? '' : img.url || '');
			formData.append('files', img.file || new Blob([]));
		});

		startTransition(async () => {
			const res = await updateCarouselAction(formData);
			if (res.success) {
				setSaved(true);
				toast.success('Carrusel actualizado');
				setTimeout(() => setSaved(false), 2000);
			} else {
				toast.error(res.message);
			}
		});
	};

	return (
		<div className='space-y-4'>
			<div className='flex justify-end'>
				<Button
					onClick={addImage}
					variant='outline'
					className='bg-green-600 text-white hover:bg-green-700 hover:text-white'
				>
					<Plus className='mr-2 h-4 w-4' /> Añadir imagen
				</Button>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				{localImages.map((image, index) => (
					<Card
						key={image.tempId}
						className='overflow-hidden pt-0 shadow-sm'
					>
						<div className='bg-muted group relative aspect-video'>
							{image.url ? (
								<Image
									src={image.url}
									alt={image.alt || ''}
									fill
									className='object-cover'
								/>
							) : (
								<div className='absolute inset-0 flex items-center justify-center'>
									<ImageIcon className='h-12 w-12 opacity-20' />
								</div>
							)}
							<label className='absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'>
								<span className='text-sm font-medium text-white'>
									Cambiar Foto
								</span>
								<input
									type='file'
									className='hidden'
									accept='image/*'
									onChange={(e) =>
										e.target.files?.[0] &&
										handleFileChange(image.tempId, e.target.files[0])
									}
								/>
							</label>
						</div>

						<CardContent className='space-y-3 p-4'>
							<div className='flex items-center justify-between'>
								<span className='text-muted-foreground text-xs font-bold uppercase'>
									Imagen {index + 1}
								</span>
								<Button
									variant='ghost'
									size='sm'
									disabled={isPending}
									className='text-destructive hover:bg-destructive/10'
									onClick={() => onRemoveImage(image)}
								>
									{isPending ? (
										<Loader2 className='h-4 w-4 animate-spin' />
									) : (
										<Trash2 className='h-4 w-4' />
									)}
								</Button>
							</div>
							<Input
								placeholder='Texto Alternativo'
								value={image.alt}
								onChange={(e) =>
									setLocalImages((prev) =>
										prev.map((i) =>
											i.tempId === image.tempId
												? { ...i, alt: e.target.value }
												: i,
										),
									)
								}
							/>
						</CardContent>
					</Card>
				))}
			</div>

			<Button
				onClick={handleSave}
				disabled={isPending}
				className='w-full'
			>
				{isPending ? (
					<Loader2 className='mr-2 animate-spin' />
				) : saved ? (
					<Check className='mr-2' />
				) : null}
				{isPending ? 'Guardando...' : 'Sincronizar con Base de Datos'}
			</Button>
		</div>
	);
}
