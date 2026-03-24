<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { consumeSwipeDirection } from '$lib/stores/swipe-transition';

	let { data }: PageProps = $props();

	const pdfItems = [
		{ label: 'DOMANDE E RISPOSTE (PDF)', href: '/files/PDF/DOMANDE%20E%20RISPOSTE.pdf' },
		{ label: 'Guida informativa (PDF)', href: '/files/PDF/Guida%20informativa.pdf' },
		{ label: 'Diagramma di flusso (PDF)', href: '/files/PDF/DIAGRAMMA%20DI%20FLUSSO.pdf' }
	];

	const videoItems = [{ label: 'Percorso donazione e trapianto (MP4)', href: '/files/Video/PERCORSO_DONAZIONE_TRAPIANTO.mp4' }];
	const socrataSceltaEmbed = `<a class="socrata-visualization-embed" data-embed-version="1" data-height="600" data-socrata-domain="www.dati.lombardia.it" data-vizcan-uid="wwrk-2vck" data-vif="{&quot;configuration&quot;:{&quot;viewSourceDataLink&quot;:false,&quot;mapCenterAndZoom&quot;:{&quot;center&quot;:{&quot;lng&quot;:9.963844242224903,&quot;lat&quot;:45.657615029484205},&quot;zoom&quot;:6},&quot;basemapOptions&quot;:{&quot;searchBoundaryLowerRightLongitude&quot;:11.429275221493008,&quot;searchBoundaryUpperLeftLongitude&quot;:8.498413262956799,&quot;searchBoundaryUpperLeftLatitude&quot;:46.63538906402218,&quot;navigationControl&quot;:true,&quot;basemapStyle&quot;:&quot;mapbox://styles/mapbox/basic-v9&quot;,&quot;geoCoderControl&quot;:true,&quot;geoLocateControl&quot;:true,&quot;searchBoundaryLowerRightLatitude&quot;:44.67984099494623},&quot;mapPitchAndBearing&quot;:{&quot;bearing&quot;:0,&quot;pitch&quot;:0},&quot;datasetMetadata&quot;:false,&quot;panAndZoom&quot;:true,&quot;locateUser&quot;:false},&quot;series&quot;:[{&quot;visible&quot;:true,&quot;color&quot;:{&quot;primary&quot;:&quot;#eb6900&quot;},&quot;mapOptions&quot;:{&quot;mapFlyoutTitleColumnName&quot;:&quot;objectid_1&quot;,&quot;mapType&quot;:&quot;boundaryMap&quot;,&quot;additionalFlyoutColumns&quot;:[&quot;distretto&quot;,&quot;codice_ats&quot;,&quot;descrizion&quot;,&quot;shape_leng&quot;,&quot;shape_area&quot;,&quot;shape_len&quot;]},&quot;showLegend&quot;:true,&quot;type&quot;:&quot;map&quot;,&quot;dataSource&quot;:{&quot;measure&quot;:{&quot;aggregationFunction&quot;:&quot;count&quot;},&quot;name&quot;:&quot;DISTRETTI&quot;,&quot;source&quot;:&quot;DISTRETTI&quot;,&quot;type&quot;:&quot;socrata.soql&quot;,&quot;datasetUid&quot;:&quot;9n45-7bpc&quot;,&quot;dimension&quot;:{&quot;columnName&quot;:&quot;the_geom&quot;,&quot;aggregationFunction&quot;:null},&quot;filters&quot;:[]},&quot;primary&quot;:true,&quot;label&quot;:null},{&quot;visible&quot;:true,&quot;color&quot;:{&quot;primary&quot;:&quot;#eb6900&quot;},&quot;mapOptions&quot;:{&quot;mapFlyoutTitleColumnName&quot;:&quot;codice_ats&quot;,&quot;mapType&quot;:&quot;boundaryMap&quot;,&quot;additionalFlyoutColumns&quot;:[&quot;descrizion&quot;,&quot;shape_area&quot;,&quot;shape_len&quot;]},&quot;showLegend&quot;:true,&quot;type&quot;:&quot;map&quot;,&quot;dataSource&quot;:{&quot;measure&quot;:{&quot;aggregationFunction&quot;:&quot;count&quot;},&quot;name&quot;:&quot;ATS&quot;,&quot;source&quot;:&quot;ATS&quot;,&quot;type&quot;:&quot;socrata.soql&quot;,&quot;datasetUid&quot;:&quot;h55m-dqi2&quot;,&quot;dimension&quot;:{&quot;columnName&quot;:&quot;the_geom&quot;,&quot;aggregationFunction&quot;:null},&quot;filters&quot;:[]},&quot;primary&quot;:false,&quot;label&quot;:null}],&quot;origin&quot;:{&quot;type&quot;:&quot;visualization_canvas&quot;,&quot;url&quot;:&quot;https://www.dati.lombardia.it/d/wwrk-2vck&quot;},&quot;format&quot;:{&quot;type&quot;:&quot;visualization_interchange_format&quot;,&quot;version&quot;:3},&quot;description&quot;:&quot;&quot;,&quot;id&quot;:&quot;7f92fa12-f3b0-462f-b1f3-8d7a9f631e6d&quot;,&quot;title&quot;:&quot;&quot;}" data-width="800" href="https://www.dati.lombardia.it/Sanit-/DISTRETTI/9n45-7bpc?referrer=embed" rel="external" target="_blank"></a>`;

	const faqItems = [
		{
			question: 'Come mi iscrivo?',
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius, nibh eget viverra luctus, massa lorem tincidunt nulla, a condimentum nunc ipsum nec est.'
		},
		{
			question: 'Posso cambiare idea?',
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum, sapien vel posuere varius, nisl arcu cursus turpis, vitae ultrices lorem velit at mauris.'
		},
		{
			question: 'Dove trovo piu informazioni?',
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae neque commodo, volutpat odio sit amet, lacinia lorem.'
		},
		{
			question: 'Serve un documento?',
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, lorem a tempus congue, justo arcu vehicula lectus, at efficitur dui nibh sed velit.'
		}
	];
	const introDirection = consumeSwipeDirection();
	const pageSlideDistance = 170;
	const pageSlideDuration = 380;

	let diagramCanvas = $state<HTMLCanvasElement | null>(null);
	let diagramContainer = $state<HTMLDivElement | null>(null);
	let diagramLoadError = $state('');
	let openFaqItems = $state<string[]>([]);
	let socrataHost = $state<HTMLDivElement | null>(null);
	let showMapKeyboard = $state(false);
	let mapSearchValue = $state('');
	let activeMapInput = $state<HTMLInputElement | null>(null);
	let mapKeyboardEnabled = $state(true);

	const keyboardRows = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['Z', 'X', 'C', 'V', 'B', 'N', 'M']
	];

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
			const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
			pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
				'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
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

	async function mountSocrataMap() {
		if (typeof window === 'undefined' || !socrataHost || data.page.slug !== 'processo-scelta') return;

		try {
			socrataHost.innerHTML = socrataSceltaEmbed;

			const existingScript = document.querySelector(
				'script[data-socrata-domain="www.dati.lombardia.it"]'
			);
			if (existingScript) {
				existingScript.remove();
			}

			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.charset = 'UTF-8';
			script.dataset.locale = 'it';
			script.dataset.socrataDomain = 'www.dati.lombardia.it';
			script.src = 'https://www.dati.lombardia.it/component/visualization/v1/socrata-visualizations-loader.js';
			script.onload = () => {
				window.setTimeout(() => {
					if (!attachMapKeyboard()) {
						disableMapKeyboard();
					}
				}, 900);
			};
			script.onerror = () => {
				disableMapKeyboard();
			};
			document.head.appendChild(script);
		} catch (error) {
			disableMapKeyboard();
		}
	}

	function handleMapAreaClick(event: MouseEvent) {
		if (!mapKeyboardEnabled || !(event.target instanceof Element) || !socrataHost) return;

		const isSearchTrigger = event.target.closest('.search-button');
		const isSearchInput = event.target.closest('input[aria-label="Cerca"], input[placeholder="Search"]');

		if (!isSearchTrigger && !isSearchInput) return;

		if (!attachMapKeyboard()) {
			disableMapKeyboard();
			return;
		}

		if (!activeMapInput) return;

		activeMapInput.focus();
		showMapKeyboard = true;
	}

	function handleMapAreaKeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter' && event.key !== ' ') return;

		event.preventDefault();
		handleMapAreaClick(event as unknown as MouseEvent);
	}

	function syncMapInput(nextValue: string) {
		if (!activeMapInput) return;

		try {
			activeMapInput.value = nextValue;
			mapSearchValue = nextValue;
			activeMapInput.focus();
			activeMapInput.dispatchEvent(new Event('input', { bubbles: true }));
			activeMapInput.dispatchEvent(new Event('change', { bubbles: true }));
			activeMapInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Process' }));
		} catch (error) {
			disableMapKeyboard();
		}
	}

	function submitMapSearch() {
		if (!activeMapInput) return;

		try {
			activeMapInput.focus();
			activeMapInput.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
			activeMapInput.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, key: 'Enter' }));
			activeMapInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Enter' }));
		} catch (error) {
			disableMapKeyboard();
		}
	}

	function appendKeyboardCharacter(key: string) {
		syncMapInput(`${mapSearchValue}${key.toLowerCase()}`);
	}

	function deleteKeyboardCharacter() {
		syncMapInput(mapSearchValue.slice(0, -1));
	}

	function addKeyboardSpace() {
		syncMapInput(`${mapSearchValue} `);
	}

	function clearKeyboardSearch() {
		syncMapInput('');
	}

	function closeMapKeyboard() {
		showMapKeyboard = false;
	}

	function attachMapKeyboard() {
		if (!socrataHost) return false;

		const searchInput = socrataHost.querySelector(
			'input[aria-label="Cerca"], input[placeholder="Search"]'
		) as HTMLInputElement | null;

		if (!searchInput) return false;

		activeMapInput = searchInput;
		mapSearchValue = searchInput.value;
		return true;
	}

	function disableMapKeyboard() {
		mapKeyboardEnabled = false;
		showMapKeyboard = false;
		activeMapInput = null;
	}

	onMount(() => {
		if (data.page.slug === 'processo-scelta') {
			void mountSocrataMap();
			return;
		}

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

	function toggleAccordionItem(item: string) {
		openFaqItems = openFaqItems.includes(item)
			? openFaqItems.filter((entry) => entry !== item)
			: [...openFaqItems, item];
	}
</script>

<main class="screen">
	<section
		class="totem-card"
		in:fly={{
			x: introDirection === 'left' ? pageSlideDistance : introDirection === 'right' ? -pageSlideDistance : 0,
			duration: pageSlideDuration,
			opacity: 0.12
		}}
	>
		<div class="totem-inner">
			<header class="totem-header">
				<div class="header-spacer-right" aria-hidden="true"></div>
				<img src="/img/logoAIDO.png" alt="Logo AIDO" class="logo" />
				<div class="header-spacer-right" aria-hidden="true"></div>
			</header>

			<h1 class="title">{data.page.title}</h1>

			<div class="content-shell">
				<section class={`content-panel ${data.page.slug === 'processo-scelta' ? 'content-panel--map' : ''}`}>
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
					<div class="map-page-card">
						<p class="map-page-label">Consulta la mappa ATS</p>
						<div
							class="map-page-wrap"
							bind:this={socrataHost}
							role="button"
							tabindex="0"
							aria-label="Apri la ricerca della mappa ATS"
							onclick={handleMapAreaClick}
							onkeydown={handleMapAreaKeydown}
						></div>
					</div>
					{#if showMapKeyboard}
						<div class="map-keyboard" transition:fade={{ duration: 180 }}>
							<div class="map-keyboard-top">
								<div class="map-keyboard-display">{mapSearchValue || 'Digita comune o citta'}</div>
								<button type="button" class="map-keyboard-close" onclick={closeMapKeyboard}>Chiudi</button>
							</div>
							{#each keyboardRows as row}
								<div class={`map-keyboard-row ${row.length === 9 ? 'is-nine' : ''} ${row.length === 7 ? 'is-seven' : ''}`}>
									{#each row as key}
										<button type="button" class="map-key" onclick={() => appendKeyboardCharacter(key)}>{key}</button>
									{/each}
								</div>
							{/each}
							<div class="map-keyboard-row map-keyboard-row-wide">
								<button type="button" class="map-key map-key-enter" onclick={submitMapSearch}>Invio</button>
								<button type="button" class="map-key map-key-action" onclick={clearKeyboardSearch}>Cancella</button>
								<button type="button" class="map-key map-key-space" onclick={addKeyboardSpace}>Spazio</button>
								<button type="button" class="map-key map-key-action" onclick={deleteKeyboardCharacter}>Back</button>
							</div>
						</div>
					{/if}
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
						<div class={`accordion-item ${openFaqItems.includes(item.question) ? 'is-open' : ''}`}>
							<button
								type="button"
								class="dropdown-like"
								aria-expanded={openFaqItems.includes(item.question)}
								onclick={() => toggleAccordionItem(item.question)}
							>
								<span>{item.question}</span>
								<img src="/img/dropdown_pulsante.png" alt="" />
							</button>
							{#if openFaqItems.includes(item.question)}
								<div class="accordion-body" transition:fade={{ duration: 220 }}>
									<p>{item.answer}</p>
								</div>
							{/if}
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

			<nav class="bottom-actions" aria-label="Navigazione pagina">
				<a href={`/opzioni-menu/${data.page.slug}`} class="bottom-action primary" aria-label="Torna indietro">
					<img src="/img/Indietro_pulsante.png" alt="" class="bottom-action-icon back" />
				</a>
			</nav>
		</div>
	</section>
</main>

<style>
	.screen {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 10dvh;
		padding-inline: 0;
		box-sizing: border-box;
		background: linear-gradient(120deg, rgba(169, 0, 0, 1) 0%, rgba(113, 50, 87, 1) 50%, rgba(58, 100, 173, 1) 100%);
		touch-action: pan-y;
	}

	.totem-card {
		width: 94vw;
		height: min(80dvh, calc(94vw * 16 / 9));
		border-radius: 2.1cqw;
		padding: 0.95cqw;
		background: #5b7cbd;
		container-type: size;
	}

	.totem-inner {
		height: 100%;
		border-radius: 2.2cqw;
		background: #ffffff;
		padding: 1.25cqw;
		display: flex;
		flex-direction: column;
		min-height: 0;
		gap: 1.1cqh;
	}

	.totem-header {
		height: 11.2cqh;
		min-height: 5.6cqw;
		border-radius: 1.5cqw;
		background: #f6f6f6;
		display: grid;
		grid-template-columns: 7.8cqw 1fr 7.8cqw;
		align-items: center;
		padding: 0 1.1cqw;
		column-gap: 0.8cqw;
	}

	.header-spacer-right {
		width: 100%;
		height: 100%;
	}

	.icon-wrap {
		width: 7.8cqw;
		height: 7.8cqw;
		border-radius: 999px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background: #ffffff;
		box-shadow: 0 0.45cqw 0.9cqw rgba(0, 0, 0, 0.12);
	}

	.icon {
		width: 5.7cqw;
		height: 5.7cqw;
		max-width: 2.5rem;
		max-height: 2.5rem;
	}

	.logo {
		margin: 0 auto;
		width: 12.2cqw;
		height: 12.2cqw;
		max-width: 4.2rem;
		max-height: 4.2rem;
	}

	.title {
		margin-top: 0.4cqh;
		text-align: center;
		font-size: 7.2cqw;
		font-weight: 900;
		color: #111827;
		line-height: 1;
		animation: fade-up 260ms ease-out;
	}

	.content-shell {
		position: relative;
		flex: 1;
		min-height: 0;
	}

	.content-shell::before,
	.content-shell::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 2.5cqh;
		pointer-events: none;
		z-index: 2;
	}

	.content-shell::before {
		top: 0;
		border-radius: 1.45cqw 1.45cqw 0 0;
		background: linear-gradient(to bottom, rgba(212, 0, 0, 0.95), rgba(212, 0, 0, 0));
	}

	.content-shell::after {
		bottom: 0;
		border-radius: 0 0 1.45cqw 1.45cqw;
		background: linear-gradient(to top, rgba(212, 0, 0, 0.95), rgba(212, 0, 0, 0));
	}

	.content-panel {
		flex: 1;
		min-height: 0;
		height: 100%;
		border-radius: 1.45cqw;
		padding: 2.1cqw 1.9cqw;
		background: #d40000;
		display: flex;
		flex-direction: column;
		gap: 1.55cqh;
		overflow: auto;
		color: #fff;
		scrollbar-width: none;
		animation: fade-up 300ms ease-out;
	}

	.content-panel--map {
		padding: 1.25cqw 1.35cqw;
		gap: 0.85cqh;
		overflow: hidden;
	}

	.content-panel::-webkit-scrollbar {
		display: none;
	}

	.bottom-actions {
		display: flex;
		justify-content: center;
	}

	.bottom-action {
		width: 11cqw;
		height: 11cqw;
		min-width: 4.2rem;
		min-height: 4.2rem;
		padding: 0;
		border-radius: 999px;
		background: #eef2ff;
		color: #111827;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		box-shadow: 0 0.35cqw 0.9cqw rgba(0, 0, 0, 0.12);
	}

	.bottom-action.primary {
		background: #d40000;
		color: #fff;
	}

	.bottom-action-icon {
		width: 5.2cqw;
		height: 5.2cqw;
		filter: brightness(0) invert(1);
	}

	.bottom-action-icon.back {
		width: 6.1cqw;
		height: 6.1cqw;
	}

	.subtitle {
		margin: 0;
		text-align: center;
		font-size: 5.2cqw;
		font-weight: 900;
		line-height: 1.1;
	}

	.diagram-viewer {
		margin-top: 1cqh;
		flex: 1;
		min-height: 0;
		border-radius: 1.2cqw;
		background: transparent;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.5cqw;
		gap: 0.9cqh;
	}

	.diagram-canvas-wrap {
		width: 100%;
		height: 100%;
		max-height: 100%;
		max-width: 100%;
		overflow: hidden;
		border-radius: 1.1cqw;
		background: #fff;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
		padding: 0.45cqw;
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
		font-size: 2.4cqw;
		font-weight: 700;
		color: #611;
	}

	.diagram-open-link {
		text-decoration: none;
		padding: 1.3cqh 2.7cqw;
		border-radius: 999px;
		background: #f4f4f4;
		color: #111;
		font-size: 2.8cqw;
		font-weight: 800;
	}

	@media (orientation: landscape) and (min-width: 1100px) and (min-height: 650px) {
		.diagram-viewer {
			padding: 0.25rem;
		}
	}

	.accordion-item {
		border-radius: 1.2cqw;
		background: #fff;
		overflow: hidden;
		box-shadow: 0 0.35cqw 0.9cqw rgba(0, 0, 0, 0.12);
	}

	.map-page-card {
		border-radius: 1.2cqw;
		padding: 0.8cqh 0.9cqw;
		background: rgba(255, 255, 255, 0.14);
		box-shadow: 0 0.35cqw 0.9cqw rgba(0, 0, 0, 0.12);
	}

	.map-page-label {
		margin: 0 0 0.55cqh;
		font-size: 2.4cqw;
		font-weight: 800;
		text-align: center;
	}

	.map-page-wrap {
		border-radius: 1cqw;
		overflow: hidden;
		background: #fff;
		min-height: 235px;
		display: flex;
		justify-content: center;
	}

	:global(.map-page-wrap .socrata-visualization-embed) {
		display: block;
		width: 100%;
		min-height: 235px;
		color: transparent;
		font-size: 0;
	}

	:global(#socrata-flyout) {
		display: none !important;
	}

	.map-keyboard {
		border-radius: 1.2cqw;
		padding: 0.55cqh 0.65cqw;
		background: rgba(255, 255, 255, 0.16);
		box-shadow: 0 0.35cqw 0.9cqw rgba(0, 0, 0, 0.12);
	}

	.map-keyboard-top {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.45cqw;
		align-items: center;
		margin-bottom: 0.25cqh;
	}

	.map-keyboard-display {
		min-height: 3.5cqh;
		padding: 0.35cqh 0.65cqw;
		border-radius: 0.9cqw;
		background: #fff;
		color: #111;
		font-size: 1.95cqw;
		font-weight: 700;
		display: flex;
		align-items: center;
	}

	.map-keyboard-close,
	.map-key {
		border: 0;
		border-radius: 0.9cqw;
		background: #fff;
		color: #111;
		font-size: 2.6cqw;
		font-weight: 800;
	}

	.map-keyboard-close {
		min-height: 3.5cqh;
		padding: 0 0.7cqw;
	}

	.map-keyboard-row {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: 0.22cqw;
		margin-top: 0.22cqh;
	}

	.map-keyboard-row.is-nine {
		grid-template-columns: repeat(9, 1fr);
	}

	.map-keyboard-row.is-seven {
		grid-template-columns: repeat(7, 1fr);
	}

	.map-keyboard-row-wide {
		grid-template-columns: 1.1fr 1.25fr 2fr 1.1fr;
	}

	.map-key {
		min-height: 3.3cqh;
	}

	.map-key-action {
		background: #fee2e2;
	}

	.map-key-space {
		background: #dbeafe;
	}

	.map-key-enter {
		background: #dcfce7;
	}

	.dropdown-like {
		width: 100%;
		border: 0;
		background: #fff;
		min-height: 8.2cqh;
		padding: 1.8cqh 2.2cqw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #111;
		font-size: 3.55cqw;
		font-weight: 800;
		text-align: left;
		transition: background 180ms ease, opacity 180ms ease;
	}

	.dropdown-like img {
		width: 4.2cqw;
		height: 4.2cqw;
		transition: transform 220ms ease, opacity 220ms ease;
	}

	.is-open .dropdown-like img {
		transform: rotate(180deg);
		opacity: 0.85;
	}

	.accordion-body {
		padding: 0 2.2cqw 1.9cqh;
		color: #111;
		background: #fff;
	}

	.accordion-body p {
		margin: 0;
		font-size: 2.95cqw;
		line-height: 1.45;
		font-weight: 600;
	}

	.qr-placeholder {
		margin-top: 1cqh;
		height: min(34vh, 280px);
		border: 3px dashed #fff;
		border-radius: 1.4cqw;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 4.3cqw;
		font-weight: 900;
	}

	.store-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1cqw;
	}

	.store-btn {
		border: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		min-height: 8cqh;
		border-radius: 1.5cqw;
		font-size: 3.05cqw;
		font-weight: 800;
		text-decoration: none;
		background: #111;
		color: #fff;
		box-shadow: 0 0.45cqw 0.95cqw rgba(0, 0, 0, 0.22);
	}

	.filters-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.8cqw;
	}

	.search-box {
		min-height: 8cqh;
		background: #fff;
		border-radius: 999px;
		display: flex;
		align-items: center;
		padding: 0 1.9cqw 0 2.2cqw;
	}

	.search-box input {
		width: 100%;
		border: 0;
		outline: none;
		font-size: 3cqw;
		font-weight: 700;
	}

	.search-box img,
	.filter-btn img {
		width: 3.9cqw;
		height: 3.9cqw;
	}

	.filter-btn {
		min-height: 8cqh;
		border: 0;
		padding: 0 2.2cqw;
		border-radius: 999px;
		display: inline-flex;
		gap: 1.1cqw;
		align-items: center;
		font-size: 3cqw;
		font-weight: 800;
		color: #111;
		background: #fff;
		box-shadow: 0 0.45cqw 0.95cqw rgba(0, 0, 0, 0.18);
	}

	.materials-section h3 {
		margin: 0.2cqh 0 0.8cqh;
		font-size: 5cqw;
		font-weight: 900;
	}

	.thumb-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.9cqw;
	}

	.thumb-grid.single-row {
		grid-template-columns: 1fr;
	}

	.thumb {
		height: 11.5cqh;
		background: #d9d9d9;
		border-radius: 1.1cqw;
	}

	.thumb.wide {
		height: 13cqh;
	}

	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(12px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (orientation: landscape) {
		.totem-inner {
			padding: 0.9rem;
		}

		.title {
			font-size: clamp(2.2rem, 2.8vw, 3.2rem);
		}

		.subtitle {
			font-size: clamp(1.55rem, 2.25vw, 2.3rem);
		}

		.content-panel {
			padding: 1rem 0.95rem;
			gap: 0.9rem;
		}

		.content-panel--map {
			overflow: auto;
		}

		.dropdown-like {
			min-height: 3.9rem;
			font-size: clamp(1.08rem, 1.55vw, 1.35rem);
		}

		.map-page-label {
			font-size: clamp(1rem, 1.35vw, 1.15rem);
		}

		.map-page-wrap {
			min-height: 215px;
		}

		.map-keyboard-display,
		.map-keyboard-close,
		.map-key {
			font-size: clamp(0.85rem, 1vw, 0.95rem);
		}

		.accordion-body p,
		.search-box input,
		.filter-btn,
		.store-btn,
		.diagram-open-link {
			font-size: clamp(1rem, 1.35vw, 1.18rem);
		}

		.bottom-action {
			width: 3.55rem;
			height: 3.55rem;
			min-width: 3.55rem;
			min-height: 3.55rem;
		}

		.bottom-action-icon {
			width: 1.45rem;
			height: 1.45rem;
		}

		.bottom-action-icon.back {
			width: 1.85rem;
			height: 1.85rem;
		}
	}

	@media (max-width: 900px), (max-height: 700px) {
		.screen {
			align-items: flex-start;
			overflow-y: auto;
		}

		.totem-inner {
			padding: 0.8rem;
		}

		.totem-header {
			padding: 0 0.7rem;
			column-gap: 0.5rem;
		}

		.icon-wrap {
			width: 3.2rem;
			height: 3.2rem;
		}

		.icon {
			width: 2rem;
			height: 2rem;
		}

		.title {
			font-size: clamp(2rem, 5.2vw, 2.8rem);
		}

		.content-panel {
			padding: 1rem 0.85rem;
			gap: 0.9rem;
		}

		.content-panel--map {
			overflow: auto;
		}

		.subtitle {
			font-size: clamp(1.4rem, 4vw, 2rem);
		}

		.dropdown-like {
			min-height: 3.35rem;
			padding: 0.75rem 0.9rem;
			font-size: clamp(1rem, 2.8vw, 1.25rem);
		}

		.dropdown-like img {
			width: 1.15rem;
			height: 1.15rem;
		}

		.map-page-card {
			padding: 0.8rem;
		}

		.map-page-label {
			font-size: clamp(0.95rem, 2.5vw, 1.05rem);
		}

		.map-page-wrap {
			min-height: 180px;
		}

		.map-keyboard {
			padding: 0.5rem;
		}

		.map-keyboard-display,
		.map-keyboard-close,
		.map-key {
			font-size: clamp(0.78rem, 2vw, 0.88rem);
		}

		.accordion-body {
			padding: 0 0.9rem 0.85rem;
		}

		.accordion-body p {
			font-size: clamp(0.95rem, 2.4vw, 1.1rem);
		}

		.store-btn,
		.filter-btn,
		.search-box {
			min-height: 3.2rem;
		}

		.store-btn,
		.filter-btn,
		.search-box input {
			font-size: clamp(0.95rem, 2.5vw, 1.15rem);
		}

		.search-box {
			padding: 0 0.95rem 0 1rem;
		}

		.filter-btn {
			padding: 0 1rem;
			gap: 0.45rem;
		}

		.diagram-open-link {
			font-size: clamp(0.95rem, 2.6vw, 1.15rem);
			padding: 0.85rem 1.2rem;
		}

		.bottom-action {
			width: 3rem;
			height: 3rem;
			min-width: 3rem;
			min-height: 3rem;
		}

		.bottom-action-icon {
			width: 1.35rem;
			height: 1.35rem;
		}

		.bottom-action-icon.back {
			width: 1.65rem;
			height: 1.65rem;
		}
	}
</style>
