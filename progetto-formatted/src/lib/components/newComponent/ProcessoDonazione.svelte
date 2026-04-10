<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Node = 'diagnosi' | 'osservazione' | 'comunicazione' | 'scelta' | 'stop' | 'familiari' | 'prelievo';
	type StepAction = { label: string; next: Node; className: string; };
	type Step = { icon?: string; title: string; description?: string; titleClass?: string; actions: StepAction[]; };

	let node = $state<Node>('diagnosi');

	const steps: Record<Node, Step> = {
		diagnosi: {
			icon: '🧠',
			title: 'Diagnosi di morte',
			description: 'Accertata con criteri neurologici',
			actions: [{ label: 'Continua', next: 'osservazione', className: 'w-full rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition active:scale-[0.98]' }]
		},
		osservazione: {
			icon: '⏱️',
			title: 'Osservazione',
			description: 'Periodo di conferma',
			actions: [{ label: 'Avanti', next: 'comunicazione', className: 'w-full rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition active:scale-[0.98]' }]
		},
		comunicazione: {
			icon: '👨‍👩‍👧',
			title: 'Comunicazione',
			description: 'Ai familiari',
			actions: [{ label: 'Continua', next: 'scelta', className: 'w-full rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition active:scale-[0.98]' }]
		},
		scelta: {
			title: 'Volontà del paziente',
			actions: [
				{ label: 'Donatore', next: 'prelievo', className: 'w-full rounded-xl bg-green-100 px-3 py-2 text-left text-xs font-semibold text-green-950 transition hover:bg-green-200' },
				{ label: 'Non donatore', next: 'stop', className: 'w-full rounded-xl bg-red-100 px-3 py-2 text-left text-xs font-semibold text-red-950 transition hover:bg-red-200' },
				{ label: 'Nessuna dichiarazione', next: 'familiari', className: 'w-full rounded-xl bg-zinc-100 px-3 py-2 text-left text-xs font-semibold text-zinc-900 transition hover:bg-zinc-200' }
			]
		},
		familiari: {
			icon: '⚖️',
			title: 'Familiari',
			description: 'Coniuge - Figli - Genitori',
			actions: [
				{ label: 'Autorizzano', next: 'prelievo', className: 'w-full rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white transition active:scale-[0.98]' },
				{ label: 'Rifiutano', next: 'stop', className: 'w-full rounded-xl bg-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-950 transition active:scale-[0.98]' }
			]
		},
		stop: {
			icon: '⛔',
			title: 'Processo interrotto',
			titleClass: 'text-red-600',
			actions: [{ label: 'Ricomincia', next: 'diagnosi', className: 'w-full rounded-xl bg-zinc-950 px-3 py-2 text-xs font-semibold text-white transition active:scale-[0.98]' }]
		},
		prelievo: {
			icon: '❤️',
			title: 'Prelievo organi',
			description: 'Può salvare fino a 8 vite',
			titleClass: 'text-red-600',
			actions: [{ label: 'Ricomincia', next: 'diagnosi', className: 'w-full rounded-xl bg-zinc-950 px-3 py-2 text-xs font-semibold text-white transition active:scale-[0.98]' }]
		}
	};

	const setNode = (next: Node) => { node = next; };
</script>

<div class="flex h-full w-full items-center justify-center p-2">
	<div class="flex h-1/2 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white/85 p-6 text-center shadow-xl shadow-zinc-950/10 backdrop-blur-md">
		{#key node}
			{@const step = steps[node]}
			<section in:fly={{ y: 10, duration: 200, easing: cubicOut }} class="flex flex-col items-center gap-3">
				{#if step.icon}
					<div class="flex size-10 items-center justify-center rounded-full bg-red-50 text-2xl ring-1 ring-red-100">
						{step.icon}
					</div>
				{/if}

				<div class="space-y-0.5">
					<h2 class={`text-sm font-bold tracking-tight text-zinc-950 ${step.titleClass ?? ''}`}>
						{step.title}
					</h2>
					{#if step.description}
						<p class="text-xs text-zinc-500">{step.description}</p>
					{/if}
				</div>

				<div class="w-full space-y-1.5">
					{#each step.actions as action}
						<button type="button" onclick={() => setNode(action.next)} class={action.className}>
							{action.label}
						</button>
					{/each}
				</div>
			</section>
		{/key}
	</div>
</div>