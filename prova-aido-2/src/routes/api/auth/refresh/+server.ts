// src/routes/api/auth/refresh/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifyToken } from '$lib/server/auth/jwt';
import { refreshSession } from '$lib/server/auth/session';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const refreshToken = cookies.get('refresh_token');

    if (!refreshToken) {
      return json(
        { error: 'Refresh token mancante' },
        { status: 401 }
      );
    }

    // Verify refresh token
    const payload = verifyToken(refreshToken);

    if (payload.type !== 'refresh') {
      return json(
        { error: 'Token non valido' },
        { status: 401 }
      );
    }

    // Generate new tokens
    const tokens = refreshSession(cookies, {
      id: payload.sub,
      email: payload.email,
      ruolo: payload.role
    });

    return json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });

  } catch (error) {
    return json(
      { error: 'Token refresh fallito' },
      { status: 401 }
    );
  }
};
