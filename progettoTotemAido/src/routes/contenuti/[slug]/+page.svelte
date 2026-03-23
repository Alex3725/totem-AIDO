<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const pdfItems = [
		{ label: 'DOMANDE E RISPOSTE (PDF)', href: '/files/PDF/DOMANDE%20E%20RISPOSTE.pdf' },
		{ label: 'Guida informativa (PDF)', href: '/files/PDF/Guida%20informativa.pdf' },
		{ label: 'Diagramma di flusso (PDF)', href: '/files/PDF/DIAGRAMMA%20DI%20FLUSSO.pdf' }
	];

	const videoItems = [{ label: 'Percorso donazione e trapianto (MP4)', href: '/files/Video/PERCORSO_DONAZIONE_TRAPIANTO.mp4' }];

	const faqItems = ['Come mi iscrivo?', 'Domanda 2', 'Domanda 3', 'Domanda 4'];
	const sceltaItems = ['Azienda Sanitaria Locale', 'Comune', 'Iscrizione AIDO'];

	let diagramCanvas = $state<HTMLCanvasElement | null>(null);
	let diagramContainer = $state<HTMLDivElement | null>(null);
	let diagramLoadError = $state('');

	function detectContentBounds(
		pixels: Uint8ClampedArray,
		width: number,
		height: number
	): { x: number; y: number; w: number; h: number } {
		let minX = width;
		let minY = height;
		let maxX = -1;
		let maxY = -1;

		for (let y = 0; y < height; y += 1) {
			for (let x = 0; x < width; x += 1) {
				const i = (y * width + x) * 4;
				const r = pixels[i];
				const g = pixels[i + 1];
				const b = pixels[i + 2];
				const a = pixels[i + 3];

				// Treat near-white pixels as background and keep only actual diagram content.
				if (a > 10 && (r < 245 || g < 245 || b < 245)) {
					if (x < minX) minX = x;
					if (y < minY) minY = y;
					if (x > maxX) maxX = x;
					if (y > maxY) maxY = y;
				}
			}
		}

		if (maxX < minX || maxY < minY) {
			return { x: 0, y: 0, w: width, h: height };
		}

		const pad = 6;
		const x = Math.max(0, minX - pad);
		const y = Math.max(0, minY - pad);
		const w = Math.min(width - x, maxX - minX + 1 + pad * 2);
		const h = Math.min(height - y, maxY - minY + 1 + pad * 2);

		return { x, y, w, h };
	}

	async function renderDonationDiagram() {
		if (data.page.slug !== 'processo-donazione' || !diagramCanvas) return;

		try {
			const pdfjsLib = await import('pdfjs-dist');
			pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
				'pdfjs-dist/build/pdf.worker.min.mjs',
				import.meta.url
			).toString();

			const pdf = await pdfjsLib.getDocument('/files/PDF/DIAGRAMMA%20DI%20FLUSSO.pdf').promise;
			const page = await pdf.getPage(1);
			const containerWidth = diagramContainer?.clientWidth ?? 420;
			const containerHeight = diagramContainer?.clientHeight ?? 620;
			const baseViewport = page.getViewport({ scale: 1 });
			const maxWidth = Math.max(220, containerWidth - 4);
			const maxHeight = Math.max(260, containerHeight - 4);
			const scaleByWidth = maxWidth / baseViewport.width;
			const scaleByHeight = maxHeight / baseViewport.height;
			const baseScale = Math.min(scaleByWidth, scaleByHeight);
			const zoomBoost = 1.3;
			const scale = Math.max(0.52, Math.min(2.4, baseScale * zoomBoost));
			const viewport = page.getViewport({ scale });

			const context = diagramCanvas.getContext('2d');
			if (!context) return;
			const tempCanvas = document.createElement('canvas');
			const tempContext = tempCanvas.getContext('2d');
			if (!tempContext) return;

			const dpr = window.devicePixelRatio || 1;
			tempCanvas.width = Math.floor(viewport.width * dpr);
			tempCanvas.height = Math.floor(viewport.height * dpr);
			tempContext.setTransform(dpr, 0, 0, dpr, 0, 0);

			await page.render({ canvas: tempCanvas, canvasContext: tempContext, viewport }).promise;

			const raw = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
			const bounds = detectContentBounds(raw.data, tempCanvas.width, tempCanvas.height);

			const targetWidth = Math.max(220, containerWidth - 2);
			const targetHeight = Math.max(260, containerHeight - 2);
			diagramCanvas.width = Math.floor(targetWidth * dpr);
			diagramCanvas.height = Math.floor(targetHeight * dpr);
			diagramCanvas.style.width = `${targetWidth}px`;
			diagramCanvas.style.height = `${targetHeight}px`;

			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0, 0, diagramCanvas.width, diagramCanvas.height);
			context.setTransform(dpr, 0, 0, dpr, 0, 0);

			const drawScale = Math.min(targetWidth / (bounds.w / dpr), targetHeight / (bounds.h / dpr));
			const drawW = (bounds.w / dpr) * drawScale;
			const drawH = (bounds.h / dpr) * drawScale;
			const dx = (targetWidth - drawW) / 2;
			const dy = (targetHeight - drawH) / 2;

			context.drawImage(
				tempCanvas,
				bounds.x,
				bounds.y,
				bounds.w,
				bounds.h,
				dx,
				dy,
				drawW,
				drawH
			);
			diagramLoadError = '';
		} catch (error) {
			diagramLoadError = 'Anteprima non disponibile in questo momento.';
		}
	}

	onMount(() => {
		if (data.page.slug !== 'processo-donazione') return;

		let resizeTimer: ReturnType<typeof setTimeout> | null = null;
		const onResize = () => {
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				void renderDonationDiagram();
			}, 180);
		};

		void renderDonationDiagram();
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
			if (resizeTimer) clearTimeout(resizeTimer);
		};
	});

	function noop() {
		return;
	}
</script>

<main class="screen">
	<section class="totem-card">
		<div class="totem-inner">
			<header class="totem-header">
				<a href={`/opzioni-menu/${data.page.slug}`} aria-label="Torna indietro" class="icon-wrap">
					<img src="/img/Indietro_pulsante.png" alt="Indietro" class="icon" />
				</a>
				<img src="/img/logoAIDO.png" alt="Logo AIDO" class="logo" />
				<a href="/" aria-label="Home" class="icon-wrap">
					<img src="/img/Home_pulsante.png" alt="Home" class="icon" />
				</a>
			</header>

			<h1 class="title">{data.page.title}</h1>

			<section class="content-panel">
				{#if data.page.slug === 'processo-donazione'}
					<h2 class="subtitle">Il percorso del dono</h2>
					<div class="diagram-viewer">
						<div class="diagram-canvas-wrap" bind:this={diagramContainer}>
							<canvas bind:this={diagramCanvas} aria-label="Diagramma di flusso AIDO"></canvas>
						</div>
						{#if diagramLoadError}
							<p class="diagram-error">{diagramLoadError}</p>
							<a href="/files/PDF/DIAGRAMMA%20DI%20FLUSSO.pdf" target="_blank" rel="noreferrer" class="diagram-open-link"
								>Apri PDF completo</a
							>
						{/if}
					</div>
				{:else if data.page.slug === 'processo-scelta'}
					<h2 class="subtitle">{data.page.title}</h2>
					{#each sceltaItems as item}
						<div class="dropdown-like">
							<span>{item}</span>
							<img src="/img/dropdown_pulsante.png" alt="Espandi" />
						</div>
					{/each}
				{:else if data.page.slug === 'diventa-donatore'}
					<h2 class="subtitle">Scansione il QR code per iscriverti all'AIDO</h2>
					<div class="qr-placeholder">QR da inserire</div>
					<div class="store-row">
						<button type="button" class="store-btn" onclick={noop} aria-label="Google Play">Google Play</button>
						<button type="button" class="store-btn" onclick={noop} aria-label="App Store">App Store</button>
					</div>
				{:else if data.page.slug === 'faq'}
					<h2 class="subtitle">Faq</h2>
					{#each faqItems as item}
						<div class="dropdown-like">
							<span>{item}</span>
							<img src="/img/dropdown_pulsante.png" alt="Espandi" />
						</div>
					{/each}
				{:else}
					<h2 class="subtitle">Catalogo</h2>
					<div class="filters-row">
						<label class="search-box">
							<input type="search" placeholder="Ricerca" />
							<img src="/img/LenteDiIngrandimento.png" alt="Cerca" />
						</label>
						<button type="button" class="filter-btn">
							<span>Filtri</span>
							<img src="/img/dropdown_pulsante.png" alt="Filtri" />
						</button>
					</div>

					<div class="materials-section">
						<h3>Volantini</h3>
						<div class="thumb-grid">
							{#each pdfItems.slice(0, 3) as item}
								<a href={item.href} target="_blank" rel="noreferrer" class="thumb" aria-label={item.label}></a>
							{/each}
						</div>
					</div>

					<div class="materials-section">
						<h3>Video</h3>
						<div class="thumb-grid single-row">
							{#each videoItems as item}
								<a href={item.href} target="_blank" rel="noreferrer" class="thumb wide" aria-label={item.label}></a>
							{/each}
						</div>
					</div>
				{/if}
			</section>
		</div>
	</section>
</main>

<style>
	.screen {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		background: linear-gradient(120deg, rgba(169, 0, 0, 1) 0%, rgba(113, 50, 87, 1) 50%, rgba(58, 100, 173, 1) 100%);
	}

	.totem-card {
		width: min(100vw, calc(100dvh * 9 / 16));
		height: min(100dvh, calc(100vw * 16 / 9));
		border-radius: 2.2vmin;
		padding: 1vmin;
		background: #5b7cbd;
	}

	.totem-inner {
		height: 100%;
		border-radius: 24px;
		background: #ffffff;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.totem-header {
		height: 3.9rem;
		border-radius: 16px;
		background: #f6f6f6;
		display: grid;
		grid-template-columns: 2.2rem 1fr 2.2rem;
		align-items: center;
		padding: 0 0.4rem;
		column-gap: 0.3rem;
	}

	.icon-wrap {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	.icon {
		width: 1.9rem;
		height: 1.9rem;
	}

	.logo {
		margin: 0 auto;
		width: 2.75rem;
		height: 2.75rem;
	}

	.title {
		margin-top: 0.4rem;
		text-align: center;
		font-size: clamp(1.8rem, 4.8vw, 2.3rem);
		font-weight: 900;
		color: #111827;
		line-height: 1.05;
	}

	.content-panel {
		margin-top: 0.55rem;
		flex: 1;
		min-height: 0;
		border-radius: 12px;
		padding: 0.9rem;
		background: #d40000;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		overflow: auto;
		color: #fff;
	}

	.subtitle {
		margin: 0;
		text-align: center;
		font-size: clamp(1.35rem, 3.4vw, 1.95rem);
		font-weight: 900;
		line-height: 1.2;
	}

	.diagram-viewer {
		margin-top: 0.4rem;
		flex: 1;
		min-height: 0;
		border-radius: 12px;
		background: transparent;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.2rem;
		gap: 0.45rem;
	}

	.diagram-canvas-wrap {
		width: 100%;
		height: 100%;
		max-height: 100%;
		max-width: 100%;
		overflow: hidden;
		border-radius: 8px;
		background: #fff;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
		padding: 0.15rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.diagram-canvas-wrap canvas {
		display: block;
		max-width: 100%;
		height: auto;
	}

	.diagram-error {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 700;
		color: #611;
	}

	.diagram-open-link {
		text-decoration: none;
		padding: 0.38rem 0.85rem;
		border-radius: 999px;
		background: #f4f4f4;
		color: #111;
		font-size: 0.82rem;
		font-weight: 800;
	}

	@media (orientation: landscape) and (min-width: 1100px) and (min-height: 650px) {
		.diagram-viewer {
			padding: 0.25rem;
		}
	}

	.dropdown-like {
		background: #fff;
		border-radius: 10px;
		padding: 0.75rem 0.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #111;
		font-size: 1rem;
		font-weight: 800;
	}

	.dropdown-like img {
		width: 1.35rem;
		height: 1.35rem;
	}

	.qr-placeholder {
		margin-top: 0.4rem;
		height: min(34vh, 280px);
		border: 3px dashed #fff;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.3rem;
		font-weight: 900;
	}

	.store-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.store-btn {
		border: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: 2rem;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 800;
		text-decoration: none;
		background: #111;
		color: #fff;
	}

	.filters-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.35rem;
	}

	.search-box {
		height: 2.05rem;
		background: #fff;
		border-radius: 999px;
		display: flex;
		align-items: center;
		padding: 0 0.55rem 0 0.7rem;
	}

	.search-box input {
		width: 100%;
		border: 0;
		outline: none;
		font-size: 0.82rem;
		font-weight: 700;
	}

	.search-box img,
	.filter-btn img {
		width: 1.1rem;
		height: 1.1rem;
	}

	.filter-btn {
		height: 2.05rem;
		border: 0;
		padding: 0 0.65rem;
		border-radius: 999px;
		display: inline-flex;
		gap: 0.3rem;
		align-items: center;
		font-size: 0.82rem;
		font-weight: 800;
		color: #111;
		background: #fff;
	}

	.materials-section h3 {
		margin: 0.2rem 0 0.35rem;
		font-size: 1.45rem;
		font-weight: 900;
	}

	.thumb-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.42rem;
	}

	.thumb-grid.single-row {
		grid-template-columns: 1fr;
	}

	.thumb {
		height: 4.35rem;
		background: #d9d9d9;
		border-radius: 8px;
	}

	.thumb.wide {
		height: 4.75rem;
	}

	@media (orientation: landscape) and (min-width: 1100px) and (min-height: 650px) {
		.totem-card {
			width: 92vw;
			height: 92dvh;
			border-radius: 4.5vmin;
			padding: 1.2vmin;
		}

		.totem-inner {
			border-radius: 4vmin;
			padding: 1.6vmin;
		}

		.totem-header {
			height: 11%;
			border-radius: 2.4vmin;
		}

		.title {
			font-size: clamp(2.3rem, 4.2vw, 4.5rem);
		}

		.subtitle {
			font-size: clamp(1.8rem, 3vw, 3rem);
		}

		.search-box,
		.filter-btn,
		.dropdown-like {
			font-size: clamp(1rem, 1.4vw, 1.4rem);
		}
	}
</style>
