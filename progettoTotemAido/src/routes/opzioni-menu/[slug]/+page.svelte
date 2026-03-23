<script lang="ts">
	import type { PageProps } from './$types';
	import { menuOptions } from '$lib/data/menu-options';

	let { data }: PageProps = $props();

	const optionsCount = menuOptions.length;
	let activeDot = $derived(Math.max(1, menuOptions.findIndex((option) => option.slug === data.option.slug) + 1));
</script>

<main class="screen">
	<section class="totem-card">
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
					<a href={`/contenuti/${data.option.slug}`} class="cta-button">{data.option.ctaLabel}</a>

					<a href={`/opzioni-menu/${data.previousOption.slug}`} class="nav-dot left" aria-label={`Vai a ${data.previousOption.title}`}>
						<img src="/img/Freccia.png" alt="Precedente" class="arrow-left" />
					</a>
					<a href={`/opzioni-menu/${data.nextOption.slug}`} class="nav-dot right" aria-label={`Vai a ${data.nextOption.title}`}>
						<img src="/img/Freccia.png" alt="Successivo" class="arrow-right" />
					</a>
				</div>

				<div class="dots-shell" aria-hidden="true">
					<div class="dots">
						{#each Array.from({ length: optionsCount }, (_value, index) => index + 1) as dot}
							<span class={`dot ${dot === activeDot ? 'active' : ''}`}></span>
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
		padding: 0;
		background: linear-gradient(120deg, var(--bg-red-deep) 0%, var(--bg-violet-mid) 48%, var(--bg-blue-deep) 100%);
	}

	.totem-card {
		width: min(100vw, calc(100dvh * 9 / 16));
		height: min(100dvh, calc(100vw * 16 / 9));
		border-radius: 2.2vmin;
		padding: 1vmin;
		background: var(--frame-blue);
	}

	.totem-inner {
		height: 100%;
		border-radius: 24px;
		border: 4px solid var(--frame-blue-border);
		background: #ffffff;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
	}

	.totem-header {
		height: 3.9rem;
		border-radius: 16px;
		background: var(--header-cream);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-spacer {
		width: 1.9rem;
	}

	.logo {
		width: 2.85rem;
		height: 2.85rem;
	}

	.menu-title {
		margin-top: 0.45rem;
		text-align: center;
		font-size: 2.15rem;
		font-weight: 900;
		color: #111827;
		line-height: 1;
	}

	.panel-stack {
		position: relative;
		margin-top: 0.55rem;
		flex: 1;
		min-height: 0;
	}

	.option-panel {
		position: absolute;
		inset: 0;
		bottom: 2.1rem;
		border-radius: 12px 12px 0 0;
		padding: 0.9rem 0.9rem 1.05rem;
		background: var(--panel-red);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: #fff;
	}

	.option-panel h2 {
		font-size: clamp(1.8rem, 4.8vw, 2.45rem);
		line-height: 1.02;
		font-weight: 900;
		margin: 0.25rem 0 0;
	}

	.option-panel p {
		font-size: clamp(1.1rem, 2.6vw, 1.4rem);
		line-height: 1.36;
		font-weight: 700;
		max-width: 95%;
		margin: 0.95rem 0 0;
	}

	.cta-button {
		margin-top: auto;
		text-decoration: none;
		background: #fff;
		color: #121212;
		font-size: clamp(1.55rem, 4vw, 2rem);
		font-weight: 900;
		line-height: 1;
		padding: 0.78rem 1.35rem;
		border-radius: 12px;
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.45);
	}

	.nav-dot {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2.9rem;
		height: 2.9rem;
		border-radius: 999px;
		background: linear-gradient(90deg, rgba(91, 124, 189, 0) 0%, rgba(91, 124, 189, 0.1) 1%, rgba(91, 124, 189, 0.275) 25%, rgba(91, 124, 189, 0.856) 50%, rgba(91, 124, 189, 1) 100%);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		z-index: 20;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.28);
		transition: transform 160ms ease;
	}

	.nav-dot:hover {
		transform: translateY(-50%) scale(1.08);
	}

	.nav-dot.left {
		left: 0.2rem;
	}

	.nav-dot.right {
		right: 0.2rem;
	}

	.arrow-left,
	.arrow-right {
		width: 1.45rem;
		height: 1.45rem;
	}

	.arrow-left {
		transform: scaleX(-1);
	}

	.dots-shell {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2.1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border-radius: 0 0 12px 12px;
		background: var(--panel-red);
		box-shadow: 0 8px 14px rgba(0, 0, 0, 0.2);
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

	@media (orientation: landscape) and (min-width: 1100px) and (min-height: 650px) {
		.totem-card {
			width: 92vw;
			height: 92dvh;
			border-radius: 4.5vmin;
			padding: 1.2vmin;
		}

		.totem-inner {
			border-radius: 4vmin;
			padding: 1.6vmin;
		}

		.totem-header {
			height: 11%;
			border-radius: 2.4vmin;
		}

		.menu-title {
			font-size: clamp(2.6rem, 4.8vw, 5rem);
		}

		.option-panel {
			border-radius: 2.2vmin;
			padding: 1.4vmin 2.2vmin;
			bottom: 4.2vmin;
			border-radius: 2.2vmin 2.2vmin 0 0;
		}

		.dots-shell {
			height: 4.2vmin;
			border-radius: 0 0 2.2vmin 2.2vmin;
		}

		.option-panel h2 {
			font-size: clamp(2.2rem, 4.2vw, 4.8rem);
		}

		.option-panel p {
			font-size: clamp(1.3rem, 2.2vw, 2.4rem);
		}

		.cta-button {
			font-size: clamp(1.4rem, 2.2vw, 2.6rem);
			padding: 0.9vmin 2.4vmin;
		}
	}
</style>
