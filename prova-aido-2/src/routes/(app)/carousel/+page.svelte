<script lang="ts">
	import { goto } from '$app/navigation';
	import Carousel from '$lib/components/common/Carousel.svelte';

	const mainPages = [
		{
			id: 'page-1',
			title: 'Chi Siamo',
			subtitle: 'Scopri la nostra missione',
			icon: '🏥',
			action: () => goto('/carousel/chi-siamo')
		},
		{
			id: 'page-2',
			title: 'Donazione',
			subtitle: 'Informazioni sulla donazione',
			icon: '❤️',
			action: () => goto('/carousel/donazione')
		},
		{
			id: 'page-3',
			title: 'Storie',
			subtitle: 'Le storie di chi ha donato',
			icon: '📖',
			action: () => goto('/carousel/storie')
		},
		{
			id: 'page-4',
			title: 'Contatti',
			subtitle: 'Come contattarci',
			icon: '📞',
			action: () => goto('/carousel/contatti')
		},
		{
			id: 'page-5',
			title: 'Documenti',
			subtitle: 'Gestione materiale informativo',
			icon: '📄',
			action: () => goto('/documents')
		}
	];
</script>

<div class="h-screen w-screen">
	<Carousel pages={mainPages} autoRotate={true} rotationInterval={8000} />
</div>
