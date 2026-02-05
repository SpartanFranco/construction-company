import React from 'react';
import type { Metadata } from 'next';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
	title: 'Constructora Moderna | Construcción de Calidad',
	description:
		'Empresa de construcción líder. Obras residenciales, comerciales y reformas integrales con la mejor calidad y compromiso.',

	icons: {
		icon: [
			{
				url: '/contruction.png',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/contruction.png',
				media: '(prefers-color-scheme: dark)',
			},
		],
		apple: '/contruction.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<body className={`font-sans antialiased`}>
				<Toaster />
				{children}
			</body>
		</html>
	);
}
