'use client';

import { addService } from '@/actions/upsert-service';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; // Importante para refrescar la data

export const AddServiceButton = () => {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const createService = async () => {
		setIsPending(true);
		const response = await addService();

		if (response.error) {
			toast.error(response.error);
			setIsPending(false);
			return;
		}

		toast.success('Servicio creado');

		router.refresh();
		setIsPending(false);
	};

	return (
		<Button
			disabled={isPending}
			onClick={createService}
			className='self-end bg-green-600 text-white hover:bg-green-700'
		>
			{isPending ? (
				<Loader2 className='mr-2 h-4 w-4 animate-spin' />
			) : (
				<Plus className='mr-2 h-4 w-4' />
			)}
			Añadir servicio
		</Button>
	);
};
