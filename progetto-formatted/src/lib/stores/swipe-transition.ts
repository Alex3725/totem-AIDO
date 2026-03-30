import { get, writable } from 'svelte/store';

export type SwipeDirection = 'left' | 'right' | 'none';

const swipeDirection = writable<SwipeDirection>('none');

export function setSwipeDirection(direction: SwipeDirection) {
	swipeDirection.set(direction);
}

export function consumeSwipeDirection(): SwipeDirection {
	const direction = get(swipeDirection);
	swipeDirection.set('none');
	return direction;
}
