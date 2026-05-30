<script lang="ts">
	import ProcessoDonazione from '$lib/components/newComponent/ProcessoDonazione.svelte';
</script>

<div class="flex h-full w-full">
	<div class="h-full w-[1.15cqw] bg-white"></div>
	<div class="flex h-full flex-1 select-none flex-col items-center rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh] text-center text-white">
		<div class="flex h-[20%] w-full items-center justify-center px-[1.1cqw] font-black">
			<h1 class="text-[clamp(2rem,5.2cqw,4.2rem)] leading-[0.95] tracking-tight text-balance text-white">Processo di donazione</h1>
		</div>

		<div class="flex h-[80%] w-full flex-col items-center justify-center p-[1.2cqw]">
			<ProcessoDonazione/>
		</div>
	</div>
	<div class="h-full w-[1.15cqw] bg-white"></div>
</div>