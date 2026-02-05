import { GalleryHorizontal, Home, Wrench } from 'lucide-react';

export type NAV_ICON = 'home' | 'wrench' | 'gallery';

export const NAV_ICONS_MAP: Record<
	NAV_ICON,
	React.ComponentType<{ className?: string }>
> = {
	home: Home,
	wrench: Wrench,
	gallery: GalleryHorizontal,
};
