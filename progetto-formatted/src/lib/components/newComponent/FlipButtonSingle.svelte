<script lang="ts">
	let { avanti, dietro }: { avanti: string; dietro: string } = $props();

	let flipped = $state(false);

	let height = $state(0);
	let maxHeight = $derived(height);

	function toggle(): void {
		flipped = !flipped;
	}
</script>

<div class="flip-wrapper" style="height: {maxHeight || 'auto'}px">
	<!-- sizer -->
	<div class="flip-btn-sizer" bind:offsetHeight={height}>
		<span class="sizer-ghost">{avanti}</span>
		<span class="sizer-ghost">{dietro}</span>
	</div>

	<button
		class="flip-btn"
		class:flipped={flipped}
		onclick={toggle}
	>
		<span class="face face--front">{avanti}</span>
		<span class="face face--back">{dietro}</span>
	</button>
</div>

<style> .button-grid { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start; } .flip-wrapper { perspective: 800px; position: relative; width: 180px; /* altezza impostata inline tramite JS */ } .flip-btn-sizer { visibility: hidden; display: grid; width: 100%; pointer-events: none; } .sizer-ghost { grid-area: 1 / 1; font-size: clamp(0.65rem, 1.8vw, 0.95rem); font-weight: 500; line-height: 1.3; padding: 0.5rem 0.75rem; box-sizing: border-box; word-break: break-word; overflow-wrap: break-word; text-align: center; } .flip-btn { position: absolute; inset: 0; cursor: pointer; border: none; background: transparent; padding: 0; transform-style: preserve-3d; transition: transform 0.55s cubic-bezier(0.45, 0.05, 0.15, 1); width: 100%; height: 100%; } .flip-btn.flipped { transform: rotateX(180deg); } .face { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 8px; font-size: clamp(0.65rem, 1.8vw, 0.95rem); font-weight: 500; padding: 0.5rem 0.75rem; line-height: 1.3; backface-visibility: hidden; -webkit-backface-visibility: hidden; box-sizing: border-box; word-break: break-word; overflow-wrap: break-word; } .face--front { background: #e0e0e0; color: #222; } .face--back { background: #222; color: #fff; transform: rotateX(180deg); } </style>