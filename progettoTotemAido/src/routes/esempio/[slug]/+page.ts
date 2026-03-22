import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getMenuOptionBySlug } from '$lib/data/menu-options';

export const load: PageLoad = ({ params }) => {
	const option = getMenuOptionBySlug(params.slug);

	if (!option) {
		throw error(404, 'Pagina esempio non trovata');
	}

	return { option };
};
