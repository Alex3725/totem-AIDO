<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { PageProps } from './$types';
	import { menuOptions, type MenuOptionSlug } from '$lib/data/menu-options';
	import MenuDots from '$lib/components/menu/MenuDots.svelte';
	import MenuOptionPanel from '$lib/components/menu/MenuOptionPanel.svelte';
	import { setMenuDotsSlug } from '$lib/stores/menu-dots.store';
	import { consumeSwipeDirection, setSwipeDirection } from '$lib/stores/swipe-transition';

	let { data }: PageProps = $props();

	const introDirection = consumeSwipeDirection();
	const pageSlideDistance = 190;
	const pageSlideDuration = 520;
	const wheelExitDuration = 420;
	let touchStartX = $state(0);
	let touchStartY = $state(0);
	let shouldHandleSwipe = $state(true);
	let exitDirection = $state<'left' | 'right' | 'none'>('none');
	let isLeaving = $state(false);

	$effect(() => {
		setMenuDotsSlug(data.option.slug as MenuOptionSlug);
	});

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
		if (isLeaving) return;
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

		await navigateWithWheel(
			deltaX < 0 ? 'left' : 'right',
			deltaX < 0 ? `/opzioni-menu/${data.nextOption.slug}` : `/opzioni-menu/${data.previousOption.slug}`
		);
	}

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function navigateWithWheel(direction: 'left' | 'right', href: string) {
		if (isLeaving) return;

		isLeaving = true;
		exitDirection = direction;

		try {
			if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				setSwipeDirection(direction);
				await goto(href);
				return;
			}

			await wait(wheelExitDuration);
			setSwipeDirection(direction);
			await goto(href);
		} finally {
			isLeaving = false;
			exitDirection = 'none';
		}
	}

	async function navigateWithDirection(event: Event, direction: 'left' | 'right', href: string) {
		event.preventDefault();
		await navigateWithWheel(direction, href);
	}

	async function navigateToOption(event: Event, slug: MenuOptionSlug) {
		event.preventDefault();
		const targetIndex = menuOptions.findIndex((option) => option.slug === slug);
		const currentIndex = menuOptions.findIndex((option) => option.slug === data.option.slug);

		if (targetIndex === -1 || targetIndex === currentIndex) return;

		await navigateWithWheel(targetIndex > currentIndex ? 'left' : 'right', `/opzioni-menu/${slug}`);
	}

</script>


<main class="opzioni-menu-screen">
	<section class="totem-card">
		<div class="totem-inner">
			<header class="totem-header">
				<img src="/img/logo_marconi_nero.jpg" alt="Logo Marconi" class="logo" />
				<img src="/img/logoAIDO.png" alt="Logo AIDO" class="logo" />
				<img src="/img/logo_papa_giovanni.png" alt="Logo Papa Giovanni" class="logo" />
			</header>

			<h1 class="menu-title">Menu</h1>

		<div class="panel-stack-wrap">
			{#key data.option.slug}
				<div
					class={`panel-stack ${isLeaving && exitDirection === 'left' ? 'is-leaving-left' : isLeaving && exitDirection === 'right' ? 'is-leaving-right' : ''}`}
					ontouchstart={handleTouchStart}
					ontouchend={handleTouchEnd}
					in:fly={{
						x: introDirection === 'left' ? pageSlideDistance : introDirection === 'right' ? -pageSlideDistance : 0,
						duration: pageSlideDuration,
						easing: cubicOut,
						opacity: 0.12
					}}
				>
				<MenuOptionPanel
					option={data.option}
					previousOption={data.previousOption}
					nextOption={data.nextOption}
					{fixedPreviewItems}
					onNavigateWithDirection={navigateWithDirection}
				/>

				</div>
			{/key}
			<MenuDots onNavigate={navigateToOption} />
		</div>
		</div>
	</section>
</main>

<style>
	@import './page.css';
</style>
