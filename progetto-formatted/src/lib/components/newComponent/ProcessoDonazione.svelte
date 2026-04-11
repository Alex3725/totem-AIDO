<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Node = 'diagnosi' | 'scelta' | 'stop' | 'valutazione' | 'assegnazione' | 'familiari' | 'prelievo';
	type StepAction = { label: string; next: Node; className: string; };
	type Step = { icon?: string; title: string; description?: string; titleClass?: string; actions: StepAction[]; };

	let node = $state<Node>('diagnosi');

	const steps: Record<Node, Step> = {
		diagnosi: {
			icon: '🧠',
			title: 'Accertamento della morte',
			description: "La morte viene accertata da un'équipe medica indipendente, secondo criteri clinici e di legge, con controlli ripetuti e procedure rigorose per garantire certezza e trasparenza.",
			actions: [{ label: 'Prossimo step', next: 'scelta', className: 'w-full rounded-[1.05cqw] bg-red-600 px-[1.15cqw] py-[0.85cqh] text-[1.8cqh] font-semibold text-white transition active:scale-[0.98]' }]
		},
		scelta: {
			title: 'Volontà del paziente',
			description : "Si verifica se la persona ha espresso in vita la propria volontà di donare (tramite registrazione ufficiale). In assenza di una dichiarazione, vengono consultati i familiari per rispettare la scelta del defunto.",
			actions: [
				{ label: 'Donatore', next: 'valutazione', className: 'w-full rounded-[1.05cqw] bg-green-100 px-[1.15cqw] py-[0.85cqh] text-left text-[1.8cqh] font-semibold text-green-950 transition hover:bg-green-200' },
				{ label: 'Non donatore', next: 'stop', className: 'w-full rounded-[1.05cqw] bg-red-100 px-[1.15cqw] py-[0.85cqh] text-left text-[1.8cqh] font-semibold text-red-950 transition hover:bg-red-200' },
				{ label: 'Nessuna dichiarazione', next: 'familiari', className: 'w-full rounded-[1.05cqw] bg-zinc-100 px-[1.15cqw] py-[0.85cqh] text-left text-[1.8cqh] font-semibold text-zinc-900 transition hover:bg-zinc-200' }
			]
		},
		familiari: {
			icon: '⚖️',
			title: 'Familiari',
			description: 'Coniuge - Figli - Genitori',
			actions: [
				{ label: 'Autorizzano', next: 'valutazione', className: 'w-full rounded-[1.05cqw] bg-green-600 px-[1.15cqw] py-[0.85cqh] text-[1.8cqh] font-semibold text-white transition active:scale-[0.98]' },
				{ label: 'Rifiutano', next: 'stop', className: 'w-full rounded-[1.05cqw] bg-zinc-300 px-[1.15cqw] py-[0.85cqh] text-[1.8cqh] font-semibold text-zinc-950 transition active:scale-[0.98]' }
			]
		},
		valutazione : {
			icon: '🧐',
			title: "Valutazione dell'idoneità alla donazione",
			description : 'Medici specialisti valutano lo stato degli organi e dei tessuti per stabilire cosa può essere donato in sicurezza, nel rispetto del donatore e dei futuri riceventi.',
			titleClass: 'text-red-600',
			actions: [{ label: 'Continua', next: 'assegnazione', className: 'w-full rounded-[1.05cqw] bg-zinc-950 px-[1.15cqw] py-[0.85cqh] text-[1.8cqh] font-semibold text-white transition active:scale-[0.98]' }]
		},
		assegnazione : {
			icon: '📋',
			title: "Assegnazione degli organi",
			description : "Gli organi idonei vengono assegnati secondo criteri di compatibilità clinica e urgenza, tramite le liste d'attesa gestite dal sistema trapianti.",
			titleClass: 'text-red-600',
			actions: [{ label: 'Continua', next: 'prelievo', className: 'w-full rounded-[1.05cqw] bg-zinc-950 px-[1.15cqw] py-[0.85cqh] text-[1.8cqh] font-semibold text-white transition active:scale-[0.98]' }]
		},
		stop: {
			icon: '⛔',
			title: 'Processo interrotto!',
			description : 'Le volontà del defunto o della famiglia impediscono il continuo del percorso',
			titleClass: 'text-red-600',
			actions: [{ label: 'Ricomincia', next: 'diagnosi', className: 'w-full rounded-[1.05cqw] bg-zinc-950 px-[1.15cqw] py-[0.85cqh] text-[1.8cqh] font-semibold text-white transition active:scale-[0.98]' }]
		},
		prelievo: {
			icon: '❤️',
			title: 'Prelievo organi',
			description: 'Può salvare fino a 8 vite',
			titleClass: 'text-red-600',
			actions: [{ label: 'Ricomincia', next: 'diagnosi', className: 'w-full rounded-[1.05cqw] bg-zinc-950 px-[1.15cqw] py-[0.85cqh] text-[1.8cqh] font-semibold text-white transition active:scale-[0.98]' }]
		}
	};

	const setNode = (next: Node) => { node = next; };
</script>

<div class="flex h-full w-full items-center justify-center p-[0.8cqw]">
	<div class="flex h-[80%] w-[95%] max-w-[68cqw] flex-col items-center justify-center overflow-hidden rounded-[1.7cqw] border border-white/60 bg-white/85 p-[1.85cqw] text-center shadow-xl shadow-zinc-950/10 backdrop-blur-md">
		{#key node}
			{@const step = steps[node]}
			<section in:fly={{ y: 10, duration: 200, easing: cubicOut }} class="flex w-full flex-col items-center gap-[1.2cqh]">
				{#if step.icon}
					<div class="flex h-[5.4cqh] w-[5.4cqh] items-center justify-center rounded-full bg-red-50 text-[2.55cqh] ring-1 ring-red-100">
						{step.icon}
					</div>
				{/if}

				<div class="w-full space-y-[0.45cqh]">
					<h2 class={`text-[2.65cqh] font-bold leading-tight tracking-tight text-zinc-950 ${step.titleClass ?? ''}`}>
						{step.title}
					</h2>
					{#if step.description}
						<p class="text-[1.7cqh] leading-snug text-zinc-500">{step.description}</p>
					{/if}
				</div>

				<div class="w-full space-y-[0.95cqh]">
					{#each step.actions as action (action.label)}
						<button type="button" onclick={() => setNode(action.next)} class={action.className}>
							{action.label}
						</button>
					{/each}
				</div>
			</section>
		{/key}
	</div>
</div>