// src/lib/types/auth.types.ts

/**
 * User roles
 */
export type UserRole = 'admin' | 'user';

/**
 * User entity (full)
 */
export interface User {
  id: string;
  email: string;
  nome: string;
  ruolo: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Login credentials
 */
export interface UserCredentials {
  email: string;
  password: string;
}

/**
 * Session user (without sensitive data)
 */
export interface SessionUser {
  id: string;
  email: string;
  nome: string;
  ruolo: UserRole;
}

/**
 * JWT payload
 */
export interface JWTPayload {
  sub: string;           // User ID
  email: string;
  role: UserRole;
  type: 'access' | 'refresh';
  iat: number;
  exp: number;
}

/**
 * Auth tokens response
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Login response
 */
export interface LoginResponse {
  user: SessionUser;
  accessToken: string;
}
