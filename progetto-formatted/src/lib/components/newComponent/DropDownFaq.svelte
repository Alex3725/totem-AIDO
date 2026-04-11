<script lang="ts">
  import { slide } from 'svelte/transition';
  import { faqOpenQuestion } from '$lib/stores/faq-open.store';

  let { question, answer }: { question: string; answer: string } = $props();

  const isOpen = $derived($faqOpenQuestion === question);
</script>

<div class="w-[92%] overflow-hidden rounded-[1.1cqw] bg-white text-left text-[#111] shadow-[0_0.8cqw_1.8cqw_rgba(0,0,0,0.12)]">
  <button
    type="button"
    aria-expanded={isOpen}
    onclick={() => faqOpenQuestion.set(isOpen ? null : question)}
    class="flex min-h-[9.2cqh] w-full items-center justify-between gap-[1.2cqw] border-0 bg-transparent px-[2.2cqw] py-[1.8cqh] text-left text-[3.25cqw] font-extrabold text-[#111] transition-colors duration-200 hover:bg-[#f8f8f8]"
  >
    <span class="flex-1 overflow-hidden leading-tight [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{question}</span>

    <img
      src="/img/dropdown_pulsante.png"
      alt=""
      class={`h-[4.2cqw] w-[4.2cqw] transition-transform duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] ${isOpen ? 'rotate-180' : ''}`}
    />
  </button>

  {#if isOpen}
    <div transition:slide class="px-[2.2cqw] pb-[2.2cqh] text-[2.5cqw] leading-snug text-[#333]">
      <p>{answer}</p>
    </div>
  {/if}
</div>

