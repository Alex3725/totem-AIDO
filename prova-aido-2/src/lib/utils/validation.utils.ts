/**
 * VALIDATION UTILITIES
 * - Schema validation con Zod (opzionale)
 */

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password validation
 * - Min 8 caratteri
 * - Almeno 1 lettera
 * - Almeno 1 numero
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) return false;
  
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return hasLetter && hasNumber;
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255);
}

/**
 * Validate document upload
 */
export function validateDocumentUpload(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

  if (file.size > maxSize) {
    return { valid: false, error: 'File troppo grande (max 10MB)' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Tipo file non supportato' };
  }

  return { valid: true };
}

/**
 * Validate UUID
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}