<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth.store.svelte';

	onMount(async () => {
		// Ripristina eventuale sessione salvata
		authStore.ripristinaSessione();

		// Se l'utente è già loggato (admin o user), portalo direttamente al carousel principale
		if (authStore.isAutenticato) {
			goto('/carousel');
			return;
		}

		// Nessuna sessione esistente: login automatico come utente standard
		await authStore.login('utente@aido.it', 'user123');
		goto('/carousel');
	});
</script>

<main class="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-500 to-red-700">
	<div class="text-center text-white">
		<p class="text-xl font-semibold">Caricamento applicazione…</p>
	</div>
</main>