<!-- src/lib/components/documents/QRDownloadModal.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { Documento } from '$lib/types/document.types';

	let { 
		isOpen = false, 
		documents = [], 
		onClose 
	} = $props<{
		isOpen: boolean;
		documents: Documento[];
		onClose: () => void;
	}>();

	let qrCodeUrl = $state<string>('');
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	// Generate QR code when modal opens
	$effect(() => {
		if (isOpen && documents.length > 0) {
			generateQR();
		}
	});

	async function generateQR() {
		isLoading = true;
		error = null;

		try {
			const documentIds = documents.map((d: Documento) => d.id);
			
			const response = await fetch('/api/documents/qr', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ documentIds })
			});

			if (!response.ok) {
				throw new Error('Failed to generate QR code');
			}

			const data = await response.json();
			qrCodeUrl = data.qrCode;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unknown error';
		} finally {
			isLoading = false;
		}
	}

	function handleClose() {
		qrCodeUrl = '';
		error = null;
		onClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		onclick={handleClose}
		onkeydown={handleKeydown}
		role="button"
		tabindex="-1"
	>
		<div
			class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="0"
		>
			<!-- Header -->
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-2xl font-bold text-gray-800">
					Scarica Documenti
				</h2>
				<button
					onclick={handleClose}
					class="text-gray-400 hover:text-gray-600 transition"
					aria-label="Chiudi"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Content -->
			<div class="space-y-6">
				{#if isLoading}
					<div class="flex flex-col items-center justify-center py-12">
						<div class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
						<p class="text-gray-600">Generazione QR code...</p>
					</div>
				{:else if error}
					<div class="rounded-lg bg-red-50 p-4 text-center text-red-800">
						⚠️ {error}
					</div>
				{:else if qrCodeUrl}
					<!-- QR Code -->
					<div class="flex justify-center">
						<div class="rounded-lg bg-white p-4 shadow-inner">
							<img src={qrCodeUrl} alt="QR Code per download" class="h-64 w-64" />
						</div>
					</div>

					<!-- Instructions -->
					<div class="space-y-3 rounded-lg bg-blue-50 p-4">
						<p class="font-semibold text-blue-900">📱 Come usare:</p>
						<ol class="space-y-2 text-sm text-blue-800">
							<li>1. Inquadra il QR code con lo smartphone</li>
							<li>2. Verrai reindirizzato al link di download</li>
							<li>3. I file saranno scaricati automaticamente</li>
						</ol>
					</div>

					<!-- Documents list -->
					<div class="space-y-2">
						<p class="text-sm font-semibold text-gray-700">
							Documenti ({documents.length}):
						</p>
						<div class="max-h-32 space-y-1 overflow-y-auto rounded border border-gray-200 p-2">
							{#each documents as doc}
								<p class="truncate text-sm text-gray-600" title={doc.nomeFile}>
									• {doc.nomeFile}
								</p>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Actions -->
			<div class="mt-6 flex gap-3">
				{#if !isLoading && !error && qrCodeUrl}
					<button
						onclick={generateQR}
						class="flex-1 rounded-lg border border-blue-600 bg-white px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
					>
						🔄 Rigenera
					</button>
				{/if}
				<button
					onclick={handleClose}
					class="flex-1 rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white transition hover:bg-gray-700"
				>
					Chiudi
				</button>
			</div>
		</div>
	</div>
{/if}
