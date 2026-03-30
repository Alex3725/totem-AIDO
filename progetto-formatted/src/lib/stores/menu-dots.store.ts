import { writable } from 'svelte/store';
import type { MenuOptionSlug } from '$lib/data/menu-options';

export const menuDotsSlug = writable<MenuOptionSlug>('faq');

export function setMenuDotsSlug(slug: MenuOptionSlug) {
	menuDotsSlug.set(slug);
}