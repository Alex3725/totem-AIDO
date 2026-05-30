export type ContentSlug =
	| 'faq'
	| 'diventa-donatore'
	| 'processo-donazione'
	| 'processo-scelta'
	| 'scopri';

export interface ContentPage {
	slug: ContentSlug;
	title: string;
	subtitle: string;
	description: string;
	details: string[];
	isCatalog: boolean;
}

export const contentPages: Record<ContentSlug, ContentPage> = {
	faq: {
		slug: 'faq',
		title: 'FAQ',
		subtitle: 'Domande frequenti',
		description: 'Hai delle domande? Qui trovi le risposte principali sul percorso di donazione.',
		details: [
			'Sezione in allestimento con risposte rapide.',
			'Contenuti testuali e materiali di supporto in arrivo.'
		],
		isCatalog: false
	},
	'diventa-donatore': {
		slug: 'diventa-donatore',
		title: 'Diventa Donatore',
		subtitle: 'Come aderire ad AIDO',
		description: 'Passaggi e informazioni utili per diventare donatore.',
		details: [
			'Sezione in allestimento con istruzioni operative.',
			'Approfondimenti e riferimenti territoriali in arrivo.'
		],
		isCatalog: false
	},
	'processo-donazione': {
		slug: 'processo-donazione',
		title: 'Processo di donazione',
		subtitle: 'Percorso clinico e organizzativo',
		description: 'Panoramica del percorso completo che porta alla donazione e al trapianto.',
		details: [
			'Sezione in allestimento con flusso dettagliato.',
			'Contenuti multimediali e schemi informativi in arrivo.'
		],
		isCatalog: false
	},
	'processo-scelta': {
		slug: 'processo-scelta',
		title: 'Processo di scelta',
		subtitle: 'Informazioni per decidere',
		description: 'Indicazioni su come ASL e Comuni gestiscono la scelta di donazione.',
		details: [
			'Sezione in allestimento con esempi pratici.',
			'Approfondimenti normativi e supporti informativi in arrivo.'
		],
		isCatalog: false
	},
	scopri: {
		slug: 'scopri',
		title: 'Scopri',
		subtitle: 'Catalogo',
		description: 'Scopri il mondo AIDO con volantini e video informativi.',
		details: [
			'Contenuti aggiornabili dal pannello amministrativo.',
			'Ricerca e filtri pronti per integrazione dati.'
		],
		isCatalog: true
	}
};

export function getContentPageBySlug(slug: string): ContentPage | undefined {
	if (slug in contentPages) {
		return contentPages[slug as ContentSlug];
	}

	return undefined;
}
