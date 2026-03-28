<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import type { PageProps } from './$types';
	import TotemCardLayout from '$lib/components/common/TotemCardLayout.svelte';

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
				'Puoi iscriverti ad AIDO online tramite il sito aido.it o tramite l\'app DigitalAIDO. In alternativa, puoi stampare il modulo cartaceo dal sito, compilarlo, firmarlo e spedirlo alla sede AIDO più vicina.'
		},
		{
			question: 'Posso cambiare idea?',
			answer:
				'Sì, puoi revocare la tua iscrizione e il consenso alla donazione in qualsiasi momento. Basta scaricare il modulo di revoca dal sito, compilarlo e inviarlo tramite raccomandata A/R o PEC alla sede AIDO Nazionale.'
		},
		{
			question: 'Dove trovo piu informazioni?',
			answer:
				'Trovi tutte le informazioni necessarie sul sito aido.it o nella sede ASL vicina a te.'
		},
		{
			question: 'Serve un documento?',
			answer:
				'Sì: per l\'iscrizione digitale è necessario lo SPID o la Carta d\'Identità Elettronica (CIE). Per l\'iscrizione cartacea, invece, è sufficiente allegare una copia del proprio documento d\'identità al modulo firmato.'
		}
	];
	let diagramCanvas = $state<HTMLCanvasElement | null>(null);
	let diagramContainer = $state<HTMLDivElement | null>(null);
	let diagramLoadError = $state('');
	let openFaqItems = $state<string[]>([]);
	let socrataHost = $state<HTMLDivElement | null>(null);
	let showMapKeyboard = $state(false);
	let mapSearchValue = $state('');
	let activeMapInput = $state<HTMLInputElement | null>(null);
	let mapKeyboardEnabled = $state(true);
	let flyerPreviews = $state<Record<string, string>>({});

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

	async function renderFlyerFirstPages() {
		if (data.page.slug !== 'scopri') return;

		try {
			const pdfjsLib = await import('pdfjs-dist');
			pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
				'pdfjs-dist/build/pdf.worker.min.mjs',
				import.meta.url
			).toString();

			const entries = await Promise.all(
				pdfItems.slice(0, 3).map(async (item) => {
					const pdf = await pdfjsLib.getDocument(item.href).promise;
					const page = await pdf.getPage(1);
					const baseViewport = page.getViewport({ scale: 1 });
					const targetWidth = 280;
					const scale = Math.max(0.35, targetWidth / baseViewport.width);
					const viewport = page.getViewport({ scale });

					const canvas = document.createElement('canvas');
					const context = canvas.getContext('2d');
					if (!context) return [item.href, ''] as const;

					const dpr = window.devicePixelRatio || 1;
					canvas.width = Math.floor(viewport.width * dpr);
					canvas.height = Math.floor(viewport.height * dpr);
					context.setTransform(dpr, 0, 0, dpr, 0, 0);

					await page.render({ canvas, canvasContext: context, viewport }).promise;
					return [item.href, canvas.toDataURL('image/png')] as const;
				})
			);

			const nextPreviews: Record<string, string> = {};
			for (const [href, preview] of entries) {
				if (preview) nextPreviews[href] = preview;
			}
			flyerPreviews = nextPreviews;
		} catch (error) {
			flyerPreviews = {};
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

		if (data.page.slug === 'scopri') {
			void renderFlyerFirstPages();
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

	function toggleAccordionItem(item: string) {
		openFaqItems = openFaqItems.includes(item) ? [] : [item];
	}
</script>

<TotemCardLayout title={data.page.title} mode="child" backHref={`/opzioni-menu/${data.page.slug}`}>

			{#key data.page.slug}
				<div
					class="content-shell"
					
				>
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
						<div class="qr-main-shell">
							<div class="qr-main-frame">
								<img src="/img/DigitalAido.png" alt="QR code per iscrizione AIDO" class="qr-main-image" />
							</div>
						</div>
						<div class="store-row">
							<a href="/contenuti/diventa-donatore/play-store" class="store-btn" aria-label="Google Play">
								<img src="/img/GooglePlayButton.png" alt="Get it on Google Play" class="store-badge" />
							</a>
							<a href="/contenuti/diventa-donatore/apple-store" class="store-btn" aria-label="App Store">
								<img src="/img/AppStoreButton.png" alt="Download on the App Store" class="store-badge" />
							</a>
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
									<div class="accordion-body" transition:slide={{ duration: 260, easing: cubicInOut }}>
										<p>{item.answer}</p>
									</div>
								{/if}
							</div>
						{/each}
					{:else if data.page.slug === 'scopri'}
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
									<a href={item.href} target="_blank" rel="noreferrer" class="thumb" aria-label={item.label}>
										{#if flyerPreviews[item.href]}
											<img src={flyerPreviews[item.href]} alt="Anteprima prima pagina PDF" class="thumb-preview" />
										{:else}
											<span class="thumb-loading">Caricamento...</span>
										{/if}
									</a>
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
					{:else}
						<h2 class="subtitle">{data.page.title}</h2>
						<p class="diagram-error">Contenuto in aggiornamento.</p>
					{/if}
				</section>
			</div>
			{/key}

</TotemCardLayout>

<style>
	@import './page.css';
</style>
