<!-- src/lib/components/documents/DocumentRow.svelte -->
<script lang="ts">
  import type { Documento } from '$lib/types/document.types';
  import { documentsStore } from '$lib/stores/documents.store.svelte';
  import { authStore } from '$lib/stores/auth.store.svelte';
  import QRDownloadModal from './QRDownloadModal.svelte';
  
  /**
   * Props
   * @param documento - Document object to display
   */
  let { documento }: { documento: Documento } = $props();

  /**
   * State for inline date editing (admin only)
   */
  let isEditingDate = $state(false);
  let tempDate = $state('');

  /**
   * Format date for display
   */
  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  /**
   * Start editing displayed date (admin only)
   */
  function startEditingDate(): void {
    if (!authStore.isAdmin) return;
    
    tempDate = documento.dataVisualizzata.toISOString().split('T')[0];
    isEditingDate = true;
  }

  /**
   * Save edited date
   */
  async function saveDate(): Promise<void> {
    if (!tempDate) return;

    const newDate = new Date(tempDate);
    
    try {
      await documentsStore.updateDisplayDate(documento.id, newDate);
      isEditingDate = false;
    } catch (error) {
      console.error('Failed to update date:', error);
      alert('Errore durante l\'aggiornamento della data');
    }
  }

  /**
   * Cancel date editing
   */
  function cancelEdit(): void {
    isEditingDate = false;
    tempDate = '';
  }

  /**
   * QR download modal state (user action)
   */
  let isQrModalOpen = $state(false);

  function openQrModal(): void {
    isQrModalOpen = true;
  }

  function closeQrModal(): void {
    isQrModalOpen = false;
  }

  /**
   * Download document directly (admin action)
   */
  function downloadDocument(): void {
    window.open(documento.fileUrl, '_blank');
  }

  /**
   * Delete document (admin action)
   */
  async function deleteDocument(): Promise<void> {
    const confirmed = confirm(`Eliminare "${documento.nomeFile}"?`);
    if (!confirmed) return;

    try {
      await documentsStore.remove(documento.id);
    } catch (error) {
      console.error('Failed to delete document:', error);
      alert('Errore durante l\'eliminazione');
    }
  }
</script>

<tr class="flex h-20 items-center border-b border-gray-200 transition-colors hover:bg-gray-50">
  <!-- Selection checkbox -->
  {#if documentsStore.isSelectionMode}
    <td class="w-[10%] text-center" role="cell">
      <input
        type="checkbox"
        class="h-5 w-5 cursor-pointer rounded"
        checked={documento.selezionato}
        onchange={() => documentsStore.toggleSelection(documento.id)}
        aria-label="Seleziona {documento.nomeFile}"
      />
    </td>
  {/if}

  <!-- Preview image -->
  <td class="w-[10%] flex justify-center" role="cell">
    <img 
      src={documento.previewImgUrl} 
      alt="Anteprima {documento.nomeFile}"
      class="h-14 w-14 rounded object-cover shadow-sm"
      loading="lazy"
    />
  </td>

  <!-- File name -->
  <td class="w-[40%] px-4" role="cell">
    <p class="truncate font-medium text-gray-800" title={documento.nomeFile}>
      {documento.nomeFile}
    </p>
  </td>

  <!-- Display date with inline editing -->
  <td class="w-[20%] px-4" role="cell">
    {#if isEditingDate && authStore.isAdmin}
      <div class="flex items-center gap-2">
        <input
          type="date"
          bind:value={tempDate}
          class="rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          aria-label="Modifica data visualizzata"
        />
        <button 
          onclick={saveDate} 
          class="text-green-600 hover:text-green-800 transition"
          aria-label="Salva data"
        >
          ✓
        </button>
        <button 
          onclick={cancelEdit} 
          class="text-red-600 hover:text-red-800 transition"
          aria-label="Annulla modifica"
        >
          ✗
        </button>
      </div>
    {:else}
      <div class="flex items-center gap-2">
        <time datetime={documento.dataVisualizzata.toISOString()}>
          {formatDate(documento.dataVisualizzata)}
        </time>
        {#if authStore.isAdmin}
          <button 
            onclick={startEditingDate}
            class="text-blue-600 hover:text-blue-800 transition"
            title="Modifica data visualizzata"
            aria-label="Modifica data"
          >
            ✏️
          </button>
        {/if}
      </div>
    {/if}
  </td>

  <!-- Action buttons -->
  <td class="w-[20%] px-4" role="cell">
    <div class="flex justify-center gap-2">
      {#if authStore.isAdmin}
        <!-- Admin actions -->
        <button
          onclick={downloadDocument}
          class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 transition"
          title="Scarica documento"
          aria-label="Scarica {documento.nomeFile}"
        >
          ⬇️
        </button>
        <button
          onclick={deleteDocument}
          class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 transition"
          title="Elimina documento"
          aria-label="Elimina {documento.nomeFile}"
        >
          🗑️
        </button>
      {:else}
        <!-- User actions -->
        <button
          onclick={openQrModal}
          class="rounded bg-green-500 px-4 py-1 text-sm text-white hover:bg-green-600 transition"
          aria-label="Mostra QR per {documento.nomeFile}"
        >
          📱 QR
        </button>
      {/if}
    </div>
  </td>
	{#if !authStore.isAdmin}
		<QRDownloadModal
			isOpen={isQrModalOpen}
			documents={[documento]}
			onClose={closeQrModal}
		/>
	{/if}
</tr>