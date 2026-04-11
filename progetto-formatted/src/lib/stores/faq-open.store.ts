import { writable } from 'svelte/store';

export const faqOpenQuestion = writable<string | null>(null);