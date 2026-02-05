import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from '@/components/ui/sidebar';
import { NavItem } from './nav-item';
import { NAV_ICON } from '@/consts/nav-icons';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const items: { path: string; label: string; icon: NAV_ICON }[] = [
	{ path: '/admin', label: 'Información General', icon: 'home' },
	{ path: '/admin/services', label: 'Servicios', icon: 'wrench' },
	{ path: '/admin/carousel', label: 'Carrusel', icon: 'gallery' },
];

export const AppSidebar = () => {
	return (
		<Sidebar
			collapsible='icon'
			className='border-r'
		>
			{/* 1. Header: Ideal para el botón de volver y el título del panel */}
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							tooltip='Volver al sitio'
						>
							<Link
								href='/'
								className='hover:bg-primary/90! flex items-center gap-3 hover:text-white!'
							>
								<ArrowLeft className='h-4 w-4' />
								<span className='font-medium group-data-[collapsible=icon]:hidden'>
									Volver al sitio
								</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>

				{/* Título que desaparece al colapsar */}
				<div className='mt-2 px-2 group-data-[collapsible=icon]:hidden'>
					<h1 className='text-foreground text-sm font-bold tracking-tight'>
						Panel Administración
					</h1>
					<div className='bg-border mt-2 h-px w-full' />
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='group-data-[collapsible=icon]:hidden'>
						Menú Principal
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className='gap-1'>
							{items.map((item) => (
								<NavItem
									key={item.label}
									path={item.path}
									label={item.label}
									icon={item.icon}
								/>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
