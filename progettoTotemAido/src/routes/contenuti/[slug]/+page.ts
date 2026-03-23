import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getContentPageBySlug } from '$lib/data/content-pages';

export const load: PageLoad = ({ params }) => {
	const page = getContentPageBySlug(params.slug);

	if (!page) {
		throw error(404, 'Contenuto non trovato');
	}

	return { page };
};
