// src/routes/api/documents/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requireAuth, requireAdmin } from '$lib/server/auth/middleware';
import { MOCK_DOCUMENTS } from '$lib/server/mock/documents';

/**
 * GET /api/documents - List all documents
 */
export const GET: RequestHandler = async (event) => {
  try {
    const user = await requireAuth(event);

    // Filter documents based on user role
    const documents = MOCK_DOCUMENTS.filter(doc => {
      if (user.ruolo === 'admin') return true;
      return doc.ruoloVisibile === 'user';
    });

    return json({
      documents,
      total: documents.length
    });

  } catch (error) {
    console.error('GET documents error:', error);
    throw error;
  }
};

/**
 * POST /api/documents - Create new document (admin only)
 */
export const POST: RequestHandler = async (event) => {
  try {
    await requireAdmin(event);

    const data = await event.request.json();
    
    const newDocument = {
      id: crypto.randomUUID(),
      nomeFile: data.nomeFile,
      dataCaricamento: new Date(),
      dataVisualizzata: new Date(data.dataVisualizzata || Date.now()),
      fileUrl: data.fileUrl,
      previewImgUrl: data.previewImgUrl,
      ruoloVisibile: data.ruoloVisibile || 'user'
    };

    MOCK_DOCUMENTS.push(newDocument);

    return json(newDocument, { status: 201 });

  } catch (error) {
    console.error('POST document error:', error);
    throw error;
  }
};
