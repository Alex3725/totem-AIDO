<script lang="ts">
	import { goto } from '$app/navigation';
	import type { MenuOption } from '$lib/data/menu-options';

	let {
		option,
		previousOption,
		nextOption
	}: {
		option: MenuOption;
		previousOption: MenuOption;
		nextOption: MenuOption;
	} = $props();
</script>

<section
	class="relative mx-auto flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-orange-500 px-4 py-8"
>
	<div
		class="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-orange-200/30 blur-3xl"
	></div>

	<article class="relative z-10 w-full max-w-3xl rounded-3xl bg-white/95 p-6 shadow-2xl sm:p-8 lg:p-10">
		<header class="mb-6 text-center">
			<p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Menu AIDO</p>
			<h1 class="text-3xl font-black text-slate-900 sm:text-5xl">{option.title}</h1>
		</header>

		<p class="mx-auto mb-8 max-w-2xl text-center text-lg leading-relaxed text-slate-700 sm:text-xl">
			{option.description}
		</p>

		<div class="mb-8 flex justify-center">
			<button
				type="button"
				onclick={() => goto(option.examplePath)}
				class="inline-flex items-center rounded-full bg-red-700 px-7 py-4 text-lg font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
			>
				{option.ctaLabel}
			</button>
		</div>

		<footer class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
			<a
				href={`/opzioni-menu/${previousOption.slug}`}
				class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
				aria-label={`Vai a ${previousOption.title}`}
			>
				<span aria-hidden="true">←</span>
				<span>{previousOption.title}</span>
			</a>

			<div class="text-sm text-slate-500">Sorgente originale: {option.sourceFile}</div>

			<a
				href={`/opzioni-menu/${nextOption.slug}`}
				class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
				aria-label={`Vai a ${nextOption.title}`}
			>
				<span>{nextOption.title}</span>
				<span aria-hidden="true">→</span>
			</a>
		</footer>
	</article>
</section>
