<script lang="ts">
	import MenuDots from '$lib/components/menu/MenuDots.svelte';
	import type { MenuOptionSlug } from '$lib/data/menu-options';

	type LayoutMode = 'primary' | 'child';

	let {
		title,
		mode = 'child',
		backHref = '/',
		onDotsNavigate,
		children
	}: {
		title: string;
		mode?: LayoutMode;
		backHref?: string;
		onDotsNavigate?: (event: Event, slug: MenuOptionSlug) => void | Promise<void>;
		children: import('svelte').Snippet;
	} = $props();
</script>

<main class="screen">
	<section class="totem-card">
		<div class="totem-inner">
			<header class="totem-header">
				<img src="/img/logo_marconi_nero.png" alt="Logo Marconi" class="logo partner" />
				<img src="/img/logoAIDO.png" alt="Logo AIDO" class="logo aido-logo" />
				<img src="/img/logo_papa_giovanni.png" alt="Logo Papa Giovanni" class="logo partner" />
			</header>

			<h1 class="title">{title}</h1>

			<div class={`content-area ${mode === 'primary' ? 'is-primary' : 'is-child'}`}>
				{@render children()}
				{#if mode === 'primary' && onDotsNavigate}
					<MenuDots onNavigate={onDotsNavigate} />
				{/if}
			</div>

			{#if mode === 'child'}
				<nav class="bottom-actions" aria-label="Navigazione pagina">
					<a href={backHref} class="bottom-action primary" aria-label="Torna indietro">
						<img src="/img/Indietro_pulsante.png" alt="" class="bottom-action-icon back" />
					</a>
				</nav>
			{/if}
		</div>
	</section>
</main>

<style>
	@import './totem-card-layout.css';
</style>
