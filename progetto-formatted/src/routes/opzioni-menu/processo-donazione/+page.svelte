<script lang="ts">
	import FlipButtonSingle from '$lib/components/newComponent/FlipButtonSingle.svelte';
	import PulsanteContent from '$lib/components/newComponent/PulsanteContent.svelte';
    import ProcessoDonazione from "$lib/components/newComponent/ProcessoDonazione.svelte";

</script>


<div class="flex h-full w-full select-none flex-col items-center
	       rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh]
	       text-center text-white">

    <div class=" w-full h-[20%] flex items-center justify-center font-black ">
        <h1 class=" text-[5rem] text-white ">Processo di donazione</h1>
    </div>

    <div class=" w-full h-[60%] p-4 flex flex-col items-center justify-center gap-4">
            <ProcessoDonazione/>
    </div>
    
    <div class="w-full h-[20%] flex flex-col items-center justify-center gap-4 p-3">
        <PulsanteContent titolo="Scopri subito!" route="/opzioni-menu/processo-scelta/mappa" />
    </div>
</div>
