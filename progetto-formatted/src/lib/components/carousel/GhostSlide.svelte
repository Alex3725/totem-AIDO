<script lang="ts">
 import type { MenuOption } from '$lib/data/menu-options';

 let { option }: { option: MenuOption } = $props();
</script>

<!--
 Visual replica of the real MenuOptionPanel.
 aria-hidden so screen readers skip the off-screen previews.
 select-none + draggable=false prevent browser native drag.
-->
<div
 aria-hidden="true"
 class="flex h-full w-full select-none flex-col items-center justify-center
        rounded-t-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh]
        text-center text-white"
>
 <!-- Title -->
 <h2 class="m-0 text-[7.1cqw] font-black leading-[1.02]">
  {option.title}
 </h2>

 <!-- Description -->
 <p class="mt-[3cqh] max-w-[88%] text-[3.45cqw] font-bold leading-[1.42] opacity-90">
  {option.description}
 </p>

 <!-- CTA button preview -->
 <div
  class="mt-auto rounded-[1.2cqw] bg-white px-[4.25cqw] py-[1.6cqh]
         text-[4.7cqw] font-black leading-none text-[#121212]
         shadow-[0_0.55cqw_0.75cqw_rgba(0,0,0,0.38)]"
 >
  {option.ctaLabel}
 </div>
</div>
 