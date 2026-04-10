<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Node =
		| 'diagnosi'
		| 'osservazione'
		| 'comunicazione'
		| 'scelta'
		| 'stop'
		| 'familiari'
		| 'prelievo';

	type StepAction = {
		label: string;
		next: Node;
		className: string;
	};

	type Step = {
		icon?: string;
		title: string;
		description?: string;
		titleClass?: string;
		actions: StepAction[];
	};

	let node = $state<Node>('diagnosi');

	const steps: Record<Node, Step> = {
		diagnosi: {
			icon: '🧠',
			title: 'Diagnosi di morte',
			description: 'Accertata con criteri neurologici',
			actions: [
				{
					label: 'Continua',
					next: 'osservazione',
					className:
						'w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98]'
				}
			]
		},
		osservazione: {
			icon: '⏱️',
			title: 'Osservazione',
			description: 'Periodo di conferma',
			actions: [
				{
					label: 'Avanti',
					next: 'comunicazione',
					className:
						'w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98]'
				}
			]
		},
		comunicazione: {
			icon: '👨‍👩‍👧',
			title: 'Comunicazione',
			description: 'Ai familiari',
			actions: [
				{
					label: 'Continua',
					next: 'scelta',
					className:
						'w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98]'
				}
			]
		},
		scelta: {
			title: 'Volonta del paziente',
			actions: [
				{
					label: 'Donatore',
					next: 'prelievo',
					className:
						'w-full rounded-2xl bg-green-100 px-4 py-4 text-left text-sm font-semibold text-green-950 transition hover:bg-green-200'
				},
				{
					label: 'Non donatore',
					next: 'stop',
					className:
						'w-full rounded-2xl bg-red-100 px-4 py-4 text-left text-sm font-semibold text-red-950 transition hover:bg-red-200'
				},
				{
					label: 'Nessuna dichiarazione',
					next: 'familiari',
					className:
						'w-full rounded-2xl bg-zinc-100 px-4 py-4 text-left text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200'
				}
			]
		},
		familiari: {
			icon: '⚖️',
			title: 'Familiari',
			description: 'Coniuge - Figli - Genitori',
			actions: [
				{
					label: 'Autorizzano',
					next: 'prelievo',
					className:
						'w-full rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98]'
				},
				{
					label: 'Rifiutano',
					next: 'stop',
					className:
						'w-full rounded-2xl bg-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-950 transition active:scale-[0.98]'
				}
			]
		},
		stop: {
			icon: '⛔',
			title: 'Processo interrotto',
			titleClass: 'text-red-600',
			actions: [
				{
					label: 'Ricomincia',
					next: 'diagnosi',
					className:
						'w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98]'
				}
			]
		},
		prelievo: {
			icon: '❤️',
			title: 'Prelievo organi',
			description: 'Puo salvare fino a 8 vite',
			titleClass: 'text-red-600',
			actions: [
				{
					label: 'Ricomincia',
					next: 'diagnosi',
					className:
						'w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.98]'
				}
			]
		}
	};

	const setNode = (next: Node) => {
		node = next;
	};

	const iconBadgeClass =
		'mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-4xl shadow-sm ring-1 ring-red-100';
</script>

<div class="flex min-h-dvh w-full items-center justify-center px-4 py-6">
	<div
		class="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-6 text-center shadow-xl shadow-zinc-950/10 backdrop-blur-md sm:p-7"
	>
		{#key node}
			{@const step = steps[node]}

			<section in:fly={{ y: 20, duration: 220, easing: cubicOut }} class="space-y-4">
				{#if step.icon}
					<div class={iconBadgeClass}>{step.icon}</div>
				{/if}

				<div class="space-y-2">
					<h2 class={`text-xl font-bold tracking-tight text-zinc-950 ${step.titleClass ?? ''}`}>
						{step.title}
					</h2>

					{#if step.description}
						<p class="text-sm leading-relaxed text-zinc-500">{step.description}</p>
					{/if}
				</div>

				<div class="space-y-3">
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
