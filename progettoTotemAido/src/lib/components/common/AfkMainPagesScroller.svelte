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
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		background: linear-gradient(120deg, var(--bg-red-deep) 0%, var(--bg-violet-mid) 48%, var(--bg-blue-deep) 100%);
	}

	.totem-card {
		width: min(94vw, calc(94dvh * 9 / 16));
		height: min(94dvh, calc(94vw * 16 / 9));
		border-radius: 2.1cqw;
		padding: 0.95cqw;
		background: var(--frame-blue);
		container-type: size;
	}

	@media (orientation: landscape) {
		.totem-card {
			width: min(88vw, calc(88dvh * 3 / 2));
			height: min(88dvh, calc(88vw * 2 / 3));
			border-radius: 4vmin;
			padding: 1.05vmin;
		}
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
		padding: 2.2cqh 2.75cqw 2.35cqh;
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
		font-size: 7.1cqw;
		line-height: 1.02;
		font-weight: 900;
		margin: 0;
	}

	.option-panel p {
		font-size: 3.45cqw;
		line-height: 1.42;
		font-weight: 700;
		max-width: 90%;
		margin: 3cqh 0 0;
	}

	.cta-button {
		margin-top: auto;
		text-decoration: none;
		background: #fff;
		color: #121212;
		font-size: 4.7cqw;
		font-weight: 900;
		line-height: 1;
		padding: 1.6cqh 4.25cqw;
		border-radius: 1.2cqw;
		box-shadow: 0 0.55cqw 0.75cqw rgba(0, 0, 0, 0.45);
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
		padding: 0.35cqh 0;
		background: transparent;
		z-index: 8;
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 0.8cqw;
		padding: 0.48cqh 1.4cqw;
		border-radius: 999px;
		background: var(--panel-red);
		box-shadow: 0 0.35cqw 0.8cqw rgba(0, 0, 0, 0.22);
	}

	.dot {
		width: 1.45cqw;
		height: 1.45cqw;
		border-radius: 999px;
		background: #fff;
	}

	.dot.active {
		background: var(--active-dot);
	}

	@media (orientation: landscape) and (min-width: 1100px) and (min-height: 650px) {
		.totem-header {
			height: 11.2cqh;
			border-radius: 1.5cqw;
		}

		.menu-title {
			font-size: 7.2cqw;
		}

		.option-panel {
			bottom: 4.05cqh;
			border-radius: 1.45cqw 1.45cqw 0 0;
			padding: 2.2cqh 2.75cqw 2.35cqh;
		}

		.dots-shell {
			height: 4.05cqh;
			padding: 0.35cqh 0;
		}

		.dots {
			padding: 0.48cqh 1.4cqw;
		}

		.option-panel h2 {
			font-size: 7.1cqw;
		}

		.option-panel p {
			font-size: 3.45cqw;
		}

		.cta-button {
			font-size: 4.7cqw;
			padding: 1.6cqh 4.25cqw;
		}
	}
</style>