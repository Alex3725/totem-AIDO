<script lang="ts">
  let { avanti, dietro }: { avanti: string; dietro: string } = $props();
  let flipped = $state(false);
 
  function toggle(): void {
    flipped = !flipped;
  }
</script>
 
<div
  class="relative h-[clamp(84px,10.8cqh,132px)] w-full max-w-[min(72vh,96cqw)] perspective-distant transform-3d mx-auto my-[clamp(0.3rem,0.95cqh,0.8rem)] overflow-visible"
>
  <button
    class="absolute inset-0 w-full h-full cursor-pointer border-0 p-0 transform-gpu will-change-transform transform-3d transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] select-none active:scale-[0.97]"
    style="transform: {flipped ? 'rotateX(180deg)' : 'rotateX(0deg)'}"
    onclick={toggle}
>
<!-- FRONT -->
<span
      class="
  absolute inset-0 flex items-center justify-center text-center rounded-[clamp(16px,1.45cqw,28px)]
        text-[clamp(0.95rem,2.55cqw,1.7rem)] font-bold px-[clamp(0.55rem,1.3cqw,2rem)] py-[clamp(0.25rem,0.55cqh,0.75rem)] leading-snug wrap-break-word
        backface-hidden
        transform-[rotateX(0deg)]
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
  absolute inset-0 flex items-center justify-center text-center rounded-[clamp(16px,1.45cqw,28px)]
        text-[clamp(0.95rem,2.55cqw,1.7rem)] font-bold px-[clamp(0.55rem,1.3cqw,2rem)] py-[clamp(0.25rem,0.55cqh,0.75rem)] leading-snug wrap-break-word
        backface-hidden
        transform-[rotateX(180deg)]
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
