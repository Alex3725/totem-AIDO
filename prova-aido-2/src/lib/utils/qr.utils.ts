// src/lib/utils/qr.utils.ts
import QRCode from 'qrcode';

/**
 * Generate QR code as data URL
 */
export async function generateQRCode(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate download URL for document
 */
export function generateDownloadUrl(documentId: string, baseUrl: string): string {
  return `${baseUrl}/api/documents/download/${documentId}`;
}

/**
 * Generate QR code for document download
 */
export async function generateDocumentQR(documentId: string, baseUrl: string): Promise<string> {
  const downloadUrl = generateDownloadUrl(documentId, baseUrl);
  return generateQRCode(downloadUrl);
}

/**
 * Generate QR code for multiple documents (zip download)
 */
export async function generateMultipleDocumentsQR(
  documentIds: string[],
  baseUrl: string
): Promise<string> {
  const downloadUrl = `${baseUrl}/api/documents/download?ids=${documentIds.join(',')}`;
  return generateQRCode(downloadUrl);
}
