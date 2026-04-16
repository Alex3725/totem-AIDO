import { writable } from 'svelte/store';
import { menuOptions, type MenuOptionSlug } from '$lib/data/menu-options';

function inferInitialMenuDotsSlug(): MenuOptionSlug {
	if (typeof window === 'undefined') {
		return 'faq';
	}

	const match = window.location.pathname.match(/^\/opzioni-menu\/([^/]+)/);
	const currentSlug = match?.[1];

	if (currentSlug && menuOptions.some((option) => option.slug === currentSlug)) {
		return currentSlug;
	}

	return 'faq';
}

export const menuDotsSlug = writable<MenuOptionSlug>(inferInitialMenuDotsSlug());

export function setMenuDotsSlug(slug: MenuOptionSlug) {
	menuDotsSlug.set(slug);
}