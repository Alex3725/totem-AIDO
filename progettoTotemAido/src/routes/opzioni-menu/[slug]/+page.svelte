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

<main class="opzioni-menu-screen" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
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
	@import './page.css';
</style>
