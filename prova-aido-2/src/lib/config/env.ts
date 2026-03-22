// src/lib/config/env.ts
import {env} from '$env/dynamic/private'; 

export const ENV = {

  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Token expiry
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  
  // Bcrypt
  BCRYPT_ROUNDS: 10,
  
  // Database (for future Drizzle integration)
  DATABASE_URL: env.DATABASE_URL || '',
  
  // File storage
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  
  // CORS
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173']
} as const;
