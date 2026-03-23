<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface CarouselPage {
		id: string;
		title: string;
		subtitle?: string;
		ctaLabel?: string;
		icon?: string;
		image?: string;
		content?: string;
		link?: string;
		action?: () => void | Promise<void>;
	}

	let { pages, autoRotate = false, rotationInterval = 10000, theme = 'default' }: {
		pages: CarouselPage[];
		autoRotate?: boolean;
		rotationInterval?: number;
		theme?: 'default' | 'idle';
	} = $props();

	const isIdleTheme = () => theme === 'idle';
	const transitionMs = 500;

	let currentIndex = $state(0);
	let touchStartX = $state(0);
	let touchEndX = $state(0);
	let isTransitioning = $state(false);
	let pendingIndex: number | null = $state(null);
	let autoRotateTimer: ReturnType<typeof setTimeout> | null = $state(null);

	function clearAutoRotateTimer() {
		if (autoRotateTimer) {
			clearTimeout(autoRotateTimer);
			autoRotateTimer = null;
		}
	}

	function scheduleAutoRotate() {
		if (!autoRotate || pages.length <= 1) return;
		clearAutoRotateTimer();
		autoRotateTimer = setTimeout(() => {
			nextPage();
		}, rotationInterval);
	}

	onMount(() => {
		scheduleAutoRotate();

		return () => {
			clearAutoRotateTimer();
		};
	});

	function goToPage(index: number) {
		if (index < 0 || index >= pages.length) return;
		if (index === currentIndex && !isTransitioning) return;

		if (isTransitioning) {
			pendingIndex = index;
			return;
		}

		pendingIndex = null;
		isTransitioning = true;
		currentIndex = index;
		clearAutoRotateTimer();

		setTimeout(() => {
			isTransitioning = false;
			if (pendingIndex !== null && pendingIndex !== currentIndex) {
				const targetIndex = pendingIndex;
				pendingIndex = null;
				goToPage(targetIndex);
				return;
			}
			scheduleAutoRotate();
		}, transitionMs);
	}

	function nextPage() {
		goToPage((currentIndex + 1) % pages.length);
	}

	function prevPage() {
		goToPage((currentIndex - 1 + pages.length) % pages.length);
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].clientX;
		handleSwipe();
	}

	function handleSwipe() {
		const swipeThreshold = 50;
		const diff = touchStartX - touchEndX;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				nextPage();
			} else {
				prevPage();
			}
		}
	}

	async function handlePageClick(page: CarouselPage) {
		if (page.action) {
			await page.action();
		} else if (page.link) {
			await goto(page.link);
		}
	}
</script>

<div
	class="relative h-full w-full overflow-hidden {isIdleTheme()
		? 'bg-gradient-to-br from-slate-500/60 via-slate-500/40 to-slate-400/30'
		: 'bg-gradient-to-br from-red-700 via-red-600 to-orange-500'}"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute -left-32 -top-24 h-72 w-72 rounded-full blur-3xl {isIdleTheme()
				? 'bg-white/20'
				: 'bg-orange-300/20'}"
		></div>
		<div
			class="absolute -right-24 top-20 h-80 w-80 rounded-full blur-3xl {isIdleTheme()
				? 'bg-slate-200/30'
				: 'bg-red-300/20'}"
		></div>
		<div
			class="absolute bottom-0 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full blur-3xl {isIdleTheme()
				? 'bg-slate-900/10'
				: 'bg-black/15'}"
		></div>
	</div>

	<div class="relative h-full w-full">
		{#each pages as page, index (page.id)}
			<div
				class="absolute inset-0 px-6 pb-24 pt-10 transition-all duration-500 sm:px-10 sm:pt-14 {index ===
				currentIndex
					? 'z-10 translate-y-0 opacity-100'
					: 'z-0 translate-y-4 opacity-0'}"
			>
				<div
					class="mx-auto flex h-full w-full max-w-5xl cursor-pointer items-center justify-center rounded-[2rem] border p-8 text-center shadow-2xl backdrop-blur-xl transition duration-300 hover:scale-[1.01] sm:p-12 {isIdleTheme()
						? 'border-slate-200/45 bg-white/45 text-slate-900 hover:bg-white/60'
						: 'border-white/20 bg-white/10 text-white hover:bg-white/15'}"
					onclick={() => handlePageClick(page)}
					role="button"
					tabindex="0"
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							handlePageClick(page);
						}
					}}
				>
					<p
						class="mb-5 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] {isIdleTheme()
							? 'border-slate-400/50 bg-slate-100/70 text-slate-700'
							: 'border-white/30 bg-black/15 text-white/90'}"
					>
						Menu AIDO
					</p>

					<h2 class="mb-4 text-4xl font-black leading-tight sm:text-6xl">{page.title}</h2>
					{#if page.subtitle}
						<p class="text-lg sm:text-2xl {isIdleTheme() ? 'text-slate-700' : 'text-white/90'}">{page.subtitle}</p>
					{/if}
					{#if page.content}
						<p
							class="mt-2 max-w-3xl text-base leading-relaxed sm:text-xl {isIdleTheme()
								? 'text-slate-700/90'
								: 'text-white/85'}"
						>
							{page.content}
						</p>
					{/if}

					{#if page.link || page.action}
						<div
							class="mt-8 rounded-full border px-8 py-3 text-base font-bold tracking-wide shadow-lg backdrop-blur-sm sm:text-lg {isIdleTheme()
								? 'border-slate-300/70 bg-white/70 text-slate-800'
								: 'border-white/35 bg-white/25 text-white'}"
						>
							{page.ctaLabel ?? 'Clicca per entrare'} ->
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if pages.length > 1}
		<button
			onclick={prevPage}
			class="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border p-3 shadow-lg backdrop-blur-md transition-all hover:scale-110 sm:left-6 sm:p-4 {isIdleTheme()
				? 'border-slate-300/70 bg-white/55 text-slate-700 hover:bg-white/75'
				: 'border-white/30 bg-black/20 text-white hover:bg-black/35'}"
			aria-label="Pagina precedente"
		>
			<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			onclick={nextPage}
			class="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border p-3 shadow-lg backdrop-blur-md transition-all hover:scale-110 sm:right-6 sm:p-4 {isIdleTheme()
				? 'border-slate-300/70 bg-white/55 text-slate-700 hover:bg-white/75'
				: 'border-white/30 bg-black/20 text-white hover:bg-black/35'}"
			aria-label="Pagina successiva"
		>
			<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

	{#if pages.length > 1}
		<div
			class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border px-3 py-2 backdrop-blur-md {isIdleTheme()
				? 'border-slate-300/70 bg-white/50'
				: 'border-white/25 bg-black/20'}"
		>
			{#each pages as _, index}
				<button
					onclick={() => goToPage(index)}
					class="h-2.5 rounded-full transition-all {index === currentIndex
						? isIdleTheme()
							? 'w-8 bg-slate-700'
							: 'w-8 bg-white'
						: isIdleTheme()
							? 'w-2.5 bg-slate-400 hover:bg-slate-500'
							: 'w-2.5 bg-white/50 hover:bg-white/75'}"
					aria-label={`Vai alla pagina ${index + 1}`}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	:global(.carousel-page) {
		user-select: none;
		-webkit-user-select: none;
		touch-action: pan-y;
	}
</style>
