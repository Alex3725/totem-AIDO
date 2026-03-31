export type MenuOptionSlug =
	| 'faq'
	| 'diventa-donatore'
	| 'processo-donazione'
	| 'processo-scelta'
	| 'scopri';

export interface MenuOption {
	slug: MenuOptionSlug;
	title: string;
	description: string;
	ctaLabel: string;
	sourceFile: string;
	examplePath: string;
}

export const menuOptions: MenuOption[] = [
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

export function getMenuOptionBySlug(slug: string): MenuOption | undefined {
	return menuOptions.find((option) => option.slug === slug);
}

export function getAdjacentMenuOption(slug: MenuOptionSlug, offset: -1 | 1): MenuOption {
	const index = menuOptions.findIndex((option) => option.slug === slug);
	const targetIndex = (index + offset + menuOptions.length) % menuOptions.length;
	return menuOptions[targetIndex];
}
