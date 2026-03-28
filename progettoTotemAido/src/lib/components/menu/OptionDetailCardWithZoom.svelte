<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { crossfade, fade, scale } from 'svelte/transition';
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

	const [send, receive] = crossfade({
		duration: (distance) => Math.min(700, Math.max(340, distance * 0.9)),
		easing: cubicOut,
		fallback(node, _params, intro) {
			return scale(node, {
				duration: intro ? 460 : 220,
				easing: cubicOut,
				start: intro ? 0.74 : 1
			});
		}
	});

	function handleExpandClick() {
		isExpanded = true;
	}

	function handleCollapse() {
		isExpanded = false;
	}
</script>

<section
	class="relative min-h-screen overflow-hidden bg-[linear-gradient(120deg,rgba(169,0,0,1)_0%,rgba(113,50,87,1)_50%,rgba(58,100,173,1)_100%)]"
>
	<div class="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
	<div class="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

	{#if isExpanded}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[linear-gradient(120deg,rgba(169,0,0,1)_0%,rgba(113,50,87,1)_50%,rgba(58,100,173,1)_100%)] px-4 py-8"
		>
			<div
				class="absolute inset-0 bg-black/20"
				in:fade={{ duration: 240 }}
				out:fade={{ duration: 160 }}
			></div>

			<div class="relative z-10 flex w-full justify-center" in:receive={{ key: `red-${option.slug}` }}>
				<ExampleContent {option} onClose={handleCollapse} {previousOption} {nextOption} />
			</div>
		</div>
	{:else}
		<div class="relative z-10 mx-auto mt-[5vh] h-[90vh] w-[90vw] max-w-[1800px] rounded-[clamp(2.5rem,10vw,11rem)] bg-white px-4 pb-6 pt-4 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:px-8 sm:pt-6">
			<img src="/img/logoAIDO.png" alt="Logo AIDO" class="mx-auto w-20 sm:w-24" />
			<h2 class="mt-2 text-lg font-black tracking-wide text-slate-900 sm:text-2xl">MENÙ</h2>

			<article
				class="mx-auto mt-2 flex h-[68vh] w-full max-w-[80vw] flex-col items-center justify-center rounded-[clamp(2rem,9vw,11rem)] bg-[#bb0101] px-6 text-white shadow-[0_24px_50px_rgba(0,0,0,0.45)] sm:px-10"
				out:send={{ key: `red-${option.slug}` }}
			>
				<h1 class="max-w-[14ch] text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">{option.title}</h1>
				<p class="mt-5 max-w-[70ch] text-base leading-relaxed text-white/95 sm:text-xl lg:text-2xl">
					{option.description}
				</p>

				<button
					type="button"
					onclick={handleExpandClick}
					class="mt-8 inline-flex min-w-[16rem] items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-black text-black shadow-[0_18px_30px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(0,0,0,0.45)] active:translate-y-0"
				>
					{option.ctaLabel}
				</button>
			</article>

		</div>

		<a
			href={`/opzioni-menu/${previousOption.slug}`}
			aria-label={`Vai a ${previousOption.title}`}
			class="absolute left-0 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(90deg,rgba(91,124,189,0)_0%,rgba(91,124,189,0.1)_1%,rgba(91,124,189,0.275)_25%,rgba(91,124,189,0.856)_50%,rgba(91,124,189,1)_100%)] transition hover:scale-110 sm:left-6 sm:h-16 sm:w-16"
		>
			<img src="/img/Freccia.png" alt="Freccia sinistra" class="h-8 w-8 -scale-x-100 sm:h-10 sm:w-10" />
		</a>

		<a
			href={`/opzioni-menu/${nextOption.slug}`}
			aria-label={`Vai a ${nextOption.title}`}
			class="absolute right-0 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(90deg,rgba(91,124,189,0)_0%,rgba(91,124,189,0.1)_1%,rgba(91,124,189,0.275)_25%,rgba(91,124,189,0.856)_50%,rgba(91,124,189,1)_100%)] transition hover:scale-110 sm:right-6 sm:h-16 sm:w-16"
		>
			<img src="/img/Freccia.png" alt="Freccia destra" class="h-8 w-8 sm:h-10 sm:w-10" />
		</a>
	{/if}
</section>

<style>
	:global(body.no-scroll) {
		overflow: hidden;
	}
</style>
