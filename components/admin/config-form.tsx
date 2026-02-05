'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { SiteConfig } from '@/interfaces/site.interfaces';

import { toast } from 'sonner';
import {
	siteConfigSchema,
	SiteConfigSchema,
} from '../../schemas/config.schema';
import { updateSiteConfigAction } from '@/actions/site-config';

interface Props {
	config: SiteConfig;
}

export function ConfigForm({ config }: Props) {
	const [saved, setSaved] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<SiteConfigSchema>({
		resolver: zodResolver(siteConfigSchema),
		defaultValues: config,
	});

	const onSubmit = async (data: SiteConfigSchema) => {
		const result = await updateSiteConfigAction(data);

		if (result.error) {
			toast.error(result.error || 'Ocurrió un error');
			return;
		}

		setSaved(true);
		toast.success('Configuración actualizada');
		setTimeout(() => setSaved(false), 2000);
	};

	return (
		<Card>
			<CardContent className='pt-6'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<div className='grid gap-6 md:grid-cols-2'>
						{/* Nombre de la Empresa */}
						<div className='space-y-2'>
							<Label htmlFor='companyName'>Nombre de la Empresa</Label>
							<Input
								id='companyName'
								{...register('companyName')}
							/>
							{errors.companyName && (
								<p className='text-destructive text-xs'>
									{errors.companyName.message}
								</p>
							)}
						</div>

						{/* Teléfono */}
						<div className='space-y-2'>
							<Label htmlFor='phone'>Teléfono</Label>
							<Input
								id='phone'
								{...register('phone')}
							/>
							{errors.phone && (
								<p className='text-destructive text-xs'>
									{errors.phone.message}
								</p>
							)}
						</div>
					</div>

					{/* Eslogan */}
					<div className='space-y-2'>
						<Label htmlFor='slogan'>Eslogan</Label>
						<Input
							id='slogan'
							{...register('slogan')}
						/>
						{errors.slogan && (
							<p className='text-destructive text-xs'>
								{errors.slogan.message}
							</p>
						)}
					</div>

					{/* Descripción */}
					<div className='space-y-2'>
						<Label htmlFor='description'>Descripción</Label>
						<Textarea
							id='description'
							rows={3}
							{...register('description')}
						/>
						{errors.description && (
							<p className='text-destructive text-xs'>
								{errors.description.message}
							</p>
						)}
					</div>

					<div className='grid gap-6 md:grid-cols-2'>
						{/* Email */}
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								{...register('email')}
							/>
							{errors.email && (
								<p className='text-destructive text-xs'>
									{errors.email.message}
								</p>
							)}
						</div>

						{/* WhatsApp */}
						<div className='space-y-2'>
							<Label htmlFor='whatsapp'>WhatsApp</Label>
							<Input
								id='whatsapp'
								placeholder='+34612345678'
								{...register('whatsapp')}
							/>
							{errors.whatsapp && (
								<p className='text-destructive text-xs'>
									{errors.whatsapp.message}
								</p>
							)}
						</div>
					</div>

					{/* Dirección */}
					<div className='space-y-2'>
						<Label htmlFor='address'>Dirección</Label>
						<Input
							id='address'
							{...register('address')}
						/>
						{errors.address && (
							<p className='text-destructive text-xs'>
								{errors.address.message}
							</p>
						)}
					</div>

					<div className='flex items-center gap-4 pt-2'>
						<Button
							type='submit'
							disabled={isSubmitting || !isDirty}
							className='min-w-35'
						>
							{isSubmitting ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Guardando...
								</>
							) : saved ? (
								<>
									<Check className='mr-2 h-4 w-4' />
									Guardado
								</>
							) : (
								'Guardar Cambios'
							)}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
