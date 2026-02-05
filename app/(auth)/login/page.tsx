'use client';

import React, { useState } from 'react'; // Añadido useState aquí
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
// Añadidos los iconos Eye y EyeOff
import {
	Building2,
	Mail,
	Lock,
	AlertCircle,
	Loader2,
	Eye,
	EyeOff,
} from 'lucide-react';
import { signIn } from '@/lib/auth-client';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false); // Nuevo estado
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsSubmitting(true);

		if (!email || !password) {
			setError('Por favor completa todos los campos');
			setIsSubmitting(false);
			return;
		}

		const result = await signIn.email({
			email,
			password,
		});

		if (result.error) {
			setError(result.error.message || 'Correo o contraseña incorrectos');
			setIsSubmitting(false);
			return;
		}

		router.refresh();

		router.push('/admin');
	};

	return (
		<div className='bg-muted flex min-h-screen items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				{/* Logo */}
				<div className='mb-8 text-center'>
					<Link
						href='/'
						className='inline-flex items-center gap-2'
					>
						<div className='bg-primary flex h-10 w-10 items-center justify-center rounded-lg'>
							<Building2 className='text-primary-foreground h-6 w-6' />
						</div>
						<span className='text-foreground text-xl font-bold'>
							Constructora
						</span>
					</Link>
				</div>

				<Card className='border-0 shadow-lg'>
					<CardHeader className='pb-2 text-center'>
						<CardTitle className='text-2xl'>Iniciar Sesion</CardTitle>
						<CardDescription>Accede al panel de administracion</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit}
							className='space-y-4'
						>
							{error && (
								<div className='bg-destructive/10 border-destructive/20 text-destructive flex items-center gap-2 rounded-lg border p-3 text-sm'>
									<AlertCircle className='h-4 w-4 shrink-0' />
									<span>{error}</span>
								</div>
							)}

							<div className='space-y-2'>
								<Label htmlFor='email'>Correo electronico</Label>
								<div className='relative'>
									<Mail className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
									<Input
										id='email'
										type='email'
										placeholder='tu@correo.com'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='pl-10'
										disabled={isSubmitting}
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='password'>Contrasena</Label>
								<div className='relative'>
									<Lock className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
									<Input
										id='password'
										// Cambia el type dinámicamente
										type={showPassword ? 'text' : 'password'}
										placeholder='********'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='pr-10 pl-10' // Añadido padding derecho
										disabled={isSubmitting}
									/>
									{/* Botón para alternar visibilidad */}
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors'
										tabIndex={-1} // Para que no interfiera con el flujo del tabulador
									>
										{showPassword ? (
											<EyeOff className='h-4 w-4' />
										) : (
											<Eye className='h-4 w-4' />
										)}
									</button>
								</div>
							</div>

							<Button
								type='submit'
								className='w-full'
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Iniciando sesion...
									</>
								) : (
									'Iniciar Sesión'
								)}
							</Button>
						</form>
					</CardContent>
				</Card>

				<p className='text-muted-foreground mt-6 text-center text-xs'>
					<Link
						href='/'
						className='hover:underline'
					>
						Volver al sitio principal
					</Link>
				</p>
			</div>
		</div>
	);
}
