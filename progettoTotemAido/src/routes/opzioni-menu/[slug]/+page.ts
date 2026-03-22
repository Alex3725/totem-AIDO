import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getAdjacentMenuOption, getMenuOptionBySlug } from '$lib/data/menu-options';

export const load: PageLoad = ({ params }) => {
	const option = getMenuOptionBySlug(params.slug);

	if (!option) {
		throw error(404, 'Opzione menu non trovata');
	}

	return {
		option,
		previousOption: getAdjacentMenuOption(option.slug, -1),
		nextOption: getAdjacentMenuOption(option.slug, 1)
	};
};
