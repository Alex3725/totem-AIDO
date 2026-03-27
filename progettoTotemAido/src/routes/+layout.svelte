<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AssistFloatingButton from '$lib/components/common/AssistFloatingButton.svelte';
	let { children } = $props();
	import { useIdle } from '$lib/useIdle';

	// Timeout inattivita: per i test e' impostato a 10 secondi.
	// Secondo parametro: velocita' auto-scroll del carosello in idle.
	useIdle(10000, 3500);

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
<AssistFloatingButton />
