<script lang="ts">
	import { onMount } from 'svelte';
	import type { MenuOption } from '$lib/data/menu-options';
	import MenuOptionMedia from '$lib/components/menu/MenuOptionMedia.svelte';

	let {
		option,
		previousOption,
		nextOption,
		fixedPreviewItems,
		onNavigateWithDirection
	}: {
		option: MenuOption;
		previousOption: MenuOption;
		nextOption: MenuOption;
		fixedPreviewItems: Array<{ title: string; description: string }>;
		onNavigateWithDirection: (event: Event, direction: 'left' | 'right', href: string) => void | Promise<void>;
	} = $props();

	const orbitItems = [
		{
			title: 'Donazione Organi',
			description: 'Scopri il percorso completo dalla scelta al trapianto.',
			tag: 'Percorso'
		},
		{
			title: 'Testimonianze',
			description: 'Voci reali di chi ha scelto di donare e ricevere.',
			tag: 'Storie'
		},
		{
			title: 'Come Iscriversi',
			description: "Tutti i passaggi rapidi per aderire all'AIDO.",
			tag: 'Guida'
		},
		{
			title: 'FAQ Rapide',
			description: 'Risposte immediate ai dubbi piu comuni.',
			tag: 'Supporto'
		},
		{
			title: 'Materiali PDF',
			description: 'Volantini informativi pronti da consultare.',
			tag: 'Documenti'
		},
		{
			title: 'Video Informativi',
			description: 'Approfondimenti visivi sul mondo della donazione.',
			tag: 'Media'
		}
	] as const;

	let orbitRoot = $state<HTMLDivElement | null>(null);
	let orbitActiveIndex = $state(0);
	let orbitRadius = $state(280);
	let orbitSmallRadius = $state(28);
	let orbitTouchStartX = $state(0);
	let orbitTouchStartY = $state(0);
	let orbitAutoplayTimer = $state<ReturnType<typeof setInterval> | null>(null);

	function orbitNormalizedDistance(index: number, centerIndex: number, total: number) {
		const raw = (index - centerIndex + total) % total;
		if (raw > total / 2) return raw - total;
		return raw;
	}

	function updateOrbitGeometry() {
		if (!orbitRoot) return;

		const width = orbitRoot.clientWidth;
		const height = orbitRoot.clientHeight;
		orbitRadius = Math.max(120, Math.min(260, width * 0.34));
		orbitSmallRadius = Math.max(12, Math.min(30, height * 0.1));
	}

	function renderOrbitCards() {
		if (!orbitRoot) return;

		const cards = Array.from(orbitRoot.querySelectorAll<HTMLElement>('.menu-orbit-card'));
		const total = cards.length;
		if (total === 0) return;

		cards.forEach((card, index) => {
			const relative = orbitNormalizedDistance(index, orbitActiveIndex, total);
			const visible = Math.abs(relative) <= 1;
			const angle = relative * 1.05;

			const x = Math.sin(angle) * orbitRadius;
			const y = Math.cos(angle) * orbitSmallRadius;
			const scale = relative === 0 ? 1.25 : 0.85;
			const z = relative === 0 ? 10 : 5;

			card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${visible ? scale : 0.64})`;
			card.style.zIndex = String(visible ? z : 1);
			card.style.opacity = visible ? '1' : '0';
			card.style.pointerEvents = visible ? 'auto' : 'none';
		});
	}

	function orbitGoTo(index: number) {
		const total = orbitItems.length;
		orbitActiveIndex = (index + total) % total;
		renderOrbitCards();
	}

	function orbitNext() {
		orbitGoTo(orbitActiveIndex + 1);
	}

	function orbitPrev() {
		orbitGoTo(orbitActiveIndex - 1);
	}

	function clearOrbitAutoplay() {
		if (!orbitAutoplayTimer) return;
		clearInterval(orbitAutoplayTimer);
		orbitAutoplayTimer = null;
	}

	function restartOrbitAutoplay() {
		clearOrbitAutoplay();
		orbitAutoplayTimer = setInterval(() => {
			orbitNext();
		}, 2600);
	}

	function handleOrbitTouchStart(event: TouchEvent) {
		event.stopPropagation();
		orbitTouchStartX = event.touches[0].clientX;
		orbitTouchStartY = event.touches[0].clientY;
	}

	function handleOrbitTouchEnd(event: TouchEvent) {
		event.stopPropagation();
		const endX = event.changedTouches[0].clientX;
		const endY = event.changedTouches[0].clientY;
		const deltaX = endX - orbitTouchStartX;
		const deltaY = endY - orbitTouchStartY;

		if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

		if (deltaX < 0) {
			orbitNext();
		} else {
			orbitPrev();
		}

		restartOrbitAutoplay();
	}

	onMount(() => {
		if (option.slug !== 'scopri') return;

		window.setTimeout(() => {
			updateOrbitGeometry();
			renderOrbitCards();
			restartOrbitAutoplay();
		}, 0);

		const onResize = () => {
			updateOrbitGeometry();
			renderOrbitCards();
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
			clearOrbitAutoplay();
		};
	});
</script>

<div class="option-panel">
	{#if option.slug === 'processo-donazione'}
		<img
			src="/img/processoDonazioneSigma.png"
			alt="Schema processo di donazione"
			class="process-donation-full-image"
		/>
	{:else}
		<h2>{option.title}</h2>
		<p>{option.description}</p>

		{#if option.slug === 'scopri'}
			<section id="orbit-carousel" class="menu-orbit-carousel" aria-roledescription="carousel" aria-label="Carousel orbitale AIDO">
				<div class="menu-orbit-stage" bind:this={orbitRoot} ontouchstart={handleOrbitTouchStart} ontouchend={handleOrbitTouchEnd}>
					<div class="menu-orbit-track">
						{#each orbitItems as item}
							<article class="menu-orbit-card">
								<span class="menu-orbit-tag">{item.tag}</span>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</article>
						{/each}
					</div>
				</div>

				<div class="menu-orbit-controls">
					<button
						type="button"
						class="menu-orbit-btn"
						aria-label="Card precedente"
						onclick={() => {
							orbitPrev();
							restartOrbitAutoplay();
						}}
					>
						‹
					</button>
					<button
						type="button"
						class="menu-orbit-btn"
						aria-label="Card successiva"
						onclick={() => {
							orbitNext();
							restartOrbitAutoplay();
						}}
					>
						›
					</button>
				</div>
			</section>
		{:else}
			<MenuOptionMedia slug={option.slug} {fixedPreviewItems} />
		{/if}

		<a href={`/contenuti/${option.slug}`} class="cta-button">
			{option.slug === 'processo-scelta' ? 'Consulta la mappa ATS' : option.ctaLabel}
		</a>
	{/if}

	<a
		href={`/opzioni-menu/${previousOption.slug}`}
		class="nav-dot left"
		aria-label={`Vai a ${previousOption.title}`}
		onclick={(event) =>
			onNavigateWithDirection(event, 'right', `/opzioni-menu/${previousOption.slug}`)}
	>
		<img src="/img/Freccia.png" alt="Precedente" class="arrow-left" />
	</a>
	<a
		href={`/opzioni-menu/${nextOption.slug}`}
		class="nav-dot right"
		aria-label={`Vai a ${nextOption.title}`}
		onclick={(event) => onNavigateWithDirection(event, 'left', `/opzioni-menu/${nextOption.slug}`)}
	>
		<img src="/img/Freccia.png" alt="Successivo" class="arrow-right" />
	</a>
</div>

<style>
	.menu-orbit-carousel {
		width: 100%;
		max-width: 100%;
		margin-top: 8.8cqh;
		margin-bottom: auto;
		padding: 0;
		background: transparent;
		border: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.menu-orbit-stage {
		position: relative;
		width: min(86%, 60cqw);
		height: 16.8cqh;
		margin-inline: auto;
		touch-action: pan-y;
	}

	.menu-orbit-track {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.menu-orbit-card {
		position: absolute;
		left: 50%;
		top: 50%;
		width: clamp(10.8rem, 21.5cqw, 15rem);
		min-height: 10.5cqh;
		padding: 1.05cqh 0.95cqw 0.95cqh;
		border-radius: 1.35cqw;
		background: #fff9f0;
		border: 1px solid rgba(233, 196, 143, 0.95);
		box-shadow: 0 0.62cqw 1.1cqw rgba(61, 42, 16, 0.18);
		transition: transform 0.6s ease, opacity 0.6s ease;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.menu-orbit-tag {
		display: inline-flex;
		padding: 0.2cqh 0.52cqw;
		border-radius: 999px;
		font-size: 1.5cqw;
		font-weight: 800;
		text-transform: uppercase;
		background: rgba(179, 76, 30, 0.14);
		color: #7a3214;
	}

	.menu-orbit-card h3 {
		margin: 0.42cqh 0 0.32cqh;
		font-size: 2.1cqw;
		line-height: 1.15;
		color: #3d2a10;
	}

	.menu-orbit-card p {
		margin: 0;
		font-size: 1.58cqw;
		line-height: 1.28;
		font-weight: 700;
		color: #5f4632;
		max-width: 100%;
	}

	.menu-orbit-controls {
		display: flex;
		justify-content: center;
		gap: 1cqw;
		margin-top: 0.7cqh;
	}

	.menu-orbit-btn {
		width: 4.2cqw;
		height: 4.2cqw;
		min-width: 1.9rem;
		min-height: 1.9rem;
		border-radius: 999px;
		border: 1px solid rgba(233, 196, 143, 0.95);
		background: #fff7eb;
		font-size: 2.5cqw;
		line-height: 1;
		color: #3d2a10;
		cursor: pointer;
	}

	.menu-orbit-btn:active {
		transform: scale(0.96);
	}
</style>
