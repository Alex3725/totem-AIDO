import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { writable } from 'svelte/store';
import { menuOptions } from '$lib/data/menu-options';

export const status = writable("User is active");
export const statusColor = writable("green");
export const isIdleMode = writable(false);

const defaultIdleCarouselInterval = 3500;

function getMenuIndexFromPath(pathname: string) {
  const match = pathname.match(/^\/opzioni-menu\/([^/?#]+)/);
  const slug = match?.[1];

  if (!slug) return -1;

  return menuOptions.findIndex((option) => option.slug === slug);
}

export function useIdle(
  idleTime: number = 900_000,
  idleCarouselInterval: number = defaultIdleCarouselInterval
) {
  onMount(() => {
    let timeout = 0;
    let isIdle = false;
    let idleCarouselTimer = 0;
    let idleIndex = 0;

    function clearIdleCarouselTimer() {
      if (idleCarouselTimer) {
        clearInterval(idleCarouselTimer);
        idleCarouselTimer = 0;
      }
    }

    function startIdleCarousel(startIndex: number) {
      clearIdleCarouselTimer();
      idleIndex = startIndex >= 0 ? startIndex : 0;

      idleCarouselTimer = window.setInterval(async () => {
        idleIndex = (idleIndex + 1) % menuOptions.length;
        await goto(`/opzioni-menu/${menuOptions[idleIndex].slug}`, {
          replaceState: true,
          noScroll: true,
          keepFocus: true
        });
      }, idleCarouselInterval);
    }

    async function setIdle() {
      if (isIdle) return;
      isIdle = true;

      status.set("User is not active");
      statusColor.set("red");
      isIdleMode.set(true);

      const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
      const menuIndex = getMenuIndexFromPath(pathname);

      if (menuIndex === -1) {
        await goto('/opzioni-menu/faq', { replaceState: true, noScroll: true, keepFocus: true });
        startIdleCarousel(0);
        return;
      }

      startIdleCarousel(menuIndex);
    }

    function setActive() {
      if (isIdle) {
        status.set("User is active");
        statusColor.set("green");
        isIdleMode.set(false);
        clearIdleCarouselTimer();
      }
      isIdle = false;
      if (timeout) clearTimeout(timeout);
      timeout = window.setTimeout(setIdle, idleTime);
    }

    const events: (keyof DocumentEventMap)[] = [
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click"
    ];

    events.forEach(event => document.addEventListener(event, setActive));

    setActive();

    return () => {
      events.forEach(event => document.removeEventListener(event, setActive));
      if (timeout) clearTimeout(timeout);
      clearIdleCarouselTimer();
      isIdleMode.set(false);
    };
  });
}
