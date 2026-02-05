import { Metadata } from 'next';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/app-sidebar';
import { redirect } from 'next/navigation';
import { UserDropdown } from '@/components/user/user-dropdown';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
	title: 'Panel de Administración | Construction Company',
	description: 'Gestión de contenido, servicios y carrusel.',
	robots: 'noindex, nofollow',
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<Toaster />
			<div className='grid w-full grid-rows-[3.5rem_1fr]'>
				<header className='bg-background border-border flex w-full items-center justify-between border-b px-4'>
					<SidebarTrigger />

					<UserDropdown />
				</header>

				<main className='bg-muted flex-1 px-4 py-8 sm:px-6 lg:px-8'>
					<div className='mx-auto max-w-7xl'>{children}</div>
				</main>
			</div>
		</SidebarProvider>
	);
}
