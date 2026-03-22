/**
 * USER SERVICE
 * - Business logic per gestione utenti
 * - Da implementare con Drizzle ORM
 */

import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { User, UserCredentials } from '$lib/types/auth.types';

/**
 * Trova utente per email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] || null;
}

/**
 * Verifica credenziali utente
 */
export async function verifyUserCredentials(
  credentials: UserCredentials
): Promise<User | null> {
  const user = await findUserByEmail(credentials.email);
  
  if (!user || !user.passwordHash) {
    return null;
  }

  const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
  return isValid ? user : null;
}

/**
 * Crea nuovo utente
 */
export async function createUser(data: {
  email: string;
  password: string;
  nome: string;
  ruolo: 'admin' | 'user';
}): Promise<User> {
  const passwordHash = await bcrypt.hash(data.password, 10);

  const [newUser] = await db
    .insert(users)
    .values({
      email: data.email,
      passwordHash,
      nome: data.nome,
      ruolo: data.ruolo
    })
    .returning();

  return newUser;
}

/**
 * Aggiorna ultimo login
 */
export async function updateLastLogin(userId: string): Promise<void> {
  await db
    .update(users)
    .set({ lastLoginAt: new Date() })
    .where(eq(users.id, userId));
}