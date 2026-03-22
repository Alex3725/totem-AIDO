// src/lib/stores/documents.store.svelte.ts
import type { Documento } from '$lib/types/document.types';
import { toast } from '$lib/utils/toast.utils';
import { authStore } from '$lib/stores/auth.store.svelte';

/**
 * Documents store with reactive state management
 * Handles document CRUD operations and UI state
 */
class DocumentsStore {
  // Core state
  private _documents = $state<Documento[]>([]);
  private _searchFilter = $state('');
  private _isSelectionMode = $state(false);
  private _isLoading = $state(false);
  private _error = $state<string | null>(null);

  // Computed properties
  get documents(): Documento[] {
    return this._documents;
  }

  get searchFilter(): string {
    return this._searchFilter;
  }

  set searchFilter(value: string) {
    this._searchFilter = value;
  }

  get isSelectionMode(): boolean {
    return this._isSelectionMode;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get error(): string | null {
    return this._error;
  }

  /**
   * Get filtered documents based on search query
   */
  get filteredDocuments(): Documento[] {
    if (!this._searchFilter) return this._documents;
    
    const query = this._searchFilter.toLowerCase();
    return this._documents.filter(doc => 
      doc.nomeFile.toLowerCase().includes(query)
    );
  }

  /**
   * Get selected documents
   */
  get selectedDocuments(): Documento[] {
    return this._documents.filter(d => d.selezionato);
  }

  /**
   * Load documents from API
   */
  async load(): Promise<void> {
    this._isLoading = true;
    this._error = null;

    try {
      const response = await fetch('/api/documents', {
        headers: {
          ...authStore.authHeader
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to load documents');
      }

      const data = await response.json();
      const docs = Array.isArray(data) ? data : (data?.documents ?? []);
      this._documents = docs.map((doc: any) => ({
        ...doc,
        dataCaricamento: new Date(doc.dataCaricamento),
        dataVisualizzata: new Date(doc.dataVisualizzata),
        selezionato: false
      }));

    } catch (error) {
      this._error = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Errore nel caricamento dei documenti');
    } finally {
      this._isLoading = false;
    }
  }

  /**
   * Add new document
   */
  async add(doc: Omit<Documento, 'id' | 'selezionato'>): Promise<void> {
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authStore.authHeader },
        body: JSON.stringify(doc)
      });

      if (!response.ok) {
        throw new Error('Failed to add document');
      }

      const newDoc = await response.json();
      this._documents = [...this._documents, {
        ...newDoc,
        dataCaricamento: new Date(newDoc.dataCaricamento),
        dataVisualizzata: new Date(newDoc.dataVisualizzata),
        selezionato: false
      }];

      toast.success('Documento aggiunto con successo');

    } catch (error) {
      toast.error('Errore durante l\'aggiunta del documento');
      throw error;
    }
  }

  /**
   * Remove document by ID
   */
  async remove(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        headers: { ...authStore.authHeader }
      });

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      this._documents = this._documents.filter(d => d.id !== id);
      toast.success('Documento eliminato');

    } catch (error) {
      toast.error('Errore durante l\'eliminazione');
      throw error;
    }
  }

  /**
   * Remove selected documents
   */
  async removeSelected(): Promise<void> {
    const selectedIds = this.selectedDocuments.map(d => d.id);
    
    try {
      await Promise.all(
        selectedIds.map(id => this.remove(id))
      );

      this._isSelectionMode = false;
      toast.success(`${selectedIds.length} documenti eliminati`);

    } catch (error) {
      toast.error('Errore durante l\'eliminazione');
      throw error;
    }
  }

  /**
   * Update displayed date
   */
  async updateDisplayDate(id: string, newDate: Date): Promise<void> {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authStore.authHeader },
        body: JSON.stringify({ dataVisualizzata: newDate.toISOString() })
      });

      if (!response.ok) {
        throw new Error('Failed to update date');
      }

      const doc = this._documents.find(d => d.id === id);
      if (doc) {
        doc.dataVisualizzata = newDate;
      }

      toast.success('Data aggiornata');

    } catch (error) {
      toast.error('Errore durante l\'aggiornamento');
      throw error;
    }
  }

  /**
   * Toggle selection for a document
   */
  toggleSelection(id: string): void {
    const doc = this._documents.find(d => d.id === id);
    if (doc) {
      doc.selezionato = !doc.selezionato;
    }
  }

  /**
   * Deselect all documents
   */
  deselectAll(): void {
    this._documents.forEach(d => d.selezionato = false);
  }

  /**
   * Toggle selection mode
   */
  toggleSelectionMode(): void {
    this._isSelectionMode = !this._isSelectionMode;
    
    if (!this._isSelectionMode) {
      this.deselectAll();
    }
  }
}

export const documentsStore = new DocumentsStore();

