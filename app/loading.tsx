import { Building2, HardHat, Pickaxe } from 'lucide-react';
export default function Loading() {
	return (
		<div className='bg-background fixed inset-0 z-50 flex flex-col items-center justify-center'>
			<div className='relative flex items-center justify-center'>
				<div className='border-primary/20 border-t-primary absolute h-32 w-32 animate-spin rounded-full border-4'></div>

				<div className='relative animate-bounce'>
					<Building2
						size={48}
						className='text-primary'
					/>
					<div className='absolute -top-2 -right-2'>
						<HardHat
							size={20}
							className='animate-pulse text-yellow-500'
						/>
					</div>
				</div>
			</div>

			<div className='mt-8 flex flex-col items-center gap-2'>
				<h2 className='text-foreground text-xl font-bold tracking-widest uppercase'>
					Construyendo
				</h2>
				<div className='flex gap-1'>
					<span className='bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]'></span>
					<span className='bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]'></span>
					<span className='bg-primary h-2 w-2 animate-bounce rounded-full'></span>
				</div>
			</div>

			<div className='absolute bottom-10 opacity-10'>
				<div className='flex gap-4'>
					<Pickaxe size={40} />
					<Building2 size={40} />
					<HardHat size={40} />
				</div>
			</div>
		</div>
	);
}
