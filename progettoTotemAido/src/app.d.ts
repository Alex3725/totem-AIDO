// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'pdfjs-dist/legacy/build/pdf.mjs' {
	export const GlobalWorkerOptions: {
		workerSrc: string;
	};

	export function getDocument(src: string | { url: string }): {
		promise: Promise<{
			getPage(pageNumber: number): Promise<{
				getViewport(args: { scale: number }): { width: number; height: number };
				render(args: { canvas: HTMLCanvasElement; canvasContext: CanvasRenderingContext2D; viewport: unknown }): {
					promise: Promise<void>;
				};
			}>;
		}>;
	};
}

export {};
