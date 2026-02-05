'use client';

import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SiteConfig } from '@/interfaces/site.interfaces';
interface Props {
	config: SiteConfig | null;
}
export function Contact({ config }: Props) {
	const whatsappLink = `https://wa.me/${config?.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, me gustaría solicitar información sobre sus servicios de construcción.')}`;
	const emailLink = `mailto:${config?.email}?subject=${encodeURIComponent('Solicitud de información')}&body=${encodeURIComponent('Hola, me gustaría solicitar información sobre sus servicios de construcción.')}`;

	return (
		<section
			id='contacto'
			className='bg-background py-20'
		>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-16 text-center'>
					<span className='text-primary text-sm font-medium tracking-wider uppercase'>
						Hablemos
					</span>
					<h2 className='text-foreground mt-2 text-3xl font-bold text-balance sm:text-4xl'>
						Contacta con Nosotros
					</h2>
					<p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
						Estamos aquí para ayudarte a hacer realidad tu proyecto. Contáctanos
						por el medio que prefieras.
					</p>
				</div>

				<div className='grid gap-12 lg:grid-cols-2'>
					{/* Contact Info */}
					<div className='space-y-8'>
						<div className='space-y-6'>
							<div className='flex items-start gap-4'>
								<div className='bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg'>
									<Phone className='text-primary h-5 w-5' />
								</div>
								<div>
									<h3 className='text-foreground font-semibold'>Teléfono</h3>
									<p className='text-muted-foreground'>{config?.phone}</p>
								</div>
							</div>

							<div className='flex items-start gap-4'>
								<div className='bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg'>
									<Mail className='text-primary h-5 w-5' />
								</div>
								<div>
									<h3 className='text-foreground font-semibold'>Email</h3>
									<p className='text-muted-foreground'>{config?.email}</p>
								</div>
							</div>

							<div className='flex items-start gap-4'>
								<div className='bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg'>
									<MapPin className='text-primary h-5 w-5' />
								</div>
								<div>
									<h3 className='text-foreground font-semibold'>Dirección</h3>
									<p className='text-muted-foreground'>{config?.address}</p>
								</div>
							</div>
						</div>

						{/* Quick Contact Buttons */}
						<div className='grid gap-4 lg:grid-cols-2'>
							<Button
								asChild
								size='lg'
								className=''
							>
								<a
									href={whatsappLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									<MessageCircle className='mr-2 h-5 w-5' />
									WhatsApp
								</a>
							</Button>
							<Button
								asChild
								variant='outline'
								size='lg'
								className='bg-transparent'
							>
								<a href={emailLink}>
									<Mail className='mr-2 h-5 w-5' />
									Email
								</a>
							</Button>
						</div>
					</div>

					{/* Contact Form */}
					<div className='bg-card border-border rounded-lg border p-6 sm:p-8'>
						<h3 className='text-foreground mb-6 text-xl font-semibold'>
							Envíanos un mensaje
						</h3>
						<form className='space-y-5'>
							<div className='grid gap-4 sm:grid-cols-2'>
								<div className='space-y-2'>
									<Label htmlFor='name'>Nombre</Label>
									<Input
										id='name'
										placeholder='Tu nombre'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='phone'>Teléfono</Label>
									<Input
										id='phone'
										type='tel'
										placeholder='Tu teléfono'
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='tu@email.com'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='message'>Mensaje</Label>
								<Textarea
									id='message'
									placeholder='Cuéntanos sobre tu proyecto...'
									rows={4}
								/>
							</div>
							<Button
								type='submit'
								className='w-full'
								size='lg'
							>
								Enviar Mensaje
							</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
