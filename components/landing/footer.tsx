import { getSession } from '@/actions/get-session';
import { SiteConfig } from '@/interfaces/site.interfaces';
import Link from 'next/link';

interface Props {
	config?: SiteConfig | null;
}
export async function Footer({ config }: Props) {
	const session = await getSession();

	return (
		<footer className='bg-foreground text-background py-12'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
					{/* Company Info */}
					<div>
						<div className='mb-4 flex items-center gap-2'>
							<div className='bg-primary flex h-10 w-10 items-center justify-center rounded'>
								<span className='text-primary-foreground text-lg font-bold'>
									CM
								</span>
							</div>
							<span className='text-lg font-semibold'>
								{config?.companyName}
							</span>
						</div>
						<p className='text-background/70 text-sm'>{config?.description}</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className='mb-4 font-semibold'>Enlaces Rápidos</h4>
						<ul className='space-y-2'>
							{[
								{ href: '#inicio', label: 'Inicio' },
								{ href: '#servicios', label: 'Servicios' },
								{ href: '#proyectos', label: 'Proyectos' },
								{ href: '#contacto', label: 'Contacto' },
							].map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										className='text-background/70 hover:text-background text-sm transition-colors'
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className='mb-4 font-semibold'>Contacto</h4>
						<ul className='text-background/70 space-y-2 text-sm'>
							<li>{config?.phone}</li>
							<li>{config?.email}</li>
							<li>{config?.address}</li>
						</ul>
					</div>
				</div>

				<div className='border-background/20 mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row'>
					<p className='text-background/60 text-sm'>
						{new Date().getFullYear()} {config?.companyName}. Todos los derechos
						reservados.
					</p>
					{session && session?.user.role === 'admin' && (
						<Link
							href='/admin'
							className='text-background/40 hover:text-background/60 text-sm transition-colors'
						>
							Administración
						</Link>
					)}
				</div>
			</div>
		</footer>
	);
}
