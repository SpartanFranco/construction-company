import { Building2, Factory, Hammer, Home } from 'lucide-react';

export type ICON = 'home' | 'building' | 'hammer' | 'factory';

export const ICONS_MAP: Record<
	ICON,
	React.ComponentType<{ className?: string }>
> = {
	home: Home,
	building: Building2,
	hammer: Hammer,
	factory: Factory,
};
