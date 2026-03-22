/**
 * API RESPONSE TYPES
 * - Tipi per response standardizzate
 */

/**
 * Generic API Response
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Error Response
 */
export interface ApiError {
  error: string;
  code?: string;
  details?: Record<string, string[]>;
}

/**
 * Upload Progress
 */
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Batch Operation Result
 */
export interface BatchResult<T> {
  successful: T[];
  failed: Array<{
    item: T;
    error: string;
  }>;
}