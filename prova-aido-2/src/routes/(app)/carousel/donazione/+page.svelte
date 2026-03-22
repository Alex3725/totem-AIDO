<script lang="ts">
	import { goto } from '$app/navigation';
	import Carousel from '$lib/components/common/Carousel.svelte';

	const subPages = [
		{
			id: 'donazione-1',
			title: 'Cos\'è la Donazione',
			subtitle: 'Un gesto di solidarietà',
			content: 'La donazione di organi è un atto di generosità che permette di salvare o migliorare la vita di molte persone.',
			icon: '❤️'
		},
		{
			id: 'donazione-2',
			title: 'Cosa Si Può Donare',
			subtitle: 'Organi, tessuti e cellule',
			content: 'Si possono donare organi (cuore, fegato, reni, polmoni), tessuti (cornee, pelle, ossa) e cellule staminali.',
			icon: '🫀'
		},
		{
			id: 'donazione-3',
			title: 'Come Diventare Donatore',
			subtitle: 'È semplice',
			content: 'Puoi esprimere la tua volontà di donare compilando il modulo di consenso o portando sempre con te la tessera AIDO.',
			icon: '📝'
		},
		{
			id: 'donazione-4',
			title: 'Domande Frequenti',
			subtitle: 'Risposte alle tue domande',
			content: 'Hai dubbi sulla donazione? Contattaci o consulta la sezione FAQ sul nostro sito web per maggiori informazioni.',
			icon: '❓'
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
