<script lang="ts">
	let { avanti, dietro }: { avanti: string; dietro: string } = $props();

	let flipped = $state(false);

	let height = $state(0);
	let maxHeight = $derived(height);

	function toggle(): void {
		flipped = !flipped;
	}
</script>

<div
	class="relative w-[min(95vw,65vh)] min-w-[min(280px,55vw)] max-w-[min(420px,75vw)] [perspective:900px] [transform-style:preserve-3d] mx-auto my-[clamp(2vh,2vw,3vh)]"
	style="height: {maxHeight || 'auto'}px"
>
	<!-- sizer invisibile -->
	<div
		class="invisible grid w-full pointer-events-none"
		bind:offsetHeight={height}
	>
		<span class="col-start-1 row-start-1 text-[clamp(1.1rem,4.5vw,1.5rem)] font-semibold leading-snug px-6 py-6 break-words text-center">
			{avanti}
		</span>
		<span class="col-start-1 row-start-1 text-[clamp(1.1rem,4.5vw,1.5rem)] font-semibold leading-snug px-6 py-6 break-words text-center">
			{dietro}
		</span>
	</div>

	<button
		class="absolute inset-0 w-full h-full cursor-pointer border-0 bg-transparent p-0 transform-gpu [will-change:transform] [transform-style:preserve-3d] transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] select-none active:scale-95"
		style="transform: {flipped ? 'rotateX(180deg)' : 'rotateX(0deg)'}"
		onclick={toggle}
	>
		<!-- FRONT -->
		<span
			class="absolute inset-0 flex items-center justify-center text-center rounded-3xl
			text-[clamp(1.1rem,4.5vw,1.5rem)] font-semibold px-6 py-6 leading-snug break-words
			bg-white/30 text-neutral-900
			backdrop-blur-xl backdrop-saturate-150
			border border-white/40
			shadow-[0_8px_30px_rgba(0,0,0,0.12)]
			[backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
		>
			{avanti}
		</span>

		<!-- BACK -->
		<span
			class="absolute inset-0 flex items-center justify-center text-center rounded-3xl
			text-[clamp(1.1rem,4.5vw,1.5rem)] font-semibold px-6 py-6 leading-snug break-words
			bg-white/10 text-white
			backdrop-blur-xl backdrop-saturate-150
			border border-white/20
			shadow-[0_8px_30px_rgba(0,0,0,0.25)]
			[backface-visibility:hidden] [-webkit-backface-visibility:hidden]
			[transform:rotateX(180deg)]"
		>
			{dietro}
		</span>
	</button>
</div>