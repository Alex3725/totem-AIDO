<script lang="ts">
	import type { MenuOption } from '$lib/data/menu-options';

	let { option }: { option: MenuOption } = $props();
</script>

<!--
	Ghost slide: mostra il titolo della pagina adiacente (prev/next)
	e simula il caricamento del contenuto con uno skeleton animato.
	aria-hidden: i lettori di schermo ignorano le slide fuori schermo.
-->
<div
	aria-hidden="true"
	class="flex h-full w-full select-none flex-col items-center
	       rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh]
	       text-center text-white"
>
	<!-- Titolo estratto dinamicamente dall'option adiacente -->
	<h2 class="m-0 text-[7.1cqw] font-black leading-[1.02]">
		{option.title}
	</h2>

	<!-- Skeleton loader: simula il contenuto in caricamento -->
	<div class="mt-[3cqh] flex w-full flex-1 flex-col items-center gap-[1.4cqh] px-[1cqw]">

		<!-- Righe di testo skeleton -->
		{#each [82, 70, 88, 64] as w, i}
			<div
				class="h-[2.1cqh] animate-pulse rounded-full bg-white/30"
				style="width: {w}%; animation-delay: {i * 90}ms"
			></div>
		{/each}

		<!-- Box centrale skeleton (simula un'immagine / contenuto principale) -->
		<div
			class="mt-[1cqh] w-full flex-1 animate-pulse rounded-[1.2cqw] bg-white/20"
			style="animation-delay: 360ms; min-height: 4cqh"
		></div>
	</div>

	<!-- CTA skeleton: replica la forma del pulsante reale -->
	<div
		class="mt-auto h-[5.8cqh] w-[52cqw] animate-pulse rounded-[1.2cqw] bg-white/25
		       shadow-[0_0.55cqw_0.75cqw_rgba(0,0,0,0.2)]"
		style="animation-delay: 450ms"
	></div>
</div>
