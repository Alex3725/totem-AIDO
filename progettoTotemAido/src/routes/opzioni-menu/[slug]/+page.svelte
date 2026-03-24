<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { menuOptions } from '$lib/data/menu-options';
	import { consumeSwipeDirection, setSwipeDirection } from '$lib/stores/swipe-transition';

	let { data }: PageProps = $props();

	const introDirection = consumeSwipeDirection();
	const pageSlideDistance = 170;
	const pageSlideDuration = 380;
	let activeDot = $derived(Math.max(1, menuOptions.findIndex((option) => option.slug === data.option.slug) + 1));
	let touchStartX = $state(0);
	let touchStartY = $state(0);
	let shouldHandleSwipe = $state(true);

	const donorSignupWays = [
		{
			title: 'Con AIDO',
			description: "Iscriviti all'associazione e registra la tua scelta."
		},
		{
			title: "In Comune o ASL",
			description: "Esprimi la tua volonta nei punti abilitati del territorio."
		},
		{
			title: "Con l'app",
			description: "Premi il bottone Iscriviti subito! e usa il QR code per scarica l'app e iscriverti."
		}
	];
	const sceltaPreviewItems = [
		{
			title: 'Azienda Sanitaria Locale',
			description: 'Scopri qual e il riferimento sanitario piu vicino al tuo territorio.'
		},
		{
			title: 'Comune',
			description: 'Informati su dove puoi esprimere la tua scelta nel tuo Comune.'
		},
		{
			title: 'Iscrizione AIDO',
			description: "Confronta i diversi canali disponibili per registrare la tua volonta."
		}
	];
	const fixedPreviewItems = $derived.by(() => {
		if (data.option.slug === 'diventa-donatore') return donorSignupWays;
		if (data.option.slug === 'processo-scelta') return sceltaPreviewItems;
		return [];
	});

	function handleTouchStart(event: TouchEvent) {
		shouldHandleSwipe = true;
		touchStartX = event.touches[0].clientX;
		touchStartY = event.touches[0].clientY;
	}

	async function handleTouchEnd(event: TouchEvent) {
		if (!shouldHandleSwipe) {
			shouldHandleSwipe = true;
			return;
		}

		const endX = event.changedTouches[0].clientX;
		const endY = event.changedTouches[0].clientY;
		const deltaX = endX - touchStartX;
		const deltaY = endY - touchStartY;

		if (Math.abs(deltaX) < 70 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

		setSwipeDirection(deltaX < 0 ? 'left' : 'right');
		await goto(deltaX < 0 ? `/opzioni-menu/${data.nextOption.slug}` : `/opzioni-menu/${data.previousOption.slug}`);
	}

	async function navigateWithDirection(event: Event, direction: 'left' | 'right', href: string) {
		event.preventDefault();
		setSwipeDirection(direction);
		await goto(href);
	}

	async function navigateToOption(event: Event, slug: string) {
		event.preventDefault();
		const targetIndex = menuOptions.findIndex((option) => option.slug === slug);
		const currentIndex = menuOptions.findIndex((option) => option.slug === data.option.slug);

		if (targetIndex === -1 || targetIndex === currentIndex) return;

		setSwipeDirection(targetIndex > currentIndex ? 'left' : 'right');
		await goto(`/opzioni-menu/${slug}`);
	}

</script>

<main class="screen" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
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
				<div class="header-spacer"></div>
				<img src="/img/logoAIDO.png" alt="Logo AIDO" class="logo" />
				<div class="header-spacer"></div>
			</header>

			<h1 class="menu-title">Menu</h1>

			<div class="panel-stack">
				<div class="option-panel">
					<h2>{data.option.title}</h2>
					<p>{data.option.description}</p>
					{#if data.option.slug === 'faq'}
						<div class="faq-image-shell">
							<img
								src="/img/nomi_frequenti.png"
								alt="Esempio dei nomi piu frequenti"
								class="faq-image"
							/>
						</div>
					{:else if fixedPreviewItems.length > 0}
						<div class="preview-grid">
							{#each fixedPreviewItems as previewCard}
										<div class="preview-card">
											<h3>{previewCard.title}</h3>
											<p>{previewCard.description}</p>
										</div>
							{/each}
						</div>
					{/if}
					<a href={`/contenuti/${data.option.slug}`} class="cta-button">
						{data.option.slug === 'processo-scelta' ? 'Consulta la mappa ATS' : data.option.ctaLabel}
					</a>

					<a
						href={`/opzioni-menu/${data.previousOption.slug}`}
						class="nav-dot left"
						aria-label={`Vai a ${data.previousOption.title}`}
						onclick={(event) =>
							navigateWithDirection(event, 'right', `/opzioni-menu/${data.previousOption.slug}`)}
					>
						<img src="/img/Freccia.png" alt="Precedente" class="arrow-left" />
					</a>
					<a
						href={`/opzioni-menu/${data.nextOption.slug}`}
						class="nav-dot right"
						aria-label={`Vai a ${data.nextOption.title}`}
						onclick={(event) =>
							navigateWithDirection(event, 'left', `/opzioni-menu/${data.nextOption.slug}`)}
					>
						<img src="/img/Freccia.png" alt="Successivo" class="arrow-right" />
					</a>
				</div>

				<div class="dots-shell" aria-label="Navigazione carosello">
					<div class="dots">
						{#each menuOptions as option, index}
							<a
								href={`/opzioni-menu/${option.slug}`}
								class={`dot ${index + 1 === activeDot ? 'active' : ''}`}
								aria-label={`Vai a ${option.title}`}
								aria-current={index + 1 === activeDot ? 'page' : undefined}
								onclick={(event) => navigateToOption(event, option.slug)}
							></a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	:root {
		--bg-red-deep: #a90000;
		--bg-violet-mid: #713257;
		--bg-blue-deep: #3a64ad;
		--frame-blue: #5b7cbd;
		--frame-blue-border: #8db9ff;
		--inner-red: #b40101;
		--panel-red: #d40000;
		--header-cream: #f6f6f6;
		--active-dot: #2b7fff;
	}

	.screen {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 10dvh;
		padding-inline: 0;
		box-sizing: border-box;
		background: linear-gradient(120deg, var(--bg-red-deep) 0%, var(--bg-violet-mid) 48%, var(--bg-blue-deep) 100%);
		touch-action: pan-y;
	}

	.totem-card {
		width: 94vw;
		height: min(80dvh, calc(94vw * 16 / 9));
		border-radius: 2.1cqw;
		padding: 0.95cqw;
		background: var(--frame-blue);
		container-type: size;
	}

	.totem-inner {
		height: 100%;
		border-radius: 2.2cqw;
		border: max(2px, 0.35cqw) solid var(--frame-blue-border);
		background: #ffffff;
		padding: 1.25cqw;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.totem-header {
		height: 11.2cqh;
		min-height: 5.6cqw;
		border-radius: 1.5cqw;
		background: var(--header-cream);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-spacer {
		width: 2.2cqw;
	}

	.logo {
		width: 12.2cqw;
		height: 12.2cqw;
		max-width: 4.2rem;
		max-height: 4.2rem;
	}

	.menu-title {
		margin-top: 1.45cqh;
		text-align: center;
		font-size: 7.2cqw;
		font-weight: 900;
		color: #111827;
		line-height: 1;
		animation: fade-up 260ms ease-out;
	}

	.panel-stack {
		position: relative;
		margin-top: 1.25cqh;
		flex: 1;
		min-height: 0;
	}

	.option-panel {
		position: absolute;
		inset: 0;
		bottom: 4.05cqh;
		border-radius: 1.45cqw 1.45cqw 0 0;
		padding: 2.6cqh 3.2cqw 2.8cqh;
		background: var(--panel-red);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: #fff;
		animation: fade-slide-in 280ms ease-out;
		overflow: hidden;
	}

	.option-panel h2 {
		font-size: 7.1cqw;
		line-height: 1.02;
		font-weight: 900;
		margin: 0;
	}

	.option-panel p {
		font-size: 3.7cqw;
		line-height: 1.42;
		font-weight: 700;
		max-width: 90%;
		margin: 3cqh 0 0;
	}

	.preview-grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.7cqh;
		align-items: stretch;
		margin-top: 4.2cqh;
		margin-bottom: auto;
		max-width: 78%;
	}

	.faq-image-shell {
		width: min(100%, 62cqw);
		margin-top: 4.2cqh;
		margin-bottom: auto;
		padding: 1.2cqh 1.2cqw;
		border-radius: 2cqw;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
		border: 1px solid rgba(255, 255, 255, 0.26);
		box-shadow: 0 1cqw 1.8cqw rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.faq-image {
		display: block;
		width: 100%;
		max-height: 31cqh;
		object-fit: contain;
		border-radius: 1.4cqw;
	}

	.preview-card {
		width: 100%;
		min-height: 8.4cqh;
		padding: 1cqh 1.6cqw;
		border-radius: 1.8cqw;
		background: rgba(255, 255, 255, 0.14);
		border: 1px solid rgba(255, 255, 255, 0.28);
		box-shadow: 0 0.75cqw 1.2cqw rgba(0, 0, 0, 0.18);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		transition:
			background 220ms ease,
			box-shadow 220ms ease;
	}

	.preview-card h3 {
		margin: 0;
		font-size: 2.8cqw;
		font-weight: 900;
		line-height: 1.1;
		max-width: 100%;
	}

	.preview-card p {
		margin: 0.35cqh 0 0;
		max-width: 100%;
		font-size: 2.15cqw;
		line-height: 1.25;
		font-weight: 700;
	}

	.cta-button {
		margin-top: auto;
		text-decoration: none;
		background: #fff;
		color: #121212;
		min-height: 9cqh;
		min-width: 60%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 5.15cqw;
		font-weight: 900;
		line-height: 1;
		padding: 1.9cqh 4.8cqw;
		border-radius: 1.6cqw;
		box-shadow: 0 0.75cqw 1.1cqw rgba(0, 0, 0, 0.35);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			background 180ms ease;
	}

	.cta-button:hover,
	.cta-button:focus-visible {
		transform: translateY(-0.14rem) scale(1.015);
		box-shadow: 0 0.95cqw 1.3cqw rgba(0, 0, 0, 0.32);
	}

	.nav-dot {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 9cqw;
		height: 9cqw;
		border-radius: 999px;
		background: linear-gradient(90deg, rgba(91, 124, 189, 0) 0%, rgba(91, 124, 189, 0.1) 1%, rgba(91, 124, 189, 0.275) 25%, rgba(91, 124, 189, 0.856) 50%, rgba(91, 124, 189, 1) 100%);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		z-index: 20;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.28);
		transition: transform 160ms ease;
	}

	.nav-dot.left {
		background: linear-gradient(270deg, rgba(91, 124, 189, 0) 0%, rgba(91, 124, 189, 0.1) 1%, rgba(91, 124, 189, 0.275) 25%, rgba(91, 124, 189, 0.856) 50%, rgba(91, 124, 189, 1) 100%);
	}

	.nav-dot:hover {
		transform: translateY(-50%) scale(1.08);
	}

	.nav-dot.left {
		left: 0.5cqw;
	}

	.nav-dot.right {
		right: 0.5cqw;
	}

	.arrow-left,
	.arrow-right {
		width: 4.6cqw;
		height: 4.6cqw;
	}

	.arrow-left {
		transform: scaleX(-1);
	}

	.dots-shell {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 4.05cqh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border-radius: 0 0 1.45cqw 1.45cqw;
		background: var(--panel-red);
		box-shadow: 0 0.7cqw 1.2cqw rgba(0, 0, 0, 0.2);
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 0.8cqw;
		padding: 0;
	}

	.dot {
		display: inline-flex;
		width: 1.8cqw;
		height: 1.8cqw;
		border-radius: 999px;
		background: #fff;
		transition: opacity 180ms ease, transform 180ms ease, background 180ms ease;
		box-shadow: 0 0.18cqw 0.35cqw rgba(0, 0, 0, 0.15);
	}

	.dot.active {
		background: var(--active-dot);
		transform: scale(1.15);
		animation: dot-pulse 1.8s ease-in-out infinite;
	}

	.dot:hover,
	.dot:focus-visible {
		transform: scale(1.1);
	}

	@keyframes fade-slide-in {
		from {
			opacity: 0;
			transform: translateY(18px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
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

	@keyframes dot-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(43, 127, 255, 0.28);
		}

		60% {
			box-shadow: 0 0 0 0.55rem rgba(43, 127, 255, 0);
		}
	}

	@media (orientation: landscape) {
		.menu-title {
			font-size: clamp(2.2rem, 2.7vw, 3.2rem);
		}

		.option-panel {
			padding: 1.8rem 1.35rem 1.5rem;
		}

		.option-panel h2 {
			font-size: clamp(2.2rem, 3.2vw, 3.35rem);
		}

		.option-panel p {
			font-size: clamp(1.08rem, 1.55vw, 1.45rem);
			margin-top: 1.1rem;
		}

		.preview-grid {
			margin-top: 2rem;
			gap: 0.55rem;
			max-width: 76%;
		}

		.faq-image-shell {
			width: min(100%, 31rem);
			margin-top: 2rem;
			padding: 0.75rem;
			border-radius: 1.2rem;
		}

		.faq-image {
			max-height: 15.5rem;
			border-radius: 0.9rem;
		}

		.preview-card {
			min-height: 5.3rem;
			padding: 0.75rem 0.95rem;
		}

		.preview-card h3 {
			font-size: clamp(0.95rem, 1.3vw, 1.1rem);
		}

		.preview-card p {
			font-size: clamp(0.76rem, 0.95vw, 0.88rem);
			margin-top: 0.2rem;
		}

		.cta-button {
			min-height: 4rem;
			font-size: clamp(1.3rem, 2vw, 1.95rem);
			padding: 1rem 1.8rem;
		}

		.nav-dot {
			width: 4.2rem;
			height: 4.2rem;
		}

		.arrow-left,
		.arrow-right {
			width: 1.8rem;
			height: 1.8rem;
		}
	}

	@media (max-width: 900px), (max-height: 700px) {
		.totem-inner {
			padding: 0.8rem;
		}

		.option-panel {
			padding: 1.4rem 1rem 1.2rem;
		}

		.menu-title {
			font-size: clamp(2rem, 5.2vw, 2.8rem);
		}

		.option-panel h2 {
			font-size: clamp(1.9rem, 5vw, 2.8rem);
		}

		.option-panel p {
			font-size: clamp(1rem, 2.7vw, 1.3rem);
			margin-top: 1rem;
		}

		.preview-grid {
			margin-top: 1.5rem;
			gap: 0.42rem;
			max-width: 74%;
		}

		.faq-image-shell {
			width: min(100%, 82%);
			margin-top: 1.6rem;
			padding: 0.55rem;
			border-radius: 1rem;
		}

		.faq-image {
			max-height: 10.8rem;
			border-radius: 0.7rem;
		}

		.preview-card {
			min-height: 4.4rem;
			padding: 0.65rem 0.75rem;
			border-radius: 1rem;
		}

		.preview-card h3 {
			font-size: clamp(0.82rem, 2.2vw, 0.98rem);
		}

		.preview-card p {
			font-size: clamp(0.68rem, 1.8vw, 0.82rem);
			margin-top: 0.14rem;
		}

		.cta-button {
			min-height: 3.2rem;
			font-size: clamp(1.05rem, 3.1vw, 1.45rem);
			padding: 0.75rem 1.15rem;
		}

		.nav-dot {
			width: 3.2rem;
			height: 3.2rem;
		}

		.arrow-left,
		.arrow-right {
			width: 1.35rem;
			height: 1.35rem;
		}

		.dots-shell {
			height: 2.8rem;
		}

		.dots {
			gap: 0.45rem;
		}

		.dot {
			width: 0.72rem;
			height: 0.72rem;
		}
	}
</style>
