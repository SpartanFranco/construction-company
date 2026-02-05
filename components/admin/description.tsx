import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TextProps {
	children: ReactNode;
	className?: string;
}
export const Description = ({ className, children }: TextProps) => {
	return <h3 className={cn('text-muted-foreground', className)}>{children}</h3>;
};
