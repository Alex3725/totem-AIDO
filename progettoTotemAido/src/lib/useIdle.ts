import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { previousRoute } from './stores/navigation.store';

export const status = writable("User is active");
export const statusColor = writable("green");

export function useIdle(idleTime: number = 600_000, idleRoute: string = '/idle') {
  onMount(() => {
    let timeout: number;
    let isIdle = false;
    let currentRoute = '/';

    function setIdle() {
      isIdle = true;
      status.set("User is not active");
      statusColor.set("red");
      previousRoute.set(currentRoute);
      goto(idleRoute);
    }

    function setActive() {
      if (isIdle) {
        status.set("User is active");
        statusColor.set("green");
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

    if (typeof window !== 'undefined') {
      currentRoute = window.location.pathname;
    }

    setActive();
  });
}
