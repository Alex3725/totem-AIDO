// src/lib/server/auth/session.ts
import type { Cookies } from '@sveltejs/kit';
import { generateAccessToken, generateRefreshToken, verifyToken } from './jwt';
import type { SessionUser } from '$lib/types/auth.types';

const REFRESH_COOKIE_NAME = 'refresh_token';
const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7 // 7 days
};

/**
 * Create session and set cookies
 */
export function createSession(cookies: Cookies, user: SessionUser) {
  const accessToken = generateAccessToken({
    sub: user.id,
    email: user.email,
    role: user.ruolo
  });
  
  const refreshToken = generateRefreshToken({
    sub: user.id,
    email: user.email,
    role: user.ruolo
  });
  
  // Set refresh token as HTTP-only cookie
  cookies.set(REFRESH_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);
  
  return { accessToken, refreshToken };
}

/**
 * Get session from cookies
 */
export function getSession(cookies: Cookies): SessionUser | null {
  const refreshToken = cookies.get(REFRESH_COOKIE_NAME);
  
  if (!refreshToken) {
    return null;
  }
  
  try {
    const payload = verifyToken(refreshToken);
    
    if (payload.type !== 'refresh') {
      return null;
    }
    
    // In production: fetch user from database (qui usiamo i claim del refresh token)
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

/**
 * Refresh session tokens
 */
export function refreshSession(
  cookies: Cookies,
  user: Pick<SessionUser, 'id' | 'email' | 'ruolo'>
): { accessToken: string; refreshToken: string } {
  const refreshToken = generateRefreshToken({
    sub: user.id,
    email: user.email,
    role: user.ruolo
  });
  
  cookies.set(REFRESH_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);
  
  const accessToken = generateAccessToken({
    sub: user.id,
    email: user.email,
    role: user.ruolo
  });

  return {
    accessToken,
    refreshToken
  };
}

/**
 * Destroy session
 */
export function destroySession(cookies: Cookies): void {
  cookies.delete(REFRESH_COOKIE_NAME, { path: '/' });
}