// src/routes/api/documents/[id]/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requireAdmin } from '$lib/server/auth/middleware';
import { MOCK_DOCUMENTS } from '$lib/server/mock/documents';

/**
 * PATCH /api/documents/[id] - Update document (admin only)
 */
export const PATCH: RequestHandler = async (event) => {
  try {
    await requireAdmin(event);

    const { id } = event.params;
    const updates = await event.request.json();

    const docIndex = MOCK_DOCUMENTS.findIndex(d => d.id === id);
    
    if (docIndex === -1) {
      throw error(404, 'Documento non trovato');
    }

    // Update document
    const document = MOCK_DOCUMENTS[docIndex];
    
    if (updates.dataVisualizzata) {
      document.dataVisualizzata = new Date(updates.dataVisualizzata);
    }
    
    if (updates.nomeFile) {
      document.nomeFile = updates.nomeFile;
    }
    
    if (updates.ruoloVisibile) {
      document.ruoloVisibile = updates.ruoloVisibile;
    }

    MOCK_DOCUMENTS[docIndex] = document;

    return json(document);

  } catch (err) {
    console.error('PATCH document error:', err);
    throw err;
  }
};

/**
 * DELETE /api/documents/[id] - Delete document (admin only)
 */
export const DELETE: RequestHandler = async (event) => {
  try {
    await requireAdmin(event);

    const { id } = event.params;

    const docIndex = MOCK_DOCUMENTS.findIndex(d => d.id === id);
    
    if (docIndex === -1) {
      throw error(404, 'Documento non trovato');
    }

    // Remove document
    MOCK_DOCUMENTS.splice(docIndex, 1);

    return json({ success: true });

  } catch (err) {
    console.error('DELETE document error:', err);
    throw err;
  }
};
