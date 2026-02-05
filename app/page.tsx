import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Services } from '@/components/landing/services';
import { ImageCarousel } from '@/components/landing/image-carousel';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/landing/footer';
import { getAllSiteData } from '@/actions/site-gets';

export default async function Home() {
	const { config, services, carouselImages } = await getAllSiteData();

	return (
		<div className='min-h-screen'>
			<Header config={config} />
			<main>
				<Hero config={config} />
				<Services services={services} />
				<ImageCarousel carouselImages={carouselImages} />
				<Contact config={config} />
			</main>
			<Footer config={config} />
		</div>
	);
}
