/**
 * Store autenticazione con gestione sessione (Svelte 5 Runes)
 */

export type Ruolo = 'admin' | 'user' | null;

export type Utente = {
	id: string;
	email: string;
	nome: string;
	ruolo: Ruolo;
};

type LoginApiResponse =
	| { user: Utente; accessToken: string }
	| { utente: Utente; accessToken?: string }; // backward-compat se cambiassi API

class AuthStore {
	utente = $state<Utente | null>(null);
	isLoading = $state(false);
	errore = $state<string | null>(null);
	accessToken = $state<string | null>(null);

	// Computed
	get isAutenticato(): boolean {
		return this.utente !== null;
	}

	get isAdmin(): boolean {
		return this.utente?.ruolo === 'admin';
	}

	get isUser(): boolean {
		return this.utente?.ruolo === 'user';
	}

	get authHeader(): Record<string, string> {
		return this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {};
	}

	// Login
	async login(email: string, password: string): Promise<boolean> {
		this.isLoading = true;
		this.errore = null;

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				const { error } = await response.json();
				this.errore = error;
				return false;
			}

			const data = (await response.json()) as LoginApiResponse;
			const user = 'user' in data ? data.user : data.utente;
			const token = ('accessToken' in data ? data.accessToken : null) ?? null;

			this.utente = user;
			this.accessToken = token;

			// Salva in localStorage per persistenza
			if (typeof window !== 'undefined') {
				localStorage.setItem('utente', JSON.stringify(user));
				if (token) localStorage.setItem('accessToken', token);
			}

			return true;
		} catch (error) {
			this.errore = 'Errore di connessione';
			return false;
		} finally {
			this.isLoading = false;
		}
	}

	// Logout
	async logout() {
		this.utente = null;
		this.errore = null;
		this.accessToken = null;

		if (typeof window !== 'undefined') {
			localStorage.removeItem('utente');
			localStorage.removeItem('accessToken');
		}

		// Best-effort: distrugge il refresh cookie lato server
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
		} catch {
			// ignore
		}
	}

	// Ripristina sessione da localStorage
	ripristinaSessione() {
		if (typeof window === 'undefined') return;

		const utenteStorage = localStorage.getItem('utente');
		const tokenStorage = localStorage.getItem('accessToken');
		if (utenteStorage) {
			try {
				this.utente = JSON.parse(utenteStorage);
			} catch {
				localStorage.removeItem('utente');
			}
		}
		this.accessToken = tokenStorage || null;
	}

	// Cambia ruolo (solo per testing)
	cambiaRuolo(nuovoRuolo: 'admin' | 'user') {
		if (this.utente) {
			this.utente.ruolo = nuovoRuolo;

			if (typeof window !== 'undefined') {
				localStorage.setItem('utente', JSON.stringify(this.utente));
			}
		}
	}
}

export const authStore = new AuthStore();

