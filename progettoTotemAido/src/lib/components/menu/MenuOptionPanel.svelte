<script lang="ts">
	import type { MenuOption } from '$lib/data/menu-options';
	import MenuOptionMedia from '$lib/components/menu/MenuOptionMedia.svelte';

	let {
		option,
		previousOption,
		nextOption,
		fixedPreviewItems,
		onNavigateWithDirection
	}: {
		option: MenuOption;
		previousOption: MenuOption;
		nextOption: MenuOption;
		fixedPreviewItems: Array<{ title: string; description: string }>;
		onNavigateWithDirection: (event: Event, direction: 'left' | 'right', href: string) => void | Promise<void>;
	} = $props();
</script>

<div class="option-panel">
	<h2>{option.title}</h2>
	<p>{option.description}</p>

	<MenuOptionMedia slug={option.slug} {fixedPreviewItems} />

	<a href={`/contenuti/${option.slug}`} class="cta-button">
		{option.slug === 'processo-scelta' ? 'Consulta la mappa ATS' : option.ctaLabel}
	</a>

	<a
		href={`/opzioni-menu/${previousOption.slug}`}
		class="nav-dot left"
		aria-label={`Vai a ${previousOption.title}`}
		onclick={(event) =>
			onNavigateWithDirection(event, 'right', `/opzioni-menu/${previousOption.slug}`)}
	>
		<img src="/img/Freccia.png" alt="Precedente" class="arrow-left" />
	</a>
	<a
		href={`/opzioni-menu/${nextOption.slug}`}
		class="nav-dot right"
		aria-label={`Vai a ${nextOption.title}`}
		onclick={(event) => onNavigateWithDirection(event, 'left', `/opzioni-menu/${nextOption.slug}`)}
	>
		<img src="/img/Freccia.png" alt="Successivo" class="arrow-right" />
	</a>
</div>
