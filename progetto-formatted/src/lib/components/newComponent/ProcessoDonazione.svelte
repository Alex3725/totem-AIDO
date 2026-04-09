<script lang="ts">
	type Step = 1 | 2 | 3 | 4 | 5 | 6;
	type VolontaType = 'si' | 'no' | 'nessuna' | null;

	let step = $state<Step>(1);
	let volonta = $state<VolontaType>(null);

	const next = () => step < 6 && step++;

	const scegli = (v: VolontaType) => {
		volonta = v;

		if (v === 'no') step = 5;
		else if (v === 'si') step = 6;
		else step = 5;
	};

	const reset = () => {
		step = 1;
		volonta = null;
	};
</script>

<div class="h-screen w-full bg-red-600 flex items-center justify-center p-4 overflow-hidden">

	<div class="w-full max-w-3xl h-full bg-white rounded-3xl shadow-2xl flex flex-col justify-center p-6">

		<!-- STEP INDICATOR -->
		<div class="flex justify-center mb-6 gap-2">
			{#each [1,2,3,4,5,6] as s}
				<div class={`h-2 w-6 rounded-full transition-all ${
					step >= s ? 'bg-red-600' : 'bg-gray-200'
				}`}></div>
			{/each}
		</div>

		<!-- STEP 1 -->
		{#if step === 1}
			<div class="text-center space-y-6 animate-fade">
				<h2 class="text-2xl font-bold">Diagnosi di morte</h2>
				<p class="text-gray-500">Accertata con criteri neurologici</p>

				<button on:click={next}
					class="w-full py-4 bg-red-600 text-white rounded-xl font-semibold active:scale-95 transition">
					Continua
				</button>
			</div>
		{/if}

		<!-- STEP 2 -->
		{#if step === 2}
			<div class="text-center space-y-6">
				<h2 class="text-2xl font-bold">Periodo di osservazione</h2>
				<p class="text-gray-500">Conferma definitiva</p>

				<button on:click={next}
					class="w-full py-4 bg-red-600 text-white rounded-xl font-semibold active:scale-95 transition">
					Continua
				</button>
			</div>
		{/if}

		<!-- STEP 3 -->
		{#if step === 3}
			<div class="text-center space-y-6">
				<h2 class="text-2xl font-bold">Comunicazione</h2>
				<p class="text-gray-500">Ai familiari</p>

				<button on:click={next}
					class="w-full py-4 bg-red-600 text-white rounded-xl font-semibold active:scale-95 transition">
					Continua
				</button>
			</div>
		{/if}

		<!-- STEP 4 -->
		{#if step === 4}
			<div class="space-y-4">
				<h2 class="text-xl font-bold text-center">Volontà del defunto</h2>

				<button on:click={() => scegli('si')}
					class="w-full p-5 rounded-xl border-2 border-green-500 bg-green-50 text-left active:scale-95 transition">
					✔ È donatore
				</button>

				<button on:click={() => scegli('no')}
					class="w-full p-5 rounded-xl border-2 border-red-600 bg-red-50 text-left active:scale-95 transition">
					✖ Non è donatore
				</button>

				<button on:click={() => scegli('nessuna')}
					class="w-full p-5 rounded-xl border-2 border-gray-400 bg-gray-100 text-left active:scale-95 transition">
					? Nessuna dichiarazione
				</button>
			</div>
		{/if}

		<!-- BLOCCO -->
		{#if step === 5 && volonta === 'no'}
			<div class="text-center space-y-6">
				<h2 class="text-2xl font-bold text-red-600">Processo interrotto</h2>
				<p class="text-gray-500">Nessun prelievo viene effettuato</p>

				<button on:click={reset}
					class="w-full py-4 bg-gray-800 text-white rounded-xl active:scale-95 transition">
					Ricomincia
				</button>
			</div>
		{/if}

		<!-- FAMILIARI -->
		{#if step === 5 && volonta === 'nessuna'}
			<div class="space-y-6 text-center">
				<h2 class="text-2xl font-bold">Decisione ai familiari</h2>

				<div class="bg-gray-50 p-4 rounded-xl">
					<ul class="text-gray-600 space-y-1">
						<li>Coniuge</li>
						<li>Figli</li>
						<li>Genitori</li>
					</ul>
				</div>

				<button on:click={next}
					class="w-full py-4 bg-red-600 text-white rounded-xl active:scale-95 transition">
					Continua
				</button>
			</div>
		{/if}

		<!-- FINALE -->
		{#if step === 6}
			<div class="text-center space-y-6">
				<h2 class="text-2xl font-bold text-red-600">Prelievo organi</h2>
				<p class="text-gray-500">Può salvare fino a 8 vite ❤️</p>

				<button on:click={reset}
					class="w-full py-4 bg-gray-800 text-white rounded-xl active:scale-95 transition">
					Ricomincia
				</button>
			</div>
		{/if}

	</div>
</div>