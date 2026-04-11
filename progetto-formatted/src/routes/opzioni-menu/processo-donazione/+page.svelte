<script lang="ts">
	import ProcessoDonazione from '$lib/components/newComponent/ProcessoDonazione.svelte';
</script>

<div class="flex h-full w-full select-none flex-col items-center rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh] text-center text-white">
	<div class="flex h-[20%] w-full items-center justify-center font-black">
		<h1 class="text-[5rem]">Processo di donazione</h1>
	</div>

	<div class="flex h-[80%] w-full flex-col items-center justify-center p-[1.2cqw]">
		<ProcessoDonazione/>
	</div>
</div>