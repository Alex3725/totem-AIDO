<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
	import { useIdle } from '$lib/useIdle';

	// Timeout inattivita': impostato a 4 minuti.
	// Secondo parametro: velocita' auto-scroll del carosello in idle.
	useIdle(240000, 3500);

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
