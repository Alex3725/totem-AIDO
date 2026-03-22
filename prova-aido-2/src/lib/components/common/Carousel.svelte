<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface CarouselPage {
		id: string;
		title: string;
		subtitle?: string;
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

	// Auto-rotation logic
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
	class="relative h-full w-full overflow-hidden bg-gradient-to-br from-red-500 to-red-700"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<!-- Carousel Container -->
	<div class="relative h-full w-full">
		{#each pages as page, index (page.id)}
			<div
				class="absolute inset-0 transition-opacity duration-300 {index === currentIndex
					? 'opacity-100 z-10'
					: 'opacity-0 z-0'}"
			>
				<div
					class="flex h-full w-full cursor-pointer flex-col items-center justify-center p-8 text-center text-white transition-transform duration-200 hover:scale-105"
					onclick={() => handlePageClick(page)}
					role="button"
					tabindex="0"
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							handlePageClick(page);
						}
					}}
				>
					{#if page.image}
						<img src={page.image} alt={page.title} class="mb-6 max-h-64 rounded-lg object-cover" />
					{:else if page.icon}
						<div class="mb-6 text-8xl">{page.icon}</div>
					{/if}

					<h2 class="mb-4 text-5xl font-bold">{page.title}</h2>
					{#if page.subtitle}
						<p class="text-2xl text-white/90">{page.subtitle}</p>
					{/if}
					{#if page.content}
						<p class="mt-4 text-xl text-white/80">{page.content}</p>
					{/if}

					{#if page.link || page.action}
						<div class="mt-8 rounded-full bg-white/20 px-8 py-4 text-xl font-semibold backdrop-blur-sm">
							Clicca per entrare →
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Navigation Arrows -->
	{#if pages.length > 1}
		<button
			onclick={prevPage}
			class="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
			aria-label="Pagina precedente"
		>
			<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			onclick={nextPage}
			class="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
			aria-label="Pagina successiva"
		>
			<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

	<!-- Page Indicators -->
	{#if pages.length > 1}
		<div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
			{#each pages as _, index}
				<button
					onclick={() => goToPage(index)}
					class="h-3 w-3 rounded-full transition-all {index === currentIndex
						? 'bg-white scale-125'
						: 'bg-white/50 hover:bg-white/75'}"
					aria-label={`Vai alla pagina ${index + 1}`}
				/>
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
