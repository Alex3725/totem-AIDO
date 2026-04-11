<script lang="ts">
	import PulsanteContent from '$lib/components/newComponent/PulsanteContent.svelte';
</script>
<div
	class="flex h-full w-full select-none flex-col items-center rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh] text-center text-white"
>
	<div class="flex h-[14%] w-full items-center justify-center font-black">
		<h1 class="text-[5rem] leading-none text-white">FAQ</h1>
	</div>
	<div class="flex w-full flex-1 items-center justify-center px-[1cqw] py-[0.5cqh]">
		<div
			class="flex w-[min(100%,60cqw)] items-center justify-center rounded-[2.1cqw] bg-white/12 px-[2.2cqw] py-[2.4cqh] shadow-[0_1cqw_2.4cqw_rgba(0,0,0,0.22)] ring-1 ring-white/20 backdrop-blur-[3px]"
		>
			<img
				src="/img/nomi_frequenti.png"
				alt="Anteprima sezione FAQ"
				class="h-auto max-h-[48cqh] w-full rounded-[1.6cqw] object-contain"
			/>
		</div>
	</div>
	<div class="flex h-[14%] w-full flex-col items-center justify-center p-3">
		<PulsanteContent titolo="Scopri subito!" route="/opzioni-menu/faq/paginaContent" />
	</div>
</div>
