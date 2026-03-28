<script lang="ts">
	import { menuOptions, type MenuOptionSlug } from '$lib/data/menu-options';
	import { menuDotsSlug } from '$lib/stores/menu-dots.store';

	let {
		onNavigate
	}: {
		onNavigate: (event: Event, slug: MenuOptionSlug) => void | Promise<void>;
	} = $props();
</script>

<div class="dots-shell" aria-label="Navigazione carosello">
	<a href="/chat-assistenza" class="assist-dot" aria-label="Apri chat assistenza">
		<img src="/img/DONAtello_AI.png" alt="Chat assistenza" class="assist-dot-icon" />
	</a>
	<div class="dots">
		{#each menuOptions as option}
			<a
				href={`/opzioni-menu/${option.slug}`}
				class={`dot ${$menuDotsSlug === option.slug ? 'active' : ''}`}
				aria-label={`Vai a ${option.title}`}
				aria-current={$menuDotsSlug === option.slug ? 'page' : undefined}
				onclick={(event) => onNavigate(event, option.slug)}
			></a>
		{/each}
	</div>
</div>

<style>
	.dots-shell {
		--assist-size: clamp(1.95rem, 4.6cqh, 2.65rem);
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
		z-index: 24;
	}

	.assist-dot {
		position: absolute;
		right: 0.65cqw;
		top: 50%;
		transform: translateY(-50%);
		width: var(--assist-size);
		height: var(--assist-size);
		min-width: var(--assist-size);
		min-height: var(--assist-size);
		border-radius: 999px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		background: #5b7cbd;
		box-shadow: 0 0.2cqw 0.55cqw rgba(0, 0, 0, 0.25);
		transition: none;
		animation: none;
	}

	.assist-dot-icon {
		display: block;
		width: 78%;
		height: 78%;
		object-fit: contain;
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 0.8cqw;
		padding: 0.48cqh 1.4cqw;
		border-radius: 999px;
		background: var(--panel-red, #d40000);
		box-shadow: 0 0.35cqw 0.8cqw rgba(0, 0, 0, 0.22);
	}

	.dot {
		display: inline-flex;
		width: 1.8cqw;
		height: 1.8cqw;
		border-radius: 999px;
		background: #fff;
		transition: none;
		box-shadow: 0 0.18cqw 0.35cqw rgba(0, 0, 0, 0.15);
	}

	.dot.active {
		background: var(--active-dot, #2b7fff);
		transform: none;
	}

	@media (max-width: 900px), (max-height: 700px) {
		.dots-shell {
			height: 2.8rem;
			--assist-size: clamp(1.95rem, 4.6cqh, 2.65rem);
		}

		.assist-dot {
			right: 0.45rem;
		}

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
