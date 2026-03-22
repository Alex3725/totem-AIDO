<script lang="ts">
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth.store.svelte';

let { children }: LayoutProps = $props();

onMount(async () => {
	// Assicura che ci sia sempre almeno una sessione utente
	authStore.ripristinaSessione();

	if (!authStore.isAutenticato) {
		await authStore.login('utente@aido.it', 'user123');
	}
});
</script>

{@render children()}

