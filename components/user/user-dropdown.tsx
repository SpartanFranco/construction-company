'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { LogOut, User as UserIcon } from 'lucide-react';
import { authClient, useSession } from '@/lib/auth-client';
import { useEffect, useEffectEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export const UserDropdown = () => {
	const [mounted, setMounted] = useState(false);
	const mountedEffect = useEffectEvent(() => setMounted(true));
	useEffect(() => {
		mountedEffect();
	}, []);

	const { data: session } = useSession();
	const router = useRouter();
	const logout = async () => {
		await authClient.signOut();
		router.push('/');
	};
	if (!mounted) {
		return (
			<Button
				variant='ghost'
				className='flex items-center gap-2 opacity-0'
			>
				<div className='bg-muted h-8 w-8 rounded-full' />
			</Button>
		);
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='flex items-center gap-2 py-5'
				>
					<div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full'>
						<UserIcon className='text-primary h-4 w-4' />
					</div>
					<span className='hidden text-sm sm:inline'>
						{session?.user?.name || session?.user?.email}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-56'
			>
				<DropdownMenuLabel>
					<div className='flex flex-col'>
						<span>{session?.user?.name}</span>
						<span className='text-muted-foreground text-xs font-normal'>
							{session?.user?.email}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={logout}
					className='text-destructive focus:text-destructive cursor-pointer'
				>
					<LogOut className='mr-2 size-4' />
					Cerrar sesion
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
