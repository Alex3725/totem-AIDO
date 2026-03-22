type ToastType = 'success' | 'error' | 'info';

function emit(type: ToastType, message: string) {
	// Browser-only UX. In SSR/test: no-op.
	if (typeof window === 'undefined') return;

	// Hook point if you want a UI toast component later.
	window.dispatchEvent(new CustomEvent('toast', { detail: { type, message } }));

	// Minimal fallback so l'utente vede qualcosa anche senza UI dedicata.
	if (type === 'error') console.error(message);
	else console.log(message);
}

export const toast = {
	success: (message: string) => emit('success', message),
	error: (message: string) => emit('error', message),
	info: (message: string) => emit('info', message)
};

