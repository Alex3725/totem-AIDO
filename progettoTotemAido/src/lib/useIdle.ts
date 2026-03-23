import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export const status = writable("User is active");
export const statusColor = writable("green");
export const isIdleMode = writable(false);
export const idleOriginPath = writable('/');

export function useIdle(idleTime: number = 600_000) {
  onMount(() => {
    let timeout = 0;
    let isIdle = false;

    function setIdle() {
      isIdle = true;
      const originPath = typeof window !== 'undefined' ? window.location.pathname : '/';

      status.set("User is not active");
      statusColor.set("red");
      idleOriginPath.set(originPath);
      isIdleMode.set(true);
    }

    function setActive() {
      if (isIdle) {
        status.set("User is active");
        statusColor.set("green");
        isIdleMode.set(false);
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
      isIdleMode.set(false);
    };
  });
}
