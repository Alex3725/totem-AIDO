<script lang="ts">
	import { goto } from '$app/navigation';
	import Carousel from '$lib/components/common/Carousel.svelte';

	const subPages = [
		{
			id: 'storie-1',
			title: 'Storie di Donazione',
			subtitle: 'Vite salvate',
			content: 'Ogni donazione ha una storia. Scopri le testimonianze di chi ha ricevuto un organo e di chi ha scelto di donare.',
			icon: '📖'
		},
		{
			id: 'storie-2',
			title: 'Marco e la Nuova Vita',
			subtitle: 'Trapianto di rene',
			content: 'Marco ha ricevuto un rene e ora può condurre una vita normale. La donazione gli ha restituito la speranza.',
			icon: '🙏'
		},
		{
			id: 'storie-3',
			title: 'La Scelta di Lucia',
			subtitle: 'Donazione di cornee',
			content: 'Lucia ha scelto di donare le cornee di suo padre. Grazie a questa scelta, due persone hanno riacquistato la vista.',
			icon: '👁️'
		},
		{
			id: 'storie-4',
			title: 'Condividi la Tua Storia',
			subtitle: 'Aiutaci a diffondere',
			content: 'Se hai una storia di donazione da condividere, contattaci. Le testimonianze aiutano a sensibilizzare.',
			icon: '💬'
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
