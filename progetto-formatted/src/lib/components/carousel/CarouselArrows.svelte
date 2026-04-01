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

 let prevPressed = false;
 let nextPressed = false;

 function handlePrevClick() {
  if (disabled) return;
  prevPressed = true;
  onPrev();
  setTimeout(() => (prevPressed = false), 250);
 }

 function handleNextClick() {
  if (disabled) return;
  nextPressed = true;
  onNext();
  setTimeout(() => (nextPressed = false), 250);
 }
</script>

<style>
 @keyframes tapScale {
  0%   { transform: scale(1); }
  50%  { transform: scale(0.75); }
  100% { transform: scale(1); }
 }

 .btn-tap {
  transition: transform 0.1s ease-out;
 }

 .btn-tap.pressed {
  animation: tapScale 0.25s ease-out;
 }
</style>

{#if prevOption}
 <button
  onclick={handlePrevClick}
  {disabled}
  aria-label="Vai a {prevOption.title}"
  class="absolute left-2 top-1/2 z-20 flex
         h-12 w-12
         sm:h-14 sm:w-14
         md:h-16 md:w-16
         lg:h-14 lg:w-14
         xl:h-12 xl:w-12
         -translate-y-1/2 cursor-pointer select-none
         items-center justify-center rounded-full
         bg-white border-2 border-slate-500 shadow-md
         btn-tap {prevPressed ? 'pressed' : ''}
         disabled:pointer-events-none"
 >
  <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
   <polyline points="15 18 9 12 15 6" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
 </button>
{/if}

{#if nextOption}
 <button
  onclick={handleNextClick}
  {disabled}
  aria-label="Vai a {nextOption.title}"
  class="absolute right-2 top-1/2 z-20 flex
         h-12 w-12
         sm:h-14 sm:w-14
         md:h-16 md:w-16
         lg:h-14 lg:w-14
         xl:h-12 xl:w-12
         -translate-y-1/2 cursor-pointer select-none
         items-center justify-center rounded-full
         bg-white border-2 border-slate-500 shadow-md
         btn-tap {nextPressed ? 'pressed' : ''}
         disabled:pointer-events-none"
 >
  <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
   <polyline points="9 18 15 12 9 6" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
 </button>
{/if}