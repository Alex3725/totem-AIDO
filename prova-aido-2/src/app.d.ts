// src/app.d.ts
import type { SessionUser } from '$lib/types/auth.types';

declare global {
  namespace App {
    interface Error {
      message: string;
      code?: string;
    }

    interface Locals {
      user?: SessionUser;
    }

    interface PageData {
      user?: SessionUser;
    }
    
    // interface PageState {}
    // interface Platform {}
  }
}

export {};