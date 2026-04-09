<script lang="ts">
  let { avanti, dietro }: { avanti: string; dietro: string } = $props();
  let flipped = $state(false);
  let height = $state(0);
  let maxHeight = $derived(height);
 
  function toggle(): void {
    flipped = !flipped;
  }
</script>
 
<div
  class="relative w-[min(95vw,65vh)] min-w-[min(280px,55vw)] max-w-[min(420px,75vw)] [perspective:1200px] [transform-style:preserve-3d] mx-auto my-[clamp(2vh,2vw,3vh)] overflow-visible"
  style="height: {maxHeight || 'auto'}px"
>
<!-- sizer invisibile -->
<div
    class="invisible grid w-full pointer-events-none"
    bind:offsetHeight={height}
>
<span class="col-start-1 row-start-1 text-[clamp(1.2rem,4.9vw,1.7rem)] font-bold leading-snug px-6 py-6 break-words text-center">
      {avanti}
</span>
<span class="col-start-1 row-start-1 text-[clamp(1.2rem,4.9vw,1.7rem)] font-bold leading-snug px-6 py-6 break-words text-center">
      {dietro}
</span>
</div>
 
  <button
    class="absolute inset-0 w-full h-full cursor-pointer border-0 bg-transparent p-0 transform-gpu [will-change:transform] [transform-style:preserve-3d] transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] select-none active:scale-[0.97]"
    style="transform: {flipped ? 'rotateX(180deg)' : 'rotateX(0deg)'}"
    onclick={toggle}
>
<!-- FRONT -->
<span
      class="
        absolute inset-0 flex items-center justify-center text-center rounded-[28px]
        text-[clamp(1.2rem,4.9vw,1.7rem)] font-bold px-6 py-6 leading-snug break-words
        [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
        [transform:rotateX(0deg)]
        text-neutral-800
      "
      style="
        opacity: {flipped ? 0 : 1};
        visibility: {flipped ? 'hidden' : 'visible'};
        background:
          radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.36) 72%, rgba(255,255,255,0.52) 100%),
          linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%);
        backdrop-filter: blur(22px) saturate(145%) brightness(1.03);
        -webkit-backdrop-filter: blur(22px) saturate(145%) brightness(1.03);
        border: 1px solid rgba(255,255,255,0.58);
        box-shadow:
          0 0 0 1px rgba(255,255,255,0.14) inset,
          0 1px 0 0 rgba(255,255,255,0.45) inset,
          0 12px 30px rgba(94, 109, 135, 0.10),
          0 3px 10px rgba(94, 109, 135, 0.08);
      "
>
      {avanti}
</span>
 
    <!-- BACK -->
<span
      class="
        absolute inset-0 flex items-center justify-center text-center rounded-[28px]
        text-[clamp(1.2rem,4.9vw,1.7rem)] font-bold px-6 py-6 leading-snug break-words
        [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
        [transform:rotateX(180deg)]
        text-neutral-900
      "
      style="
        opacity: {flipped ? 1 : 0};
        visibility: {flipped ? 'visible' : 'hidden'};
        background:
          radial-gradient(circle at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.16) 36%, rgba(255,255,255,0.32) 70%, rgba(255,255,255,0.48) 100%),
          linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(24px) saturate(150%) brightness(1.02);
        -webkit-backdrop-filter: blur(24px) saturate(150%) brightness(1.02);
        border: 1px solid rgba(255,255,255,0.52);
        box-shadow:
          0 0 0 1px rgba(255,255,255,0.12) inset,
          0 1px 0 0 rgba(255,255,255,0.38) inset,
          0 14px 32px rgba(94, 109, 135, 0.12),
          0 3px 12px rgba(94, 109, 135, 0.08);
      "
>
      {dietro}
</span>
</button>
</div>
