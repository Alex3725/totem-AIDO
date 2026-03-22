<script lang="ts">
	import { authStore } from '$lib/stores/auth.store.svelte';
	import { documentsStore } from '$lib/stores/documents.store.svelte';

	function toggleSelectionMode() {
		documentsStore.toggleSelectionMode();
	}

	async function deleteSelected() {
		const n = documentsStore.selectedDocuments.length;
		if (!n) return;
		if (!confirm(`Eliminare ${n} documento/i selezionato/i?`)) return;
		await documentsStore.removeSelected();
	}
</script>

<nav class="flex h-20 items-center justify-between bg-gradient-to-r from-red-900 to-red-800 px-8 shadow-lg">
	<div class="flex items-center gap-4">
		<!-- Badge ruolo -->
		<div class="rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
			<span class="font-semibold">
				{authStore.isAdmin ? '👑 Modalità Admin' : '👤 Modalità Utente'}
			</span>
		</div>

		<!-- Contatore documenti -->
		<div class="text-white/80">
			<span class="text-sm">
				{documentsStore.filteredDocuments.length} documenti
				{#if documentsStore.searchFilter}
					(filtrati)
				{/if}
			</span>
		</div>
	</div>

	<div class="flex items-center gap-4">
		{#if authStore.isAdmin}
			<!-- Pulsante selezione multipla -->
			<button
				onclick={toggleSelectionMode}
				class="rounded-xl px-6 py-3 font-semibold transition {documentsStore.isSelectionMode
					? 'bg-yellow-400 text-yellow-900 shadow-lg'
					: 'bg-white/90 text-gray-800 hover:bg-white'}"
			>
				{documentsStore.isSelectionMode ? '✓ Selezione Attiva' : '☐ Seleziona'}
			</button>

			<!-- Elimina selezionati -->
			{#if documentsStore.isSelectionMode && documentsStore.selectedDocuments.length > 0}
				<button
					onclick={deleteSelected}
					class="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600"
				>
					🗑️ Elimina ({documentsStore.selectedDocuments.length})
				</button>
			{/if}

			<!-- Nota: upload non implementato in questo progetto -->
		{:else}
			<!-- Messaggio per utenti normali -->
			<div class="text-sm text-white/70">
				Puoi richiedere i documenti tramite email
			</div>
		{/if}
	</div>
</nav>