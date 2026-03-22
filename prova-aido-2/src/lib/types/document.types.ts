// src/lib/types/document.types.ts
import type { UserRole } from './auth.types';

/**
 * Document entity
 */
export interface Documento {
  id: string;
  nomeFile: string;
  dataCaricamento: Date;
  dataVisualizzata: Date;
  fileUrl: string;
  previewImgUrl: string;
  ruoloVisibile: UserRole;
  selezionato?: boolean;
}

/**
 * Document creation data
 */
export interface DocumentoCreate {
  nomeFile: string;
  dataVisualizzata?: Date;
  fileUrl: string;
  previewImgUrl: string;
  ruoloVisibile: UserRole;
}

/**
 * Document update data
 */
export interface DocumentoUpdate {
  nomeFile?: string;
  dataVisualizzata?: Date;
  ruoloVisibile?: UserRole;
}

/**
 * Document list response
 */
export interface DocumentiResponse {
  documents: Documento[];
  total: number;
}

/**
 * QR code request
 */
export interface QRCodeRequest {
  documentIds: string[];
}

/**
 * QR code response
 */
export interface QRCodeResponse {
  qrCode: string; // Data URL
}
