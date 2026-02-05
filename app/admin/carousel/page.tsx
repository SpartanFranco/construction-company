import { CarouselForm } from '@/components/admin/carousel/carousel-form';
import { Description, Title } from '@/components/admin';
import { getCarouselImages } from '@/actions/site-gets';
export default async function Page() {
	const carouselImages = await getCarouselImages();
	return (
		<div className=''>
			<div className='flex items-center justify-between'>
				<div>
					<Title>Imágenes del Carrusel</Title>
					<Description>
						Administra las imágenes que se muestran en el carrusel de proyectos.
					</Description>
				</div>
			</div>
			<CarouselForm carouselImages={carouselImages} />
		</div>
	);
}
