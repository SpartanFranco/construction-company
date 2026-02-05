'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw, Home, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	useEffect(() => {
		// Aquí podrías enviar el error a Sentry o LogRocket
		console.error(error);
	}, [error]);

	return (
		<div className='flex min-h-[70vh] flex-col items-center justify-center px-4'>
			<div className='text-center'>
				{/* Icono de Alerta con pulso suave */}
				<div className='relative mb-6 inline-flex'>
					<div className='bg-destructive/20 absolute inset-0 animate-ping rounded-full opacity-75'></div>
					<div className='bg-destructive/10 relative rounded-full p-4'>
						<AlertCircle className='text-destructive h-12 w-12' />
					</div>
				</div>

				{/* Mensajes */}
				<h1 className='mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl'>
					¡Vaya! Algo salió mal
				</h1>
				<p className='text-muted-foreground mx-auto mb-8 max-w-md'>
					No te preocupes, esto suele ser temporal. Hemos registrado el error y
					nuestro equipo lo revisará.
				</p>

				{/* Detalles técnicos (Opcional, útil en desarrollo) */}
				<div className='bg-muted/50 text-muted-foreground mb-8 rounded-lg border p-4 font-mono text-xs'>
					Error: {error.message || 'Unknown technical error'}
					{error.digest && (
						<div className='mt-1 opacity-50'>ID: {error.digest}</div>
					)}
				</div>

				{/* Acciones */}
				<div className='flex flex-wrap items-center justify-center gap-4'>
					<Button
						onClick={() => reset()}
						variant='default'
						size='lg'
						className='min-w-35'
					>
						<RefreshCcw className='mr-2 h-4 w-4' />
						Reintentar
					</Button>

					<Button
						onClick={() => router.push('/')}
						variant='outline'
						size='lg'
						className='min-w-35'
					>
						<Home className='mr-2 h-4 w-4' />
						Volver al inicio
					</Button>
				</div>
			</div>

			{/* Link discreto para volver atrás */}
			<button
				onClick={() => router.back()}
				className='text-muted-foreground hover:text-foreground mt-8 flex items-center text-sm transition-colors'
			>
				<ChevronLeft className='mr-1 h-4 w-4' />
				Regresar a la página anterior
			</button>
		</div>
	);
}
