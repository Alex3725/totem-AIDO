<script lang="ts">
	import FlipButtonSingle from '$lib/components/newComponent/FlipButtonSingle.svelte';
	import PulsanteContent from '$lib/components/newComponent/PulsanteContent.svelte';

</script>

<div class=" w-full h-[20%] flex items-center justify-center color-white ">
    <h1>Processo di scelta</h1>
</div>

<div class=" w-full h-full bg-red-700">
    <div class=" w-full h-[60%] p-4 flex flex-col items-center justify-center gap-4">
            <FlipButtonSingle avanti="Azienda Sanitaria Locale" dietro="Scopri qual'è il riferimento sanitario più vicino al tuo territorio"/>
            <FlipButtonSingle avanti="Comune" dietro="Informazioni su dove puoi esprimere la tua scelta nel tuo comune"/>
            <FlipButtonSingle avanti="Iscrizione AIDO" dietro="Confronta i diversi canali disponibili per registrare la tua volontà"/>
            <PulsanteContent titolo="Consulta la mappa ATS" route="/opzioni-menu/processo-scelta/mappa" />
    </div>
</div>
