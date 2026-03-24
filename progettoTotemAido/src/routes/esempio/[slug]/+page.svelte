<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="screen">
	<section class="totem-card">
	<section class="example-shell">
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
	</section>
</main>

<style>
	.screen {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		background: linear-gradient(120deg, rgba(169, 0, 0, 1) 0%, rgba(113, 50, 87, 1) 50%, rgba(58, 100, 173, 1) 100%);
	}

	.totem-card {
		width: min(94vw, calc(94dvh * 9 / 16));
		height: min(94dvh, calc(94vw * 16 / 9));
		border-radius: 2.2vmin;
		padding: 1vmin;
		background: #5b7cbd;
	}

	.example-shell {
		height: 100%;
		border-radius: 24px;
		background: rgb(255 255 255 / 0.95);
		padding: 1.5rem;
		overflow: auto;
	}

	@media (orientation: landscape) {
		.totem-card {
			width: min(88vw, calc(88dvh * 3 / 2));
			height: min(88dvh, calc(88vw * 2 / 3));
			border-radius: 4vmin;
			padding: 1.05vmin;
		}

		.example-shell {
			border-radius: 4vmin;
			padding: 2rem;
		}
	}
</style>
