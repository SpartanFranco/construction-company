import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TextProps {
	children: ReactNode;
	className?: string;
}
export const Title = ({ className, children }: TextProps) => {
	return (
		<h1 className={cn('text-2xl font-semibold', className)}>{children}</h1>
	);
};
