<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	type Node =
		| 'diagnosi'
		| 'osservazione'
		| 'comunicazione'
		| 'scelta'
		| 'stop'
		| 'familiari'
		| 'prelievo';

	let node: Node = 'diagnosi';

	const go = (n: Node) => {
		node = n;
		console.log('node:', node);
	};
</script>

<!-- SFONDO TRASPARENTE -->
<div class="w-full h-[100dvh] flex items-center justify-center">

	<!-- CARD -->
	<div
		class="w-[360px] max-w-[90vw] rounded-3xl p-6 text-center space-y-6
		bg-white/80 backdrop-blur-md shadow-xl relative overflow-hidden"
	>

		{#if node === 'diagnosi'}
			<div in:fly={{ y: 20, duration: 200, easing: cubicOut }} class="space-y-4">
				<div class="text-5xl">🧠</div>
				<h2 class="text-xl font-bold">Diagnosi di morte</h2>
				<p class="text-gray-500 text-sm">Accertata con criteri neurologici</p>

				<button
					on:click={() => go('osservazione')}
					class="w-full py-3 rounded-xl bg-red-600 text-white active:scale-95 transition"
				>
					Continua
				</button>
			</div>
		{/if}

		{#if node === 'osservazione'}
			<div in:fly={{ y: 20, duration: 200, easing: cubicOut }} class="space-y-4">
				<div class="text-5xl">⏱️</div>
				<h2 class="text-xl font-bold">Osservazione</h2>
				<p class="text-gray-500 text-sm">Periodo di conferma</p>

				<button
					on:click={() => go('comunicazione')}
					class="w-full py-3 rounded-xl bg-red-600 text-white active:scale-95 transition"
				>
					Avanti
				</button>
			</div>
		{/if}

		{#if node === 'comunicazione'}
			<div in:fly={{ y: 20, duration: 200, easing: cubicOut }} class="space-y-4">
				<div class="text-5xl">👨‍👩‍👧</div>
				<h2 class="text-xl font-bold">Comunicazione</h2>
				<p class="text-gray-500 text-sm">Ai familiari</p>

				<button
					on:click={() => go('scelta')}
					class="w-full py-3 rounded-xl bg-red-600 text-white active:scale-95 transition"
				>
					Continua
				</button>
			</div>
		{/if}

		{#if node === 'scelta'}
			<div in:fly={{ y: 20, duration: 200, easing: cubicOut }} class="space-y-3">
				<h2 class="text-xl font-bold">Volontà del paziente</h2>

				<button
					on:click={() => go('prelievo')}
					class="w-full p-4 rounded-xl bg-green-100 hover:bg-green-200 transition text-left"
				>
					✔ Donatore
				</button>

				<button
					on:click={() => go('stop')}
					class="w-full p-4 rounded-xl bg-red-100 hover:bg-red-200 transition text-left"
				>
					✖ Non donatore
				</button>

				<button
					on:click={() => go('familiari')}
					class="w-full p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-left"
				>
					? Nessuna dichiarazione
				</button>
			</div>
		{/if}

		{#if node === 'familiari'}
			<div in:fly={{ y: 20, duration: 200, easing: cubicOut }} class="space-y-4">
				<div class="text-5xl">⚖️</div>
				<h2 class="text-xl font-bold">Familiari</h2>

				<p class="text-sm text-gray-500">
					Coniuge • Figli • Genitori
				</p>

				<button
					on:click={() => go('prelievo')}
					class="w-full py-3 rounded-xl bg-green-500 text-white"
				>
					Autorizzano
				</button>

				<button
					on:click={() => go('stop')}
					class="w-full py-3 rounded-xl bg-gray-300"
				>
					Rifiutano
				</button>
			</div>
		{/if}

		{#if node === 'stop'}
			<div in:fly={{ y: 20, duration: 200, easing: cubicOut }} class="space-y-4">
				<div class="text-5xl">⛔</div>
				<h2 class="text-xl font-bold text-red-600">Processo interrotto</h2>

				<button
					on:click={() => go('diagnosi')}
					class="w-full py-3 rounded-xl bg-black text-white"
				>
					Ricomincia
				</button>
			</div>
		{/if}

		{#if node === 'prelievo'}
			<div in:fly={{ y: 20, duration: 200, easing: cubicOut }} class="space-y-4">
				<div class="text-5xl">❤️</div>
				<h2 class="text-xl font-bold text-red-600">Prelievo organi</h2>
				<p class="text-gray-500 text-sm">Può salvare fino a 8 vite</p>

				<button
					on:click={() => go('diagnosi')}
					class="w-full py-3 rounded-xl bg-black text-white"
				>
					Ricomincia
				</button>
			</div>
		{/if}

	</div>
</div>