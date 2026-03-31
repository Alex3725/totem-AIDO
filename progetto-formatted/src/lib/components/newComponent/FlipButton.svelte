<script>
	let buttons = $state([
		{
			id: 1,
			front: 'Con AIDO',
			back: "Iscriviti all'associazione e registra la tua scelta",
			flipped: false
		},
		{
			id: 2,
			front: 'In comune o ASL',
			back: 'Esprimi la tua volontà nei punti abilitati del territorio',
			flipped: false
		},
		{
			id: 3,
			front: "Con l'app",
			back: "Premi il bottone 'iscriviti subito!' e usa il codice qr per scaricare l'app e iscriverti",
			flipped: false
		},
		{ id: 4, front: '✦ Progetto', back: 'Lanciamo a giugno 2026!', flipped: false },
		{ id: 5, front: '✦ Progetto', back: 'Lanciamo a giugno 2026!', flipped: false },
		{ id: 6, front: '✦ Progetto', back: 'Lanciamo a giugno 2026!', flipped: false },
		{
			id: 7,
			front: '✦ Progetto',
			back: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
			flipped: false
		}
	]);

	// Altezze misurate per ogni sizer
	let heights = $state({});

	// Altezza massima tra tutti
	let maxHeight = $derived(Math.max(0, ...Object.values(heights)));

	/** @param {number|string} id */
	function toggle(id) {
		buttons = buttons.map((b) => (b.id === id ? { ...b, flipped: !b.flipped } : b));
	}
</script>

<div class="button-grid">
	{#each buttons as btn (btn.id)}
		<div class="flip-wrapper" style="height: {maxHeight || 'auto'}px">
			<!-- sizer invisibile, misuriamo la sua altezza naturale -->
			<div class="flip-btn-sizer" bind:offsetHeight={heights[btn.id]}>
				<span class="sizer-ghost">{btn.front}</span>
				<span class="sizer-ghost">{btn.back}</span>
			</div>

			<button class="flip-btn" class:flipped={btn.flipped} onclick={() => toggle(btn.id)}>
				<span class="face face--front">{btn.front}</span>
				<span class="face face--back">{btn.back}</span>
			</button>
		</div>
	{/each}
</div>

<style>
	.button-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: flex-start;
	}

	.flip-wrapper {
		perspective: 800px;
		position: relative;
		width: 180px;
		/* altezza impostata inline tramite JS */
	}

	.flip-btn-sizer {
		visibility: hidden;
		display: grid;
		width: 100%;
		pointer-events: none;
	}

	.sizer-ghost {
		grid-area: 1 / 1;
		font-size: clamp(0.65rem, 1.8vw, 0.95rem);
		font-weight: 500;
		line-height: 1.3;
		padding: 0.5rem 0.75rem;
		box-sizing: border-box;
		word-break: break-word;
		overflow-wrap: break-word;
		text-align: center;
	}

	.flip-btn {
		position: absolute;
		inset: 0;
		cursor: pointer;
		border: none;
		background: transparent;
		padding: 0;
		transform-style: preserve-3d;
		transition: transform 0.55s cubic-bezier(0.45, 0.05, 0.15, 1);
		width: 100%;
		height: 100%;
	}

	.flip-btn.flipped {
		transform: rotateX(180deg);
	}

	.face {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-radius: 8px;
		font-size: clamp(0.65rem, 1.8vw, 0.95rem);
		font-weight: 500;
		padding: 0.5rem 0.75rem;
		line-height: 1.3;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		box-sizing: border-box;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.face--front {
		background: #e0e0e0;
		color: #222;
	}

	.face--back {
		background: #222;
		color: #fff;
		transform: rotateX(180deg);
	}
</style>
