<script lang="ts">
 import './layout.css';
 import { page } from '$app/state';
 import MenuDots from '$lib/components/menu/MenuDots.svelte';
 import SwipeCarousel from '$lib/components/carousel/Swipecarousel.svelte';
 import { menuOptions } from '$lib/data/menu-options';
 import type { MenuOption, MenuOptionSlug } from '$lib/data/menu-options';
 import { setMenuDotsSlug } from '$lib/stores/menu-dots.store';
 import AssistFloatingButton from '$lib/components/common/AssistFloatingButton.svelte';
 import { goto } from '$app/navigation';
 import { resolve } from '$app/paths';

 // Rename the layout's implicit children snippet to avoid
 // shadowing the SwipeCarousel's children snippet further down.
 let { children: pageChildren } = $props();

 // ─── Route analysis ────────────────────────────────────────────────────

 const routeSegments = $derived((page.route.id ?? '').split('/').filter(Boolean));

 /** Pagine madri: /opzioni-menu/[slug] */
 const isMenuParentPage = $derived(
 routeSegments[0] === 'opzioni-menu' &&
     routeSegments.length === 2 &&
     routeSegments[1] !== 'chat-assistenza'
 );

 /** Pagine figlie: /opzioni-menu/[slug]/... e la chat speciale */
 const isMenuChildPage = $derived(
 routeSegments[0] === 'opzioni-menu' &&
  (routeSegments.length >= 3 || routeSegments[1] === 'chat-assistenza')
 );

/** La chat assistenza va trattata come una pagina speciale senza FAB */
const isChatAssistancePage = $derived(
 routeSegments[0] === 'opzioni-menu' && routeSegments[1] === 'chat-assistenza'
);

 /** Tutto ciò che non è home né pagina madre mostra il back */
 const isChildPage = $derived(
  isMenuChildPage || (page.route.id !== '/' && !isMenuParentPage)
 );

 // ─── Carousel context (only meaningful when isTopLevelOpzioniMenu) ─────

 const isCarouselMode = $derived(isMenuParentPage);

 const currentMenuIndex = $derived(
       isMenuParentPage ? menuOptions.findIndex((o) => o.slug === routeSegments[1]) : -1
 );

 // No wrapping: first page has no prev, last page has no next.
 const prevMenuOption: MenuOption | null = $derived(
  currentMenuIndex > 0 ? menuOptions[currentMenuIndex - 1] : null
 );

 const nextMenuOption: MenuOption | null = $derived(
  currentMenuIndex >= 0 && currentMenuIndex < menuOptions.length - 1
   ? menuOptions[currentMenuIndex + 1]
   : null
 );

 const isFirstMenuPage = $derived(currentMenuIndex === 0);

 // ─── Keep MenuDots active-dot in sync with current route ───────────────
 $effect(() => {
       if (isMenuParentPage && routeSegments[1]) {
   setMenuDotsSlug(routeSegments[1] as MenuOptionSlug);
  }
  //redirect from home to first menu page
  if (page.url.pathname === '/') {
     goto(resolve('/opzioni-menu/faq'));
  }
 });

 // ─── Footer logic ──────────────────────────────────────────────────────
 // • Home page     → dots
 // • First menu page (faq) → dots
 // • Other menu pages      → back button   (requirement: "altre pagine → back")
 // • Child pages           → back button
 const showMenuDots = $derived(!isChildPage || isFirstMenuPage);
 const showBack = $derived(isChildPage && !isFirstMenuPage);
</script>

<main
 class="min-h-dvh flex items-center justify-center p-0 bg-[#222]"
>
 <section
  class="w-[min(100vw,56.25dvh)] aspect-9/16 overflow-auto p-[0.95cqw]
      [background:linear-gradient(120deg,#a90000_0%,#713257_48%,#3a64ad_100%)] @container-[size]"
 >
  <div
   class="w-full h-full overflow-hidden rounded-[2.2cqw] border-[max(9px,0.55cqw)] border-solid border-[#438afc]
        bg-white p-[1.25cqw] flex flex-col min-h-0 gap-[1.25cqh]"
  >
   <!-- ═══════════════════════════
        HEADER — tre colonne allineate
        ═══════════════════════════ -->
   <header
    class="w-full grid grid-cols-[1fr_auto_1fr] items-center
           h-[11.2cqh] min-h-[5.6cqw]
           rounded-[1.5cqw] bg-[#f6f6f6]
           px-[1.2cqw]"
   >
    <!-- Sinistra: logo Marconi -->
    <div class="flex items-center justify-start">
     <img
         src="/img/logo_marconi_nero.png"
      alt="Logo Marconi"
      class="h-[min(7.8cqh,4.3rem)] max-w-[15.5cqw] w-auto object-contain"
     />
    </div>

    <!-- Centro: logo AIDO -->
    <div class="flex items-center justify-center">
     <img
      src="/img/logoAIDO.png"
      alt="Logo AIDO"
      class="h-[min(14cqh,9rem)] max-w-[16cqw] w-auto object-contain"
     />
    </div>

    <!-- Destra: logo Papa Giovanni -->
    <div class="flex items-center justify-end">
     <img
      src="/img/logo_papa_giovanni.png"
      alt="Logo Papa Giovanni"
      class="h-[min(7.8cqh,4.3rem)] max-w-[15.5cqw] w-auto object-contain"
     />
    </div>
   </header>

   <!-- ═══════════════════════════
        CONTENUTO PRINCIPALE
        Carousel mode: SwipeCarousel wraps the page content.
        Normal mode: page content rendered directly.
        ═══════════════════════════ -->
   <section class="w-full flex-1 min-h-0 overflow-hidden flex flex-col">
    {#if isCarouselMode}
     <!--
      Pass prevOption / nextOption so the carousel knows which ghost
      slides to render and which URLs to navigate to.

      The page content ({@render pageChildren()}) becomes the implicit
      `children` snippet of SwipeCarousel.
     -->
     <SwipeCarousel prevOption={prevMenuOption} nextOption={nextMenuOption}>
      {@render pageChildren()}
     </SwipeCarousel>
    {:else}
     {@render pageChildren()}
    {/if}
   </section>

   <!-- ═══════════════════════════
        FOOTER — stessa grid dell'header
        ═══════════════════════════ -->
   <footer class="grid grid-cols-[1fr_auto_1fr] items-center min-h-[4.05cqh]">
    <!-- Sinistra: vuota -->
    <div></div>

    <!-- Centro: dots (home / prima pagina menu) oppure back (altre pagine) -->
    <div class="flex items-center justify-center">
     {#if showMenuDots}
      <MenuDots />
     {:else if showBack}
      <button
       type="button"
       onclick={() => history.back()}
       class="inline-flex items-center justify-center
              w-[9cqw] h-[9cqw] min-w-[3.4rem] min-h-[3.4rem]
              rounded-full bg-[#d40000]
          shadow-[0_0.35cqw_0.9cqw_rgba(0,0,0,0.18)]"
       aria-label="Torna indietro"
      >
       <img
        src="/img/Indietro_pulsante.png"
        alt=""
        class="w-[5.2cqw] h-[5.2cqw] brightness-0 invert"
       />
      </button>
     {/if}
    </div>

     <!-- Destra: DONAtello AI -->
     {#if !isChatAssistancePage}
      <AssistFloatingButton />
     {/if}
   </footer>
  </div>
 </section>
</main>
