<script lang="ts">
	import type { MenuOption } from '$lib/data/menu-options';

	let {
		option,
		onClose,
		previousOption,
		nextOption
	}: {
		option: MenuOption;
		onClose: () => void;
		previousOption: MenuOption;
		nextOption: MenuOption;
	} = $props();
</script>

<div class="relative z-50 w-full max-w-6xl rounded-3xl bg-white/95 p-6 shadow-2xl sm:p-8 lg:p-12">
	<header class="mb-6 text-center">
		<p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Contenuto Dettagliato</p>
		<h1 class="text-4xl font-black text-slate-900 sm:text-6xl">{option.title}</h1>
	</header>

	<div class="mx-auto max-w-4xl space-y-6">
		<p class="text-center text-xl leading-relaxed text-slate-700 sm:text-2xl">
			{option.description}
		</p>

		<div class="rounded-xl bg-gradient-to-br from-red-50 to-orange-50 p-8 text-center">
			<p class="text-base font-semibold text-red-800">
				📚 Pagina di contenuti dettagliati per <strong>{option.title}</strong>
			</p>
			<p class="mt-3 text-sm text-slate-600">
				Qui verranno integrati documenti, video, materiali e risorse da prova-aido-2
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-3">
			<div class="rounded-lg bg-slate-100 p-4 text-center">
				<span class="text-3xl">📄</span>
				<p class="mt-2 font-semibold text-slate-900">Documenti</p>
				<p class="text-xs text-slate-600">PDF e materiali</p>
			</div>
			<div class="rounded-lg bg-slate-100 p-4 text-center">
				<span class="text-3xl">🎥</span>
				<p class="mt-2 font-semibold text-slate-900">Video</p>
				<p class="text-xs text-slate-600">Tour e tutorial</p>
			</div>
			<div class="rounded-lg bg-slate-100 p-4 text-center">
				<span class="text-3xl">ℹ️</span>
				<p class="mt-2 font-semibold text-slate-900">Informazioni</p>
				<p class="text-xs text-slate-600">Dettagli completi</p>
			</div>
		</div>
	</div>

	<footer class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
		<a
			href={`/opzioni-menu/${previousOption.slug}`}
			class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
		>
			<span>←</span>
			<span>{previousOption.title}</span>
		</a>

		<button
			type="button"
			onclick={onClose}
			class="inline-flex rounded-full bg-red-700 px-6 py-2 font-semibold text-white transition hover:bg-red-800 active:scale-95"
		>
			Chiudi → Torna all'opzione
		</button>

		<a
			href={`/opzioni-menu/${nextOption.slug}`}
			class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
		>
			<span>{nextOption.title}</span>
			<span>→</span>
		</a>
	</footer>
</div>
