'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { SiteConfig } from '@/interfaces/site.interfaces';

interface Props {
	config: SiteConfig | null;
}
export function Header({ config }: Props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinks = [
		{ href: '#inicio', label: 'Inicio' },
		{ href: '#servicios', label: 'Servicios' },
		{ href: '#proyectos', label: 'Proyectos' },
		{ href: '#contacto', label: 'Contacto' },
	];

	return (
		<header className='bg-background/95 border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm'>
			<nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					{/* Logo */}
					<Link
						href='/'
						className='flex items-center gap-2'
					>
						<div className='bg-primary flex h-10 w-10 items-center justify-center rounded'>
							<span className='text-primary-foreground text-lg font-bold'>
								CM
							</span>
						</div>
						<span className='text-foreground hidden font-semibold sm:block'>
							{config?.companyName}
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden items-center gap-8 md:flex'>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
							>
								{link.label}
							</a>
						))}
					</div>

					{/* CTA Button */}
					<div className='hidden md:block'>
						<Button asChild>
							<a href='#contacto'>Solicitar Presupuesto</a>
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<button
						type='button'
						className='p-2 md:hidden'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label='Toggle menu'
					>
						{isMenuOpen ? (
							<X className='text-foreground h-6 w-6' />
						) : (
							<Menu className='text-foreground h-6 w-6' />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className='border-border border-t py-4 md:hidden'>
						<div className='flex flex-col gap-4'>
							{navLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
									onClick={() => setIsMenuOpen(false)}
								>
									{link.label}
								</a>
							))}
							<Button
								asChild
								className='mt-2'
							>
								<a
									href='#contacto'
									onClick={() => setIsMenuOpen(false)}
								>
									Solicitar Presupuesto
								</a>
							</Button>
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
