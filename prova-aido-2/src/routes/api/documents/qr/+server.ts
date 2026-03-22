// src/routes/api/documents/qr/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requireAuth } from '$lib/server/auth/middleware';
import { generateDocumentQR, generateMultipleDocumentsQR } from '$lib/utils/qr.utils';

export const POST: RequestHandler = async (event) => {
  try {
    // Verify authentication
    await requireAuth(event);

    const { documentIds } = await event.request.json();

    if (!documentIds || !Array.isArray(documentIds) || documentIds.length === 0) {
      return json(
        { error: 'IDs documenti non validi' },
        { status: 400 }
      );
    }

    // Get base URL from request
    const baseUrl = `${event.url.protocol}//${event.url.host}`;

    // Generate QR code
    let qrCode: string;
    
    if (documentIds.length === 1) {
      qrCode = await generateDocumentQR(documentIds[0], baseUrl);
    } else {
      qrCode = await generateMultipleDocumentsQR(documentIds, baseUrl);
    }

    return json({ qrCode });

  } catch (error) {
    console.error('QR generation error:', error);
    return json(
      { error: 'Errore nella generazione del QR code' },
      { status: 500 }
    );
  }
};
