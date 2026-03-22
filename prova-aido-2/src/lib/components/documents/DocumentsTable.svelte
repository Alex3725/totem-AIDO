<script lang="ts">
	import { onMount } from 'svelte';
	import { documentsStore } from '$lib/stores/documents.store.svelte';
	import RigaDocumento from './DocumentRow.svelte';
	import ToolbarAzioni from './DocumentToolbar.svelte';

	onMount(() => {
		// Carica da API
		if (documentsStore.documents.length === 0) {
			void documentsStore.load();
		}
	});
</script>

<div class="flex h-full w-full flex-col">
	<!-- Toolbar azioni -->
	<ToolbarAzioni />

	<!-- Barra ricerca -->
	<div class="p-4">
		<input
			type="text"
			placeholder="Cerca documento..."
			class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
			bind:value={documentsStore.searchFilter}
		/>
	</div>

	<!-- Tabella -->
	<div class="flex-1 overflow-hidden px-4">
		<div class="h-full overflow-auto rounded-2xl bg-white shadow-lg">
			<table class="w-full">
				<!-- Header fisso -->
				<thead class="sticky top-0 z-10 bg-amber-300">
					<tr class="flex h-16 items-center">
						<!-- Checkbox selezione (solo se modalità attiva) -->
						{#if documentsStore.isSelectionMode}
							<th class="w-[10%] text-center">
								<input
									type="checkbox"
									class="h-5 w-5 cursor-pointer rounded"
									checked={documentsStore.selectedDocuments.length === documentsStore.documents.length && documentsStore.documents.length > 0}
									onchange={() => {
										const tuttiSelezionati = documentsStore.selectedDocuments.length === documentsStore.documents.length;
										documentsStore.documents.forEach(d => d.selezionato = !tuttiSelezionati);
									}}
								/>
							</th>
						{/if}

						<th class="w-[10%] text-center">Preview</th>
						<th class="w-[40%] text-center">Nome File</th>
						<th class="w-[20%] text-center">Data Visualizzata</th>
						<th class="w-[20%] text-center">Azioni</th>
					</tr>
				</thead>

				<!-- Body scrollabile -->
				<tbody class="bg-gray-50">
					{#each documentsStore.filteredDocuments as documento (documento.id)}
						<RigaDocumento {documento} />
					{:else}
						<tr>
							<td colspan="5" class="py-12 text-center text-gray-500">
								{documentsStore.searchFilter ? 'Nessun documento trovato' : 'Nessun documento disponibile'}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>