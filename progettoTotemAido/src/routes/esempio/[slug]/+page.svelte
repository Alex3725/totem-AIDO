<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-orange-500 px-4 py-8">
	<div
		class="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-orange-200/30 blur-3xl"
	></div>

	<section class="relative z-10 w-full max-w-3xl rounded-3xl bg-white/95 p-6 shadow-2xl sm:p-8 lg:p-10">
		<p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Pagina esempio</p>
		<h1 class="mb-4 text-3xl font-black text-slate-900 sm:text-5xl">{data.option.title}</h1>
		<p class="mb-8 text-lg leading-relaxed text-slate-700 sm:text-xl">
			Questa è la pagina esempio per <strong>{data.option.title}</strong>. Qui potrai trovare contenuti, video,
			informazioni e risorse specifiche per questo argomento.
		</p>

		<div class="mb-8 rounded-lg bg-slate-50 p-6">
			<p class="text-sm text-slate-600">
				<strong>Contenuto in preparazione:</strong> Questa pagina verrà integrata con documenti, carousel e materiali
				da prova-aido-2.
			</p>
		</div>

		<div class="flex flex-wrap items-center justify-center gap-3">
			<a
				href={`/opzioni-menu/${data.option.slug}`}
				class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
			>
				<span>←</span>
				Torna all'opzione
			</a>
			<a
				href="/"
				class="inline-flex rounded-full bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 active:scale-95"
			>
				Torna al menu principale
			</a>
		</div>
	</section>
</main>
