import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCarousel() {
	return (
		<div className='max-w-6xl space-y-8 py-10'>
			<div className='flex items-end justify-between'>
				<div className='space-y-2'>
					<Skeleton className='h-8 w-64' />
					<Skeleton className='h-4 w-96' />
				</div>
				<Skeleton className='h-9 w-32' />
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className='border-border overflow-hidden rounded-xl border'
					>
						<Skeleton className='aspect-video w-full' />
						<div className='space-y-4 p-4'>
							<div className='flex justify-between'>
								<Skeleton className='h-4 w-20' />
								<Skeleton className='h-8 w-8' />
							</div>
							<Skeleton className='h-9 w-full' />
							<Skeleton className='h-9 w-full' />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
