import { ConfigForm } from '@/components/admin/config-form';
import { Description, Title } from '@/components/admin';
import { getSiteConfig } from '@/actions/site-gets';
export default async function InformationPage() {
	const config = await getSiteConfig();

	if (!config) {
		throw Error('Error al obtener la configuración del sitio');
	}
	return (
		<div className='container mx-auto space-y-6'>
			<div>
				<Title> Información de la Empresa</Title>
				<Description>
					Configura la información básica de tu empresa que se mostrará en el
					sitio.
				</Description>
			</div>

			<div className='pt-4'>
				<ConfigForm config={config} />
			</div>
		</div>
	);
}
