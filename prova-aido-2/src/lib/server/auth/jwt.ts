// src/lib/server/auth/jwt.ts
import jwt from 'jsonwebtoken';
import { ENV } from '$lib/config/env';
import type { JWTPayload } from '$lib/types/auth.types';

const JWT_SECRET = ENV.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = ENV.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = ENV.REFRESH_TOKEN_EXPIRY;

/**
 * Generate access token
 */
export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp' | 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'access' },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp' | 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

/**
 * Verify and decode token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Decode token without verification (for debugging)
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}