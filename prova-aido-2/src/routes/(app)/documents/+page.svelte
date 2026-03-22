<!-- <script lang="ts">
	import PopUp from '$lib/components/popUp.svelte';
	import QRCode from '$lib/components/QRCode.svelte';
	import Tabella from '$lib/components/Tabella.svelte';
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
	<!-- Titolo fuori dal box 
	<div class="totem-page-header">
		<h1 class="totem-page-title">Materiale Informativo</h1>
		
	</div>

	<!-- Box bianco centrale 
	<div class="totem-content-box w-full h-full">
		
			<Tabella/>
		
	</div>
</div>
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth.store.svelte';
	import { documentsStore } from '$lib/stores/documents.store.svelte';
	import DocumentsTable from '$lib/components/documents/DocumentsTable.svelte';

	onMount(() => {
		// A questo punto (app layout) garantisce già una sessione utente.
		void documentsStore.load();
	});
</script>

<div class="flex h-full flex-col bg-gradient-to-br from-gray-50 to-gray-100">
	<!-- Header con info utente -->
	<div class="flex items-center justify-between bg-white px-8 py-4 shadow-md">
		<div>
			<h1 class="text-3xl font-bold text-gray-800">📄 Gestione Documenti</h1>
			<p class="text-sm text-gray-600">
				Sistema di gestione materiale informativo AIDO
			</p>
		</div>
		<div class="text-right text-sm text-gray-600">
			<p class="font-semibold text-gray-800">{authStore.utente?.nome}</p>
			<p>{authStore.utente?.email}</p>
		</div>
	</div>

	<!-- Contenuto principale -->
	<div class="flex-1 overflow-hidden p-8">
		<div class="h-full rounded-2xl bg-white shadow-xl">
			<DocumentsTable />
		</div>
	</div>
</div>