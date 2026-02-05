'use client';

import { usePathname } from 'next/navigation';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_ICON, NAV_ICONS_MAP } from '@/consts/nav-icons';

export const NavItem = ({
	path,
	label,
	icon,
}: {
	path: string;
	label: string;
	icon: NAV_ICON;
}) => {
	const pathname = usePathname();

	// Cambiamos a "startsWith" si quieres que /admin/services/123 mantenga activo "Servicios"
	const isActive =
		pathname === path || (path !== '/admin' && pathname.startsWith(path));

	const ICON = NAV_ICONS_MAP[icon];

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				asChild
				isActive={isActive}
				tooltip={label}
			>
				<Link
					href={path}
					className={cn(
						'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all outline-none',
						isActive
							? 'hover:bg-primary/80! bg-primary! text-white!'
							: 'text-muted-foreground hover:bg-primary/80! hover:text-white!',
					)}
				>
					<ICON className={cn('size-4 shrink-0', isActive && 'text-white')} />
					<span className='truncate'>{label}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};
