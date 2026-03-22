// src/lib/utils/crypto.utils.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '$lib/config/env';
import type { JWTPayload, User } from '$lib/types/auth.types';

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, ENV.BCRYPT_ROUNDS);
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT access token
 */
export function generateAccessToken(user: User): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp' | 'type'> = {
    sub: user.id,
    email: user.email,
    role: user.ruolo
  };

  return jwt.sign({ ...payload, type: 'access' }, ENV.JWT_SECRET, {
    expiresIn: ENV.ACCESS_TOKEN_EXPIRY
  });
}

/**
 * Generate a JWT refresh token
 */
export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { sub: userId, email: '', role: 'user', type: 'refresh' },
    ENV.JWT_SECRET,
    {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRY
    }
  );
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, ENV.JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}