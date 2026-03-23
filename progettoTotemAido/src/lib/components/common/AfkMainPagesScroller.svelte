<script lang="ts">
	import { onMount } from 'svelte';
	import { menuOptions } from '$lib/data/menu-options';
	import type { MenuOptionSlug } from '$lib/data/menu-options';

	let { initialSlug = 'faq' }: { initialSlug?: MenuOptionSlug | '' } = $props();

	let currentIndex = $state(0);
	let timer: ReturnType<typeof setInterval> | null = null;

	const rotationInterval = 6500;
	const rewindInterval = 620;

	function goNext() {
		currentIndex = (currentIndex + 1) % menuOptions.length;
	}

	function clearTimer() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	function startAutoScroll() {
		clearTimer();
		timer = setInterval(goNext, rotationInterval);
	}

	function rewindToFirstPage() {
		clearTimer();

		if (currentIndex <= 0) {
			startAutoScroll();
			return;
		}

		timer = setInterval(() => {
			if (currentIndex <= 0) {
				startAutoScroll();
				return;
			}
			currentIndex -= 1;
		}, rewindInterval);
	}

	onMount(() => {
		const startIndex = menuOptions.findIndex((option) => option.slug === initialSlug);
		currentIndex = startIndex >= 0 ? startIndex : 0;

		rewindToFirstPage();

		return () => {
			clearTimer();
		};
	});
</script>

<section class="screen">
	<section class="totem-card">
		<div class="totem-inner">
			<header class="totem-header">
				<div class="header-spacer"></div>
				<img src="/img/logoAIDO.png" alt="Logo AIDO" class="logo" />
				<div class="header-spacer"></div>
			</header>

			<h1 class="menu-title">Menu</h1>

			<div class="panel-stack">
				{#each menuOptions as option, index (option.slug)}
					<div class="option-panel {index === currentIndex ? 'is-visible' : 'is-hidden'}" aria-hidden={index !== currentIndex}>
						<h2>{option.title}</h2>
						<p>{option.description}</p>
						<div class="cta-button">{option.ctaLabel}</div>
					</div>
				{/each}

				<div class="dots-shell" aria-hidden="true">
					<div class="dots">
						{#each menuOptions as _, dotIndex}
							<span class={`dot ${dotIndex === currentIndex ? 'active' : ''}`}></span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
</section>

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
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(120deg, var(--bg-red-deep) 0%, var(--bg-violet-mid) 48%, var(--bg-blue-deep) 100%);
	}

	.totem-card {
		width: min(92vw, 1800px);
		height: min(92dvh, 1020px);
		border-radius: 4.5vmin;
		padding: 1.2vmin;
		background: var(--frame-blue);
	}

	.totem-inner {
		height: 100%;
		border-radius: 4vmin;
		border: 4px solid var(--frame-blue-border);
		background: #ffffff;
		padding: 1.6vmin;
		display: flex;
		flex-direction: column;
		position: relative;
		min-height: 0;
	}

	.totem-header {
		height: 11%;
		border-radius: 2.4vmin;
		background: var(--header-cream);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-spacer {
		width: 1.9rem;
	}

	.logo {
		width: 2.9rem;
		height: 2.9rem;
	}

	.menu-title {
		margin-top: 0.45rem;
		text-align: center;
		font-size: clamp(2.6rem, 4.8vw, 5rem);
		font-weight: 900;
		color: #111827;
		line-height: 1;
	}

	.panel-stack {
		position: relative;
		flex: 1;
		min-height: 0;
		margin-top: 0.55rem;
	}

	.option-panel {
		position: absolute;
		left: 2.2vmin;
		right: 2.2vmin;
		top: 0;
		bottom: 4.2vmin;
		border-radius: 2.2vmin 2.2vmin 0 0;
		padding: 1.4vmin 2.2vmin;
		background: var(--panel-red);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: #fff;
		transition: opacity 760ms cubic-bezier(0.22, 1, 0.36, 1), transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.is-visible {
		opacity: 1;
		transform: translateX(0);
	}

	.is-hidden {
		opacity: 0;
		transform: translateX(44px);
	}

	.option-panel h2 {
		font-size: clamp(2.2rem, 4.2vw, 4.8rem);
		line-height: 1.02;
		font-weight: 900;
		margin: 0.25rem 0 0;
	}

	.option-panel p {
		font-size: clamp(1.3rem, 2.2vw, 2.4rem);
		line-height: 1.36;
		font-weight: 700;
		max-width: 95%;
		margin: 0.95rem 0 0;
	}

	.cta-button {
		margin-top: auto;
		background: #fff;
		color: #121212;
		font-size: clamp(1.4rem, 2.2vw, 2.6rem);
		font-weight: 900;
		line-height: 1;
		padding: 0.9vmin 2.4vmin;
		border-radius: 12px;
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.45);
	}

	.dots-shell {
		position: absolute;
		left: 2.2vmin;
		right: 2.2vmin;
		bottom: 0;
		height: 4.2vmin;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border-radius: 0 0 2.2vmin 2.2vmin;
		background: var(--panel-red);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.22);
		z-index: 8;
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 0.32rem;
		padding: 0.16rem 0;
	}

	.dot {
		width: 0.58rem;
		height: 0.58rem;
		border-radius: 999px;
		background: #fff;
	}

	.dot.active {
		background: var(--active-dot);
	}
</style>