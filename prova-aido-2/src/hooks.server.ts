// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { getSession } from '$lib/server/auth/session';

/**
 * Global server hook to attach user session to event.locals
 */
export const handle: Handle = async ({ event, resolve }) => {
  // Get session from cookies
  const session = getSession(event.cookies);
  
  if (session) {
    event.locals.user = session;
  }

  return resolve(event);
};
