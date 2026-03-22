<script lang="ts">
	import { goto } from '$app/navigation';
	import Carousel from '$lib/components/common/Carousel.svelte';

	const subPages = [
		{
			id: 'contatti-1',
			title: 'Contatti',
			subtitle: 'Siamo qui per te',
			content: 'Hai domande sulla donazione? Vuoi diventare volontario? Contattaci, siamo a tua disposizione.',
			icon: '📞'
		},
		{
			id: 'contatti-2',
			title: 'Sede Centrale',
			subtitle: 'Vieni a trovarci',
			content: 'Sede AIDO Nazionale\nVia XX Settembre, 123\n00100 Roma\nTel: 06 12345678',
			icon: '📍'
		},
		{
			id: 'contatti-3',
			title: 'Email e Social',
			subtitle: 'Resta in contatto',
			content: 'Email: info@aido.it\nSeguici sui social:\nFacebook: @AIDOItalia\nInstagram: @aido_italia',
			icon: '📧'
		},
		{
			id: 'contatti-4',
			title: 'Orari di Apertura',
			subtitle: 'Quando siamo disponibili',
			content: 'Lunedì - Venerdì: 9:00 - 18:00\nSabato: 9:00 - 13:00\nDomenica: Chiuso',
			icon: '🕐'
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
