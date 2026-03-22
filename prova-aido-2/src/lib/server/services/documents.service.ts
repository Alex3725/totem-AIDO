/**
 * DOCUMENTS SERVICE
 * - Business logic per documenti
 * - Da implementare con Drizzle ORM
 */

import { db } from '$lib/server/db';
import { documents } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import type { Documento, DocumentoCreate, DocumentoUpdate } from '$lib/types/document.types';
import type { UserRole } from '$lib/types/auth.types';

/**
 * Lista documenti filtrati per ruolo
 */
export async function listDocuments(userRole: UserRole): Promise<Documento[]> {
  const query = db.select().from(documents);

  if (userRole !== 'admin') {
    query.where(eq(documents.ruoloVisibile, 'user'));
  }

  return await query;
}

/**
 * Trova documento per ID
 */
export async function findDocumentById(id: string): Promise<Documento | null> {
  const result = await db.select().from(documents).where(eq(documents.id, id));
  return result[0] || null;
}

/**
 * Crea documento
 */
export async function createDocument(data: DocumentoCreate): Promise<Documento> {
  const [newDoc] = await db
    .insert(documents)
    .values({
      ...data,
      id: crypto.randomUUID(),
      dataCaricamento: new Date(),
      dataVisualizzata: data.dataVisualizzata || new Date()
    })
    .returning();

  return newDoc;
}

/**
 * Aggiorna documento
 */
export async function updateDocument(
  id: string,
  data: DocumentoUpdate
): Promise<Documento | null> {
  const [updated] = await db
    .update(documents)
    .set(data)
    .where(eq(documents.id, id))
    .returning();

  return updated || null;
}

/**
 * Elimina documento
 */
export async function deleteDocument(id: string): Promise<boolean> {
  const result = await db.delete(documents).where(eq(documents.id, id));
  return result.rowCount > 0;
}

/**
 * Verifica permessi accesso documento
 */
export async function canAccessDocument(
  documentId: string,
  userRole: UserRole
): Promise<boolean> {
  const doc = await findDocumentById(documentId);
  
  if (!doc) return false;
  if (userRole === 'admin') return true;
  
  return doc.ruoloVisibile === 'user';
}