import { Description, Title } from '@/components/admin';
import { getServices } from '@/actions/site-gets';
import { ServiceCardForm } from '@/components/admin/services/service-card-form';
import { AddServiceButton } from '@/components/admin/services/button-add-service';

export default async function Page() {
	const services = await getServices();
	return (
		<div className='container mx-auto flex flex-col space-y-6'>
			<div>
				<Title>Servicios</Title>
				<Description>
					Administra los servicios que ofrece tu empresa.
				</Description>
			</div>

			<AddServiceButton />
			<div className='grid gap-6 lg:grid-cols-2'>
				{services.map((service, index) => (
					<ServiceCardForm
						key={service.id}
						service={service}
						index={index}
					/>
				))}
			</div>
		</div>
	);
}
