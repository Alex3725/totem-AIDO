<script lang="ts">
	import type { MenuOption } from '$lib/data/menu-options';

	let { option }: { option: MenuOption } = $props();
</script>

<!--
	Ghost slide: mostra il titolo della pagina adiacente (prev/next)
	e simula il caricamento del contenuto con uno skeleton animato.
	aria-hidden: i lettori di schermo ignorano le slide fuori schermo.
-->
<div class="flex h-full w-full">
	<div class="h-full w-[0.95cqw] bg-white"></div>
	<div class="flex h-full flex-1 select-none flex-col items-center
	       rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh]
	       text-center text-white">

	<div class="flex h-[20%] w-full items-center justify-center px-[1.1cqw] font-black">
		<h1 class="text-[clamp(2rem,5.2cqw,4.2rem)] leading-[0.95] tracking-tight text-balance text-white">{option.title}</h1>
    </div>

    <div class=" w-full h-[60%] p-4 flex flex-col items-center justify-center gap-4 bg-white/30 rounded-t-[1.45cqw]">
            
            
    </div>
	<div class="w-full h-[20%] flex flex-col items-center justify-center gap-4 p-3 bg-white/30 rounded-b-[1.45cqw]">
        
    </div>
	</div>
	<div class="h-full w-[0.95cqw] bg-white"></div>
</div>
