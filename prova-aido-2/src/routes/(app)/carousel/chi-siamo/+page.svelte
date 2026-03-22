<script lang="ts">
	import { goto } from '$app/navigation';
	import Carousel from '$lib/components/common/Carousel.svelte';

	const subPages = [
		{
			id: 'chi-siamo-1',
			title: 'Chi Siamo',
			subtitle: 'La nostra storia',
			content: 'AIDO è un\'associazione di volontariato che promuove la cultura della donazione di organi, tessuti e cellule.',
			icon: '🏥'
		},
		{
			id: 'chi-siamo-2',
			title: 'La Nostra Missione',
			subtitle: 'Promuovere la donazione',
			content: 'Diffondiamo informazioni corrette sulla donazione e sensibilizziamo l\'opinione pubblica sull\'importanza di questa scelta.',
			icon: '🎯'
		},
		{
			id: 'chi-siamo-3',
			title: 'I Nostri Valori',
			subtitle: 'Solidarietà e altruismo',
			content: 'Crediamo nella solidarietà umana e nel diritto di ogni persona a ricevere cure adeguate attraverso la donazione.',
			icon: '💚'
		},
		{
			id: 'chi-siamo-4',
			title: 'Diventa Volontario',
			subtitle: 'Unisciti a noi',
			content: 'Se condividi i nostri valori, unisciti a noi come volontario e aiutaci a diffondere la cultura della donazione.',
			icon: '🤝'
		}
	];

	function goBack() {
		goto('/carousel');
	}
</script>

<div class="h-screen w-screen">
	<!-- Back Button -->
	<button
		onclick={goBack}
		class="absolute left-8 top-8 z-30 rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
		aria-label="Torna al menu principale"
	>
		<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
	</button>

	<Carousel pages={subPages} autoRotate={true} rotationInterval={10000} />
</div>
