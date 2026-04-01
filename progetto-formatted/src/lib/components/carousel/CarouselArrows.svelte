<script lang="ts">
 import type { MenuOption } from '$lib/data/menu-options';

 let {
  prevOption = null,
  nextOption = null,
  onPrev,
  onNext,
  disabled = false
 }: {
  prevOption: MenuOption | null;
  nextOption: MenuOption | null;
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
 } = $props();
</script>

<!--
 These buttons sit OUTSIDE the moving carousel track.
 They are absolutely-positioned within the carousel wrapper (which is `relative`),
 so they never translate during swipe.
-->

{#if prevOption}
 <button
  onclick={onPrev}
  {disabled}
  aria-label="Vai a {prevOption.title}"
  class="absolute left-0 top-1/2 z-20 flex
         h-[13cqh] min-h-[3.2rem]
         w-[5.5cqw] min-w-[1.8rem]
         -translate-y-1/2 cursor-pointer select-none
         items-center justify-center rounded-r-[0.85cqw]
         bg-black/20 backdrop-blur-[1px]
         transition-colors duration-150
         hover:bg-black/32 active:bg-black/45
         disabled:pointer-events-none disabled:opacity-20"
 >
  <img
   src="/img/Freccia.png"
   alt=""
   draggable="false"
   class="h-[3.8cqw] w-[3.8cqw] min-h-[1.1rem] min-w-[1.1rem]
          -scale-x-100 brightness-0 invert"
  />
 </button>
{/if}

{#if nextOption}
 <button
  onclick={onNext}
  {disabled}
  aria-label="Vai a {nextOption.title}"
  class="absolute right-0 top-1/2 z-20 flex
         h-[13cqh] min-h-[3.2rem]
         w-[5.5cqw] min-w-[1.8rem]
         -translate-y-1/2 cursor-pointer select-none
         items-center justify-center rounded-l-[0.85cqw]
         bg-black/20 backdrop-blur-[1px]
         transition-colors duration-150
         hover:bg-black/32 active:bg-black/45
         disabled:pointer-events-none disabled:opacity-20"
 >
  <img
   src="/img/Freccia.png"
   alt=""
   draggable="false"
   class="h-[3.8cqw] w-[3.8cqw] min-h-[1.1rem] min-w-[1.1rem]
          brightness-0 invert"
  />
 </button>
{/if}