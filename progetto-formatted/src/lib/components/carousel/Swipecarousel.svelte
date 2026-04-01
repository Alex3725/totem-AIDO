<script lang="ts">
 import { afterNavigate, goto } from '$app/navigation';
 import type { Snippet } from 'svelte';
 import type { MenuOption } from '$lib/data/menu-options';
 import GhostSlide from './GhostSlide.svelte';
 import CarouselArrows from './CarouselArrows.svelte';

 // ─── Props ────────────────────────────────────────────────────────────────
 let {
  children,
  prevOption = null,
  nextOption = null
 }: {
  children: Snippet;
  prevOption: MenuOption | null;
  nextOption: MenuOption | null;
 } = $props();

 // ─── Drag / animation state ────────────────────────────────────────────
 let offset = $state(0); // pixel offset from center position
 let isDragging = $state(false);
 let isAnimating = $state(false);
 let skipTransition = $state(false); // instant reset after navigation

 // ─── DOM reference ────────────────────────────────────────────────────
 let wrapperEl: HTMLDivElement;
 let containerWidth = $state(320); // fallback width (overridden after mount)

 // ─── Pointer tracking (plain vars, not reactive — avoids extra renders) ─
 let pStartX = 0;
 let pStartTime = 0;

 // ─── Tuning constants ─────────────────────────────────────────────────
 const DRAG_THRESHOLD = 0.28; // fraction of width to trigger navigation
 const VELOCITY_THRESHOLD = 0.45; // px/ms for flick navigation
 const EDGE_RESISTANCE = 0.12; // elasticity when no adjacent page exists

 // ─── Resize observer: keep containerWidth in sync ────────────────────
 $effect(() => {
  if (!wrapperEl) return;
  containerWidth = wrapperEl.offsetWidth;
  const ro = new ResizeObserver(([entry]) => {
   containerWidth = entry.contentRect.width;
  });
  ro.observe(wrapperEl);
  return () => ro.disconnect();
 });

 // ─── After every SvelteKit navigation: snap track back to center ──────
 afterNavigate(() => {
  // Disable transition so the reset is instant (no visible snap)
  skipTransition = true;
  offset = 0;
  isAnimating = false;
  // Re-enable transition after two animation frames
  requestAnimationFrame(() =>
   requestAnimationFrame(() => {
    skipTransition = false;
   })
  );
 });

 // ─── Pointer event handlers ───────────────────────────────────────────

 function onPointerDown(e: PointerEvent) {
  if (isAnimating) return;
  isDragging = true;
  pStartX = e.clientX;
  pStartTime = performance.now();
  // Capture pointer so we still get events if finger leaves the element
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
 }

 function onPointerMove(e: PointerEvent) {
  if (!isDragging) return;
  const delta = e.clientX - pStartX;

  // Apply elastic resistance when swiping past the edge
  if (delta > 0 && !prevOption) {
   offset = delta * EDGE_RESISTANCE;
  } else if (delta < 0 && !nextOption) {
   offset = delta * EDGE_RESISTANCE;
  } else {
   offset = delta;
  }
 }

 function onPointerUp(e: PointerEvent) {
  if (!isDragging) return;
  isDragging = false;

  const delta = e.clientX - pStartX;
  const elapsed = Math.max(performance.now() - pStartTime, 1);
  const velocity = Math.abs(delta) / elapsed; // px/ms

  const overThreshold = Math.abs(delta) > containerWidth * DRAG_THRESHOLD;
  const overVelocity = velocity > VELOCITY_THRESHOLD;
  const shouldNavigate = overThreshold || overVelocity;

  if (shouldNavigate && delta > 0 && prevOption) {
   triggerNavigation('prev');
  } else if (shouldNavigate && delta < 0 && nextOption) {
   triggerNavigation('next');
  } else {
   // Snap back to centre with spring animation
   isAnimating = true;
   offset = 0;
   setTimeout(() => (isAnimating = false), 360);
  }
 }

 function onPointerCancel() {
  if (!isDragging) return;
  // Abort drag — snap back instantly
  isDragging = false;
  isAnimating = true;
  offset = 0;
  setTimeout(() => (isAnimating = false), 360);
 }

 // ─── Navigation: animate track → call goto() → afterNavigate resets ──

 function triggerNavigation(direction: 'prev' | 'next') {
  if (isAnimating) return;
  isAnimating = true;
  isDragging = false;

  // Slide track to fully reveal the ghost slide
  offset = direction === 'prev' ? containerWidth : -containerWidth;

  // Wait for the CSS transition to finish, then actually navigate
  setTimeout(() => {
   const option = direction === 'prev' ? prevOption : nextOption;
   if (option) goto(`/opzioni-menu/${option.slug}`);
  }, 280);
 }

 // ─── Derived CSS ──────────────────────────────────────────────────────

 const transition = $derived(
  // No transition while finger is down or reset is instant
  isDragging || skipTransition
   ? 'none'
   : 'transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
 );

 /**
  * Track is 300% wide (three equal slides).
  * Centre slide starts at -33.333% from the left edge of the track.
  * Adding pixel offset creates the drag illusion.
  */
 const trackStyle = $derived(
  `width: 300%;` +
   `transform: translateX(calc(-33.333% + ${offset}px));` +
   `transition: ${transition};` +
   `will-change: transform;`
 );
</script>

<!--
 Wrapper: `relative` so arrows can be positioned absolutely.
 The wrapper itself NEVER moves — only the inner track does.
-->
<div class="relative h-full w-full" bind:this={wrapperEl}>
 <!--
  ▲ OVERLAY ARROWS
  Positioned absolute within this wrapper.
  They live OUTSIDE the clip container and the moving track.
  Result: they never translate during swipe.
 -->
 <CarouselArrows
  {prevOption}
  {nextOption}
  onPrev={() => triggerNavigation('prev')}
  onNext={() => triggerNavigation('next')}
  disabled={isAnimating}
 />

 <!--
  Overflow clip: hides ghost slides that are off-screen.
  This is a separate div from the arrows' positioning context
  so arrows are NOT clipped.
 -->
 <div class="h-full w-full overflow-hidden">
  <!--
   Moving track with 3 equal-width slides.
   Pointer events are attached here so the full surface is draggable.
  -->
  <div
   class="flex h-full touch-pan-y select-none"
   style={trackStyle}
   draggable="false"
   role="presentation"
   onpointerdown={onPointerDown}
   onpointermove={onPointerMove}
   onpointerup={onPointerUp}
   onpointercancel={onPointerCancel}
  >
   <!-- ① Ghost Previous (off-screen left) -->
   <div class="h-full flex-none" style="width: 33.333%">
    {#if prevOption}
     <GhostSlide option={prevOption} />
    {/if}
   </div>

   <!-- ② Real page content (always centred at rest) -->
   <div class="h-full flex-none" style="width: 33.333%">
    {@render children()}
   </div>

   <!-- ③ Ghost Next (off-screen right) -->
   <div class="h-full flex-none" style="width: 33.333%">
    {#if nextOption}
     <GhostSlide option={nextOption} />
    {/if}
   </div>
  </div>
 </div>
</div>
 