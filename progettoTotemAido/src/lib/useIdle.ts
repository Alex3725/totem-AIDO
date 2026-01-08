import { onMount, onDestroy } from 'svelte';
import { writable, get } from 'svelte/store';
import { goto } from '$app/navigation';
import { lastPage } from './stores/lastPage';

export const status = writable("User is active");
export const statusColor = writable("green");

export function useIdle(
  idleTime: number = 600_000,
  idleRoute: string = '/stackPage',
  graceTime: number = 0 // ⬅ tempo extra prima del ritorno
) {
  let timeout: number;
  let returnTimeout: number;
  let isIdle = false;

  function setIdle() {
    isIdle = true;
    status.set("User is not active");
    statusColor.set("red");
    goto(idleRoute);
  }

  function setActive() {
    clearTimeout(timeout);

    if (isIdle) {
      isIdle = false;
      status.set("User is active");
      statusColor.set("green");

      clearTimeout(returnTimeout);
      returnTimeout = window.setTimeout(() => {
        const page = get(lastPage);
        if (page && page !== idleRoute) {
          goto(page);
        }
      }, graceTime);
    }

    timeout = window.setTimeout(setIdle, idleTime);
  }

  onMount(() => {
    const events: (keyof DocumentEventMap)[] = [
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click"
    ];

    events.forEach(e => document.addEventListener(e, setActive));
    setActive();

    return () => {
      events.forEach(e => document.removeEventListener(e, setActive));
      clearTimeout(timeout);
      clearTimeout(returnTimeout);
    };
  });
}
