<script lang="ts">
	import DropDownFaq from "$lib/components/newComponent/DropDownFaq.svelte";


    const faqItems = [
		{
			question: 'Come mi iscrivo?',
			answer:
				'Puoi iscriverti ad AIDO online tramite il sito aido.it o tramite l\'app DigitalAIDO. In alternativa, puoi stampare il modulo cartaceo dal sito, compilarlo, firmarlo e spedirlo alla sede AIDO più vicina.'
		},
		{
			question: 'Posso cambiare idea?',
			answer:
				'Sì, puoi revocare la tua iscrizione e il consenso alla donazione in qualsiasi momento. Basta scaricare il modulo di revoca dal sito, compilarlo e inviarlo tramite raccomandata A/R o PEC alla sede AIDO Nazionale.'
		},
		{
			question: 'Dove trovo piu informazioni?',
			answer:
				'Trovi tutte le informazioni necessarie sul sito aido.it o nella sede ASL vicina a te.'
		},
		{
			question: 'Serve un documento?',
			answer:
				'Sì: per l\'iscrizione digitale è necessario lo SPID o la Carta d\'Identità Elettronica (CIE). Per l\'iscrizione cartacea, invece, è sufficiente allegare una copia del proprio documento d\'identità al modulo firmato.'
		}
	];
</script>

<div
	class="flex h-full w-full select-none flex-col items-center rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh] text-center text-white"
>
	<div class="flex h-[14%] w-full items-center justify-center font-black invisible">
		<h1 class="text-[5rem] leading-none text-white">FAQ</h1>
	</div>
	<div class="flex w-full flex-1 items-center justify-center px-[1cqw] py-[0.5cqh]">
	    {#each faqItems as item}
					<DropDownFaq>	
{/each}
	</div>
</div>
