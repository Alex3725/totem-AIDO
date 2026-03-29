
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(auth)" | "/(app)" | "/" | "/api" | "/api/auth" | "/api/auth/login" | "/api/auth/logout" | "/api/auth/refresh" | "/api/documents" | "/api/documents/download" | "/api/documents/qr" | "/api/documents/[id]" | "/(app)/carousel" | "/(app)/carousel/chi-siamo" | "/(app)/carousel/contatti" | "/(app)/carousel/donazione" | "/(app)/carousel/storie" | "/(app)/documents" | "/(auth)/login";
		RouteParams(): {
			"/api/documents/[id]": { id: string }
		};
		LayoutParams(): {
			"/(auth)": Record<string, never>;
			"/(app)": Record<string, never>;
			"/": { id?: string };
			"/api": { id?: string };
			"/api/auth": Record<string, never>;
			"/api/auth/login": Record<string, never>;
			"/api/auth/logout": Record<string, never>;
			"/api/auth/refresh": Record<string, never>;
			"/api/documents": { id?: string };
			"/api/documents/download": Record<string, never>;
			"/api/documents/qr": Record<string, never>;
			"/api/documents/[id]": { id: string };
			"/(app)/carousel": Record<string, never>;
			"/(app)/carousel/chi-siamo": Record<string, never>;
			"/(app)/carousel/contatti": Record<string, never>;
			"/(app)/carousel/donazione": Record<string, never>;
			"/(app)/carousel/storie": Record<string, never>;
			"/(app)/documents": Record<string, never>;
			"/(auth)/login": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/auth" | "/api/auth/" | "/api/auth/login" | "/api/auth/login/" | "/api/auth/logout" | "/api/auth/logout/" | "/api/auth/refresh" | "/api/auth/refresh/" | "/api/documents" | "/api/documents/" | "/api/documents/download" | "/api/documents/download/" | "/api/documents/qr" | "/api/documents/qr/" | `/api/documents/${string}` & {} | `/api/documents/${string}/` & {} | "/carousel" | "/carousel/" | "/carousel/chi-siamo" | "/carousel/chi-siamo/" | "/carousel/contatti" | "/carousel/contatti/" | "/carousel/donazione" | "/carousel/donazione/" | "/carousel/storie" | "/carousel/storie/" | "/documents" | "/documents/" | "/login" | "/login/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}