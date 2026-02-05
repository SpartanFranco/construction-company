export default function Loading() {
	return (
		<div className='animate-pulse space-y-6'>
			<div>
				<div className='bg-muted h-6 w-40 rounded' />
				<div className='bg-muted mt-2 h-4 w-72 rounded' />
			</div>

			<div className='grid gap-4 lg:grid-cols-2'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className='bg-muted/40 space-y-4 rounded-lg border p-4'
					>
						<div className='bg-muted h-4 w-24 rounded' />
						<div className='grid gap-4 md:grid-cols-2'>
							<div className='bg-muted h-10 rounded' />
							<div className='bg-muted h-10 rounded' />
						</div>
						<div className='bg-muted h-32 rounded' />
					</div>
				))}
			</div>

			<div className='bg-muted h-10 w-40 rounded' />
		</div>
	);
}
