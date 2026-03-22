import { writable } from 'svelte/store';

export const previousRoute = writable<string>('/');
