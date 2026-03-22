// src/routes/api/documents/download/+server.ts
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { optionalAuth } from '$lib/server/auth/middleware';

// Mock documents storage (replace with real storage in production)
const MOCK_DOCUMENTS = [
  {
    id: '1',
    nomeFile: 'Brochure Donazione.pdf',
    fileUrl: '/files/brochure.pdf',
    ruoloVisibile: 'user'
  },
  {
    id: '2',
    nomeFile: 'Guida Completa.pdf',
    fileUrl: '/files/guida.pdf',
    ruoloVisibile: 'user'
  }
];

export const GET: RequestHandler = async (event) => {
  try {
    // Optional auth - public QR codes work without authentication
    const user = await optionalAuth(event);

    const { url } = event;
    const ids = url.searchParams.get('ids')?.split(',') || [];

    if (ids.length === 0) {
      throw error(400, 'Nessun documento specificato');
    }

    // Get documents
    const documents = MOCK_DOCUMENTS.filter(doc => ids.includes(doc.id));

    if (documents.length === 0) {
      throw error(404, 'Documenti non trovati');
    }

    // Check permissions
    if (!user && documents.some(doc => doc.ruoloVisibile === 'admin')) {
      throw error(403, 'Autenticazione richiesta per alcuni documenti');
    }

    // Single file download
    if (documents.length === 1) {
      const doc = documents[0];
      
      // In production: stream file from storage
      return new Response(null, {
        status: 302,
        headers: {
          Location: doc.fileUrl,
          'Content-Disposition': `attachment; filename="${doc.nomeFile}"`
        }
      });
    }

    // Multiple files - create ZIP
    // In production: use archiver or similar to create ZIP on the fly
    throw error(501, 'Download multiplo non ancora implementato');

  } catch (err) {
    console.error('Download error:', err);
    throw err;
  }
};
