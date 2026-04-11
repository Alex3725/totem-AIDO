<script lang="ts">
  let { avanti, dietro }: { avanti: string; dietro: string } = $props();
  let flipped = $state(false);
 
  function toggle(): void {
    flipped = !flipped;
  }
</script>
 
<div
  class="relative h-[clamp(96px,12vh,132px)] w-[min(120vw,78vh)] min-w-[min(520px,82vw)] max-w-[min(700px,96vw)] [perspective:1200px] [transform-style:preserve-3d] mx-auto my-[clamp(2vh,2vw,3vh)] overflow-visible"
>
  <button
    class="absolute inset-0 w-full h-full cursor-pointer border-0 p-0 transform-gpu [will-change:transform] [transform-style:preserve-3d] transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] select-none active:scale-[0.97]"
    style="transform: {flipped ? 'rotateX(180deg)' : 'rotateX(0deg)'}"
    onclick={toggle}
>
<!-- FRONT -->
<span
      class="
        absolute inset-0 flex items-center justify-center text-center rounded-[28px]
        text-[clamp(1.2rem,4.9vw,1.7rem)] font-bold px-8 py-3 leading-snug break-words
        [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
        [transform:rotateX(0deg)]
        text-neutral-800
      "
      style="
        opacity: {flipped ? 0 : 1};
        visibility: {flipped ? 'hidden' : 'visible'};
        background-color: rgba(255, 255, 255, 0.25);
        color: white;
        -webkit-backdrop-filter: blur(24px) saturate(150%) brightness(1.02);
        border: 3px solid rgba(255, 255, 255, 0.28);
        box-shadow: 0 0.75cqw 1.2cqw rgba(0, 0, 0, 0.18);
      "
> 
      {avanti}
</span>
 
    <!-- BACK -->
<span
      class="
        absolute inset-0 flex items-center justify-center text-center rounded-[28px]
        text-[clamp(1.2rem,4.9vw,1.7rem)] font-bold px-8 py-3 leading-snug break-words
        [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
        [transform:rotateX(180deg)]
        text-neutral-900
      "
      style="
        opacity: {flipped ? 1 : 0};
        visibility: {flipped ? 'visible' : 'hidden'};
        background-color: rgba(255, 255, 255, 0.25);
        color: white;
        -webkit-backdrop-filter: blur(24px) saturate(150%) brightness(1.02);
        border: 3px solid rgba(255, 255, 255, 0.28);
        box-shadow: 0 0.75cqw 1.2cqw rgba(0, 0, 0, 0.18);
      "
>
      {dietro}
</span>
</button>
</div>
