<script lang="ts">
	import { menuOptions, type MenuOptionSlug } from '$lib/data/menu-options';
	import { menuDotsSlug } from '$lib/stores/menu-dots.store';

	let {
		onNavigate = () => {}
	}: {
		onNavigate?: (event: Event, slug: MenuOptionSlug) => void | Promise<void>;
	} = $props();
</script>

<div class="dots" aria-label="Navigazione carosello">
	{#each menuOptions as option}
		<a
			href={`/opzioni-menu/${option.slug}`}
			class="dot {$menuDotsSlug === option.slug ? 'active' : ''}"
			aria-label={`Vai a ${option.title}`}
			aria-current={$menuDotsSlug === option.slug ? 'page' : undefined}
			onclick={(event) => onNavigate(event, option.slug)}
		></a>
	{/each}
</div>

<style>
	.dots {
		display: flex;
		justify-content: center;
		gap: 0.8cqw;
		padding: 0.48cqh 1.4cqw;
		border-radius: 999px;
		background: #d40000;
		box-shadow: 0 0.35cqw 0.8cqw rgba(0, 0, 0, 0.22);
	}

	.dot {
		display: inline-flex;
		width: 1.8cqw;
		height: 1.8cqw;
		min-width: 0.55rem;
		min-height: 0.55rem;
		border-radius: 999px;
		background: #fff;
		box-shadow: 0 0.18cqw 0.35cqw rgba(0, 0, 0, 0.15);
		transition: background 180ms ease, transform 180ms ease;
	}

	.dot.active {
		background: #2b7fff;
		transform: scale(1.15);
		animation: dot-pulse 1.8s ease-in-out infinite;
	}

	.dot:hover,
	.dot:focus-visible {
		transform: scale(1.1);
	}

	@keyframes dot-pulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(43, 127, 255, 0.28); }
		60%       { box-shadow: 0 0 0 0.55rem rgba(43, 127, 255, 0); }
	}

	@media (max-width: 900px), (max-height: 700px) {
		.dots {
			gap: 0.45rem;
			padding: 0.3rem 0.7rem;
		}
		.dot {
			width: 0.72rem;
			height: 0.72rem;
		}
	}
</style>