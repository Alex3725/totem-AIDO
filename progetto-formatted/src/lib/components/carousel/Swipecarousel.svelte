<script lang="ts">
 import { afterNavigate } from '$app/navigation';
 import { goto } from '$app/navigation';
 import { onDestroy } from 'svelte';
 import type { Snippet } from 'svelte';
 import { menuOptions } from '$lib/data/menu-options';
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
let pendingGhostForDissolve: MenuOption | null = $state(null);
let dissolveGhostOption: MenuOption | null = $state(null);
let dissolveGhostVisible = $state(false);
let isNavigationPending = $state(false);
let isBoostDragging = $state(false);
let transitionDurationMs = $state(320);
let activeDirection: 'prev' | 'next' | 'none' = $state('none');

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
const GHOST_DISSOLVE_DELAY_MS = 140;
const GHOST_DISSOLVE_DURATION_MS = 900;
const BASE_DURATION_MS = 320;
const BOOST_LIGHT_DURATION_MS = 220;
const BOOST_STRONG_DURATION_MS = 160;

let snapBackTimeoutId: ReturnType<typeof setTimeout> | null = null;
let navigateTimeoutId: ReturnType<typeof setTimeout> | null = null;
let dissolveStartTimeoutId: ReturnType<typeof setTimeout> | null = null;
let dissolveClearTimeoutId: ReturnType<typeof setTimeout> | null = null;

function clearTimeoutSafe(timeoutId: ReturnType<typeof setTimeout> | null) {
 if (timeoutId !== null) {
  clearTimeout(timeoutId);
 }
}

function clearTransientTimers() {
 clearTimeoutSafe(snapBackTimeoutId);
 clearTimeoutSafe(navigateTimeoutId);
 clearTimeoutSafe(dissolveStartTimeoutId);
 clearTimeoutSafe(dissolveClearTimeoutId);

 snapBackTimeoutId = null;
 navigateTimeoutId = null;
 dissolveStartTimeoutId = null;
 dissolveClearTimeoutId = null;
}

function computeBoostDuration(delta: number, elapsedMs: number): number {
 const velocity = Math.abs(delta) / Math.max(elapsedMs, 1);
 const distanceScore = Math.min(Math.abs(delta) / Math.max(containerWidth * 0.45, 1), 1);
 const velocityScore = Math.min(velocity / 1.1, 1);
 const score = Math.max(distanceScore, velocityScore);

 if (score >= 0.72) return BOOST_STRONG_DURATION_MS;
 if (score >= 0.28) return BOOST_LIGHT_DURATION_MS;
 return BASE_DURATION_MS;
}

// ─── Looping support ----------------------------------------------------
const loopedPrevOption = $derived<MenuOption | null>(
 prevOption ?? (menuOptions.length ? menuOptions[menuOptions.length - 1] : null)
);

const loopedNextOption = $derived<MenuOption | null>(
 nextOption ?? (menuOptions.length ? menuOptions[0] : null)
);

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
  if (pendingGhostForDissolve) {
   dissolveGhostOption = pendingGhostForDissolve;
   dissolveGhostVisible = true;
    clearTimeoutSafe(dissolveStartTimeoutId);
    clearTimeoutSafe(dissolveClearTimeoutId);
    dissolveStartTimeoutId = setTimeout(() => {
    dissolveGhostVisible = false;
   }, GHOST_DISSOLVE_DELAY_MS);
    dissolveClearTimeoutId = setTimeout(() => {
    dissolveGhostOption = null;
   }, GHOST_DISSOLVE_DELAY_MS + GHOST_DISSOLVE_DURATION_MS);
   pendingGhostForDissolve = null;
  }

    isNavigationPending = false;
    isBoostDragging = false;
    activeDirection = 'none';
    transitionDurationMs = BASE_DURATION_MS;
    clearTimeoutSafe(snapBackTimeoutId);
    clearTimeoutSafe(navigateTimeoutId);
    snapBackTimeoutId = null;
    navigateTimeoutId = null;

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
  if (isAnimating && isNavigationPending) {
   isBoostDragging = true;
   pStartX = e.clientX;
   pStartTime = performance.now();
   (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
   return;
  }

  if (isAnimating || isNavigationPending) return;
  isDragging = true;
  pStartX = e.clientX;
  pStartTime = performance.now();
  // Capture pointer so we still get events if finger leaves the element
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
 }

 function onPointerMove(e: PointerEvent) {
  if (isBoostDragging && isAnimating && isNavigationPending) {
   const delta = e.clientX - pStartX;
   if (delta === 0 || activeDirection === 'none') return;

   const dragDirection: 'prev' | 'next' = delta > 0 ? 'prev' : 'next';

   if (dragDirection === activeDirection) {
    transitionDurationMs = computeBoostDuration(delta, performance.now() - pStartTime);
   }

   return;
  }

  if (!isDragging) return;
  const delta = e.clientX - pStartX;

  // Apply elastic resistance when swiping past the edge
  if (delta > 0 && !loopedPrevOption) {
   offset = delta * EDGE_RESISTANCE;
  } else if (delta < 0 && !loopedNextOption) {
   offset = delta * EDGE_RESISTANCE;
  } else {
   offset = delta;
  }
 }

 function onPointerUp(e: PointerEvent) {
  if (isBoostDragging) {
   isBoostDragging = false;
   return;
  }

  if (!isDragging) return;
  isDragging = false;

  const delta = e.clientX - pStartX;
  const elapsed = Math.max(performance.now() - pStartTime, 1);
  const velocity = Math.abs(delta) / elapsed; // px/ms

  const overThreshold = Math.abs(delta) > containerWidth * DRAG_THRESHOLD;
  const overVelocity = velocity > VELOCITY_THRESHOLD;
  const shouldNavigate = overThreshold || overVelocity;

  if (shouldNavigate && delta > 0 && loopedPrevOption) {
   triggerNavigation('prev');
  } else if (shouldNavigate && delta < 0 && loopedNextOption) {
   triggerNavigation('next');
  } else {
   // Snap back to centre with spring animation
    clearTimeoutSafe(snapBackTimeoutId);
   isAnimating = true;
   offset = 0;
    snapBackTimeoutId = setTimeout(() => {
     if (!isNavigationPending) {
      isAnimating = false;
     }
    }, 360);
  }
 }

 function onPointerCancel() {
  if (isBoostDragging) {
   isBoostDragging = false;
   return;
  }

  if (!isDragging) return;
  // Abort drag — snap back instantly
  isDragging = false;
  clearTimeoutSafe(snapBackTimeoutId);
  isAnimating = true;
  offset = 0;
  snapBackTimeoutId = setTimeout(() => {
   if (!isNavigationPending) {
    isAnimating = false;
   }
  }, 360);
 }

 // ─── Navigation: animate track → call goto() → afterNavigate resets ──

 function triggerNavigation(direction: 'prev' | 'next') {
  if (isAnimating || isNavigationPending) return;
  clearTimeoutSafe(snapBackTimeoutId);
  isAnimating = true;
  isNavigationPending = true;
  activeDirection = direction;
  transitionDurationMs = BASE_DURATION_MS;
  isDragging = false;

  // If user swipes again right after a route reset, force transition back on.
  skipTransition = false;

  // Slide track to fully reveal the ghost slide
  offset = direction === 'prev' ? containerWidth : -containerWidth;

  // Wait for the CSS transition to finish, then actually navigate
  clearTimeoutSafe(navigateTimeoutId);
  navigateTimeoutId = setTimeout(() => {
   const option = direction === 'prev' ? loopedPrevOption : loopedNextOption;
     if (option) {
      pendingGhostForDissolve = option;
      // eslint-disable-next-line svelte/no-navigation-without-resolve
      void goto(`/opzioni-menu/${option.slug}`, {
       noScroll: true,
       keepFocus: true
      });
     } else {
      isNavigationPending = false;
      isAnimating = false;
     }
  }, 280);
 }

onDestroy(() => {
 clearTransientTimers();
});

 // ─── Derived CSS ──────────────────────────────────────────────────────

 const transition = $derived(
  // No transition while finger is down or reset is instant
  isDragging || skipTransition
   ? 'none'
   : `transform ${transitionDurationMs}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
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
 {#if dissolveGhostOption}
  <div
  class={`pointer-events-none absolute inset-0 z-7 transition-[opacity,filter] duration-900 ease-in-out ${
    dissolveGhostVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-[1.35cqw]'
   }`}
  >
   <GhostSlide option={dissolveGhostOption} />
  </div>
 {/if}

 <!--
  ▲ OVERLAY ARROWS
  Positioned absolute within this wrapper.
  They live OUTSIDE the clip container and the moving track.
  Result: they never translate during swipe.
 -->
   <CarouselArrows
    prevOption={loopedPrevOption}
    nextOption={loopedNextOption}
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
    {#if loopedPrevOption}
     <GhostSlide option={loopedPrevOption} />
    {/if}
   </div>

   <!-- ② Real page content (always centred at rest) -->
  <div class="h-full flex-none" style="width: 33.333%">
    {@render children()}
   </div>

   <!-- ③ Ghost Next (off-screen right) -->
  <div class="h-full flex-none" style="width: 33.333%">
    {#if loopedNextOption}
     <GhostSlide option={loopedNextOption} />
    {/if}
   </div>
  </div>
 </div>
</div>
 