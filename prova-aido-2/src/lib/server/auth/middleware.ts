// src/lib/server/auth/middleware.ts
import { error, type RequestEvent } from '@sveltejs/kit';
import { verifyToken } from './jwt';
import type { SessionUser } from '$lib/types/auth.types';

/**
 * Extract token from Authorization header
 */
function extractToken(event: RequestEvent): string | null {
  const authHeader = event.request.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7);
}

/**
 * Require authentication middleware
 */
export async function requireAuth(event: RequestEvent): Promise<SessionUser> {
  const token = extractToken(event);
  
  if (!token) {
    throw error(401, 'Authentication required');
  }
  
  try {
    const payload = verifyToken(token);
    
    if (payload.type !== 'access') {
      throw error(401, 'Invalid token type');
    }
    
    return {
      id: payload.sub,
      email: payload.email,
      nome: '', // Fetch from DB in production
      ruolo: payload.role
    };
  } catch {
    throw error(401, 'Invalid or expired token');
  }
}

/**
 * Require admin role middleware
 */
export async function requireAdmin(event: RequestEvent): Promise<SessionUser> {
  const user = await requireAuth(event);
  
  if (user.ruolo !== 'admin') {
    throw error(403, 'Admin access required');
  }
  
  return user;
}

/**
 * Optional authentication (doesn't throw if not authenticated)
 */
export async function optionalAuth(event: RequestEvent): Promise<SessionUser | null> {
  const token = extractToken(event);
  
  if (!token) {
    return null;
  }
  
  try {
    const payload = verifyToken(token);

    if (payload.type !== 'access') {
      return null;
    }
    
    return {
      id: payload.sub,
      email: payload.email,
      nome: '',
      ruolo: payload.role
    };
  } catch {
    return null;
  }
}