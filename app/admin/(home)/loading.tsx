import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingInformation() {
	return (
		<div className='container mx-auto space-y-8 py-6'>
			{/* Header Area */}
			<div className='space-y-2'>
				<Skeleton className='h-8 w-64' />
				<Skeleton className='h-4 w-96' />
			</div>

			{/* Form Area */}
			<div className='space-y-6'>
				<div className='grid gap-6 md:grid-cols-2'>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-24' />
						<Skeleton className='h-10 w-full' />
					</div>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-24' />
						<Skeleton className='h-10 w-full' />
					</div>
				</div>

				<div className='space-y-2'>
					<Skeleton className='h-4 w-16' />
					<Skeleton className='h-10 w-full' />
				</div>

				<div className='space-y-2'>
					<Skeleton className='h-4 w-28' />
					<Skeleton className='h-32 w-full' />
				</div>

				<Skeleton className='h-10 w-40' />
			</div>
		</div>
	);
}
