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

	let { pages, autoRotate = false, rotationInterval = 10000 }: {
		pages: CarouselPage[];
		autoRotate?: boolean;
		rotationInterval?: number;
	} = $props();

	let currentIndex = $state(0);
	let isTransitioning = $state(false);
	let touchStartX = $state(0);
	let touchEndX = $state(0);
	let autoRotateTimer: ReturnType<typeof setInterval> | null = $state(null);

	onMount(() => {
		if (autoRotate && pages.length > 1) {
			autoRotateTimer = setInterval(() => {
				nextPage();
			}, rotationInterval);
		}

		return () => {
			if (autoRotateTimer) {
				clearInterval(autoRotateTimer);
			}
		};
	});

	function goToPage(index: number) {
		if (index === currentIndex || isTransitioning) return;
		if (index < 0 || index >= pages.length) return;

		isTransitioning = true;
		currentIndex = index;

		setTimeout(() => {
			isTransitioning = false;
		}, 300);
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
	class="relative h-full w-full overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-orange-500"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<div class="pointer-events-none absolute inset-0">
		<div class="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>
		<div class="absolute -right-24 top-20 h-80 w-80 rounded-full bg-red-300/20 blur-3xl"></div>
		<div class="absolute bottom-0 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-black/15 blur-3xl"></div>
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
					class="mx-auto flex h-full w-full max-w-5xl cursor-pointer items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 p-8 text-center text-white shadow-2xl backdrop-blur-xl transition duration-300 hover:scale-[1.01] hover:bg-white/15 sm:p-12"
					onclick={() => handlePageClick(page)}
					role="button"
					tabindex="0"
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							handlePageClick(page);
						}
					}}
				>
					<p class="mb-5 inline-flex rounded-full border border-white/30 bg-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
						Menu AIDO
					</p>

					<h2 class="mb-4 text-4xl font-black leading-tight sm:text-6xl">{page.title}</h2>
					{#if page.subtitle}
						<p class="text-lg text-white/90 sm:text-2xl">{page.subtitle}</p>
					{/if}
					{#if page.content}
						<p class="mt-2 max-w-3xl text-base leading-relaxed text-white/85 sm:text-xl">{page.content}</p>
					{/if}

					{#if page.link || page.action}
						<div class="mt-8 rounded-full border border-white/35 bg-white/25 px-8 py-3 text-base font-bold tracking-wide text-white shadow-lg backdrop-blur-sm sm:text-lg">
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
			class="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-3 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-black/35 sm:left-6 sm:p-4"
			aria-label="Pagina precedente"
		>
			<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			onclick={nextPage}
			class="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-3 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-black/35 sm:right-6 sm:p-4"
			aria-label="Pagina successiva"
		>
			<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

	{#if pages.length > 1}
		<div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-white/25 bg-black/20 px-3 py-2 backdrop-blur-md">
			{#each pages as _, index}
				<button
					onclick={() => goToPage(index)}
					class="h-2.5 rounded-full transition-all {index === currentIndex
						? 'w-8 bg-white'
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
