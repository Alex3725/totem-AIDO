// src/routes/api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSession } from '$lib/server/auth/session';
import type { SessionUser } from '$lib/types/auth.types';

// Mock users database (replace with real DB in production)
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@aido.it',
    password: 'admin123',
    nome: 'Admin AIDO',
    ruolo: 'admin' as const
  },
  {
    id: '2',
    email: 'utente@aido.it',
    password: 'user123',
    nome: 'Utente Test',
    ruolo: 'user' as const
  }
];

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return json(
        { error: 'Email e password sono richiesti' },
        { status: 400 }
      );
    }

    // Find user
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      return json(
        { error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    // Verify password (mock, senza bcrypt per il prototipo)
    if (password !== user.password) {
      return json(
        { error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    // Create session user
    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      ruolo: user.ruolo
    };

    // Create session and set cookies
    const tokens = createSession(cookies, sessionUser);

    return json({
      user: sessionUser,
      accessToken: tokens.accessToken
    });

  } catch (error) {
    console.error('Login error:', error);
    return json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
};
