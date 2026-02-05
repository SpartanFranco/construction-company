'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Service } from '@/interfaces/site.interfaces';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
// Importamos los componentes del AlertDialog
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'; // Ajusta la ruta según tu proyecto
import {
	Check,
	Loader2,
	Trash2,
	Home,
	Building2,
	Hammer,
	Factory,
	Save,
	RotateCcw,
} from 'lucide-react';
import { serviceSchema, ServiceSchema } from '../../../schemas/service.schema';
import { updateService } from '@/actions/upsert-service';
import { deleteService } from '@/actions/delete-service';

const iconOptions = [
	{ value: 'home', label: 'Casa', icon: Home },
	{ value: 'building', label: 'Edificio', icon: Building2 },
	{ value: 'hammer', label: 'Martillo', icon: Hammer },
	{ value: 'factory', label: 'Fábrica', icon: Factory },
];

interface Props {
	service: Service;
	index: number;
}

export function ServiceCardForm({ service, index }: Props) {
	const [isSaved, setIsSaved] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false); // Estado para el loading del borrado
	const cardRef = useRef<HTMLFormElement>(null);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<ServiceSchema>({
		resolver: zodResolver(serviceSchema),
		defaultValues: {
			id: service.id,
			title: service.title,
			icon: service.icon,
			description: service.description,
		},
	});

	const isNew = service.title === 'Nuevo Servicio';

	useEffect(() => {
		if (isNew && cardRef.current) {
			const timer = setTimeout(() => {
				cardRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [isNew]);

	const currentIcon = watch('icon');

	const onSubmit = async ({ id, ...rest }: ServiceSchema) => {
		const result = await updateService({ id, service: rest });

		if (result.error) {
			toast.error(result.error);
			return;
		}
		setIsSaved(true);
		toast.success(`Servicio actualizado`);
		reset({ id, ...rest });
		setTimeout(() => setIsSaved(false), 2000);
	};

	const onDelete = async () => {
		setIsDeleting(true);
		const result = await deleteService(service.id);

		if (result.error) {
			toast.error(result.message || 'No se pudo eliminar el servicio');
			setIsDeleting(false);
			return;
		}
		toast.success(`Servicio eliminado`);
		// No hace falta poner isDeleting en false porque el componente se desmontará
	};

	const onCancel = () => {
		reset();
		toast.info('Cambios descartados');
	};

	return (
		<form
			ref={cardRef}
			onSubmit={handleSubmit(onSubmit)}
			className={`group bg-card relative space-y-4 rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${
				isDirty ? 'border-amber-200 bg-amber-50/10' : ''
			}`}
		>
			<div className='flex items-center justify-between border-b pb-2'>
				<h3 className='text-muted-foreground text-sm font-medium'>
					Servicio {index + 1}
				</h3>

				{isNew && (
					<div className='absolute -top-3 left-4 animate-pulse rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm'>
						NUEVO
					</div>
				)}

				<div className='flex gap-2'>
					{isDirty && (
						<Button
							type='button'
							variant='ghost'
							size='sm'
							onClick={onCancel}
							className='text-muted-foreground hover:text-foreground h-8'
						>
							<RotateCcw className='mr-1 h-3.5 w-3.5' />
							Cancelar
						</Button>
					)}

					<Button
						type='submit'
						size='sm'
						variant={isDirty ? 'default' : 'outline'}
						disabled={isSubmitting || (!isDirty && !isSaved)}
						className='h-8'
					>
						{isSubmitting ? (
							<Loader2 className='h-4 w-4 animate-spin' />
						) : isSaved ? (
							<Check className='h-4 w-4 text-green-500' />
						) : (
							<Save className='h-4 w-4' />
						)}
						<span className='ml-2 text-xs'>
							{isSaved ? 'Guardado' : 'Guardar'}
						</span>
					</Button>

					{/* Implementación del AlertDialog para eliminar */}
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='text-destructive hover:bg-destructive/10 h-8 w-8'
								disabled={isDeleting}
							>
								{isDeleting ? (
									<Loader2 className='h-4 w-4 animate-spin' />
								) : (
									<Trash2 className='h-4 w-4' />
								)}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									¿Estás completamente seguro?
								</AlertDialogTitle>
								<AlertDialogDescription>
									Esta acción no se puede deshacer. Eliminarás el servicio
									<span className='text-foreground font-semibold'>
										{' '}
										&quot;{service.title}&quot;
									</span>{' '}
									de forma permanente.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction
									onClick={onDelete}
									className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
								>
									Eliminar servicio
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>

			{/* Grid de Inputs... */}
			<div className='grid gap-4 md:grid-cols-2'>
				<div className='space-y-2'>
					<Label className='text-xs'>Título</Label>
					<Input
						{...register('title')}
						placeholder='Ej: Reformas Integrales'
						className='h-9 text-sm'
					/>
					{errors.title && (
						<p className='text-destructive text-[11px]'>
							{errors.title.message}
						</p>
					)}
				</div>

				<div className='space-y-2'>
					<Label className='text-xs'>Icono</Label>
					<Select
						value={currentIcon}
						onValueChange={(val) =>
							setValue('icon', val, { shouldDirty: true })
						}
					>
						<SelectTrigger className='h-9'>
							<SelectValue placeholder='Icono' />
						</SelectTrigger>
						<SelectContent>
							{iconOptions.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
								>
									<div className='flex items-center gap-2'>
										<opt.icon className='text-muted-foreground h-4 w-4' />
										<span className='text-sm'>{opt.label}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='space-y-2'>
				<Label className='text-xs'>Descripción</Label>
				<Textarea
					{...register('description')}
					className='h-20 resize-none text-sm'
					placeholder='Describe el servicio...'
				/>
				{errors.description && (
					<p className='text-destructive text-[11px]'>
						{errors.description.message}
					</p>
				)}
			</div>
		</form>
	);
}
