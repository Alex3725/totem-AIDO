<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();


  import { status, statusColor, useIdle } from '$lib/useIdle';

  // Idle dopo 10 minuti e redirect a /idle
  useIdle(1000, '/idle');

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
