import type { UserRole } from '$lib/types/auth.types';

export type MockDocument = {
	id: string;
	nomeFile: string;
	dataCaricamento: Date;
	dataVisualizzata: Date;
	fileUrl: string;
	previewImgUrl: string;
	ruoloVisibile: UserRole;
};

// In-memory mock (dev only). In produzione: DB.
export const MOCK_DOCUMENTS: MockDocument[] = [
	{
		id: '1',
		nomeFile: 'Brochure Donazione.pdf',
		dataCaricamento: new Date('2024-01-15'),
		dataVisualizzata: new Date('2024-01-15'),
		fileUrl: '/files/brochure.pdf',
		previewImgUrl: '/images/brochure-preview.jpg',
		ruoloVisibile: 'user'
	},
	{
		id: '2',
		nomeFile: 'Guida Completa.pdf',
		dataCaricamento: new Date('2024-01-20'),
		dataVisualizzata: new Date('2024-01-20'),
		fileUrl: '/files/guida.pdf',
		previewImgUrl: '/images/guida-preview.jpg',
		ruoloVisibile: 'user'
	},
	{
		id: '3',
		nomeFile: 'Statistiche 2023.xlsx',
		dataCaricamento: new Date('2024-02-01'),
		dataVisualizzata: new Date('2024-02-01'),
		fileUrl: '/files/statistiche.xlsx',
		previewImgUrl: '/images/excel-preview.jpg',
		ruoloVisibile: 'admin'
	}
];

