export type MenuOptionSlug = string;

export interface MenuOption {
	slug: MenuOptionSlug;
	title: string;
	description: string;
	ctaLabel: string;
	sourceFile: string;
	examplePath: string;
}

export const fixedMenuOptions: MenuOption[] = [
	{
		slug: 'faq',
		title: 'FAQ',
		description: "Hai delle domande? Prova a vedere se abbiamo gia risposto qui!",
		ctaLabel: 'Scopri subito!',
		sourceFile: 'opzioneFaq.html',
		examplePath: '/esempio/faq'
	},
	{
		slug: 'diventa-donatore',
		title: 'Diventa Donatore',
		description: "Come diventare donatore? Dove ci si puo iscrivere? Tutte le risposte qui.",
		ctaLabel: 'Iscriviti subito!',
		sourceFile: 'opzioneDiventaDonatore.html',
		examplePath: '/esempio/diventa-donatore'
	},
	{
		slug: 'processo-donazione',
		title: 'Processo di donazione',
		description: "Il processo di donazione e tutto il percorso che si esegue quando si donano organi!",
		ctaLabel: 'Scopri subito!',
		sourceFile: 'opzioneProcessoDonazione.html',
		examplePath: '/esempio/processo-donazione'
	},
	{
		slug: 'processo-scelta',
		title: 'Processo di scelta',
		description:
			"Sei indeciso sulla scelta? Scopri come l'ASL e i comuni gestiscono e supportano i donatori di organi.",
		ctaLabel: 'Scopri come',
		sourceFile: 'opzioneProcessoScelta.html',
		examplePath: '/esempio/processo-scelta'
	},
	{
		slug: 'scopri',
		title: 'Scopri',
		description: 'Scopri il mondo AIDO con video e volantini!',
		ctaLabel: 'Scopri subito!',
		sourceFile: 'opzioneScelta.html',
		examplePath: '/esempio/scopri'
	}
];

const discoveredTopLevelPages = import.meta.glob('/src/routes/opzioni-menu/*/+page.svelte');

const excludedAutoSlugs = new Set<string>([
	...fixedMenuOptions.map((option) => option.slug),
	'chat-assistenza'
]);

function slugToTitle(slug: string): string {
	return slug
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function buildAutoMenuOptions(): MenuOption[] {
	const slugs = Object.keys(discoveredTopLevelPages)
		.map((path) => {
			const match = path.match(/^\/src\/routes\/opzioni-menu\/([^/]+)\/\+page\.svelte$/);
			return match?.[1] ?? null;
		})
		.filter((slug): slug is string => slug !== null)
		.filter((slug) => !excludedAutoSlugs.has(slug))
		.sort((a, b) => a.localeCompare(b, 'it'));

	return slugs.map((slug) => ({
		slug,
		title: slugToTitle(slug),
		description: `Sezione ${slugToTitle(slug)}.`,
		ctaLabel: 'Apri',
		sourceFile: `${slug}.html`,
		examplePath: `/esempio/${slug}`
	}));
}

export const menuOptions: MenuOption[] = [...fixedMenuOptions, ...buildAutoMenuOptions()];

export function getMenuOptionBySlug(slug: string): MenuOption | undefined {
	return menuOptions.find((option) => option.slug === slug);
}

export function getAdjacentMenuOption(slug: MenuOptionSlug, offset: -1 | 1): MenuOption {
	const index = menuOptions.findIndex((option) => option.slug === slug);
	if (index < 0) {
		return menuOptions[0];
	}
	const targetIndex = (index + offset + menuOptions.length) % menuOptions.length;
	return menuOptions[targetIndex];
}
