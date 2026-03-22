// src/routes/api/auth/logout/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { destroySession } from '$lib/server/auth/session';

export const POST: RequestHandler = async ({ cookies }) => {
  destroySession(cookies);
  
  return json({ success: true });
};
