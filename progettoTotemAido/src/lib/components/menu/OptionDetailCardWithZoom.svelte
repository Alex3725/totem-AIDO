<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { MenuOption } from '$lib/data/menu-options';
	import ExampleContent from './ExampleContent.svelte';

	let {
		option,
		previousOption,
		nextOption
	}: {
		option: MenuOption;
		previousOption: MenuOption;
		nextOption: MenuOption;
	} = $props();

	let isExpanded = $state(false);

	function handleExpandClick() {
		isExpanded = true;
	}

	function handleCollapse() {
		isExpanded = false;
	}
</script>

<section class="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-purple-600 px-0 py-0">
	<div
		class="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5 blur-3xl"
	></div>

	{#if isExpanded}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-purple-600 px-4 py-8"
			transition:scale={{ duration: 400, easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }}
		>
			<ExampleContent {option} onClose={handleCollapse} {previousOption} {nextOption} />
		</div>
	{:else}
		<!-- Left Arrow -->
		<a
			href={`/opzioni-menu/${previousOption.slug}`}
			aria-label={`Vai a ${previousOption.title}`}
			class="absolute left-4 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition hover:bg-white hover:scale-110 sm:left-8"
		>
			<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
			</svg>
		</a>

		<!-- Main Card -->
		<article
			class="relative z-10 w-full max-w-2xl rounded-full bg-white p-8 shadow-2xl transition-transform duration-300 hover:scale-105 sm:mx-auto sm:p-12 lg:rounded-3xl"
		>
			<!-- Header with Logo -->
			<div class="mb-8 flex flex-col items-center">
				<div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-lg">
					<span class="text-lg font-black text-white">aido</span>
				</div>
				<h2 class="text-2xl font-black text-slate-900">MENÙ</h2>
			</div>

			<!-- Red Content Bubble -->
			<div class="mx-auto mb-6 w-11/12 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 px-6 py-12 text-center shadow-lg sm:px-8 sm:py-14">
				<h1 class="mb-4 text-3xl font-black text-white sm:text-4xl">{option.title}</h1>

				<p class="mb-8 text-lg leading-relaxed text-white/95 sm:text-xl">
					{option.description}
				</p>

				<button
					type="button"
					onclick={handleExpandClick}
					class="inline-flex rounded-full bg-white px-8 py-4 text-lg font-black text-red-700 transition hover:bg-red-50 active:scale-95 shadow-md"
				>
					{option.ctaLabel}
				</button>
			</div>

			<!-- Navigation Footer -->
			<div class="mt-8 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-600 sm:text-sm">
				<span>{previousOption.title}</span>
				<span class="font-semibold">Sorgente: {option.sourceFile}</span>
				<span>{nextOption.title}</span>
			</div>
		</article>

		<!-- Right Arrow -->
		<a
			href={`/opzioni-menu/${nextOption.slug}`}
			aria-label={`Vai a ${nextOption.title}`}
			class="absolute right-4 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition hover:bg-white hover:scale-110 sm:right-8"
		>
			<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	{/if}
</section>

<style>
	:global(body.no-scroll) {
		overflow: hidden;
	}
</style>
