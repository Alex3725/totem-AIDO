<script lang="ts">
	import FlipButtonSingle from '$lib/components/newComponent/FlipButtonSingle.svelte';
	import PulsanteContent from '$lib/components/newComponent/PulsanteContent.svelte';

</script>


<div class="flex h-full w-full">
    <div class="h-full w-[1.15cqw] bg-white"></div>
    <div class="flex h-full flex-1 select-none flex-col items-center
           rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh]
           text-center text-white">

    <div class="flex h-[20%] w-full items-center justify-center px-[1.1cqw] font-black">
        <h1 class="text-[clamp(2rem,5.2cqw,4.2rem)] leading-[0.95] tracking-tight text-balance text-white">
            Processo di scelta
        </h1>
    </div>

    <div class="w-full flex-1 min-h-0 p-[clamp(0.5rem,1.6cqw,1rem)] flex flex-col items-center justify-center gap-[clamp(0.65rem,1.8cqh,1rem)]">
            <FlipButtonSingle avanti="Azienda Sanitaria Locale" dietro="Scopri qual'è il riferimento sanitario più vicino al tuo territorio"/>
            <FlipButtonSingle avanti="Comune" dietro="Informazioni su dove puoi esprimere la tua scelta nel tuo comune"/>
            <FlipButtonSingle avanti="Iscrizione AIDO" dietro="Confronta i diversi canali disponibili per registrare la tua volontà"/>
            
    </div>
    <div class="w-full min-h-[16%] flex flex-col items-center justify-center gap-[clamp(0.5rem,1.4cqh,1rem)] p-[clamp(0.5rem,1.1cqw,0.85rem)]">
        <PulsanteContent titolo="Consulta la mappa ATS" route="/opzioni-menu/processo-scelta/mappa" />
    </div>
	</div>
	<div class="h-full w-[1.15cqw] bg-white"></div>
</div>
