<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { previousRoute } from '$lib/stores/navigation.store';

	let returnRoute = '/';
	let showIdleMessage = true;

	onMount(() => {
		const unsubscribe = previousRoute.subscribe((route) => {
			returnRoute = route || '/';
		});

		let hasActivityTriggered = false;

		const handleUserActivity = (e: Event) => {
			if (!hasActivityTriggered) {
				console.log('Activity detected:', e.type, 'Going to:', returnRoute);
				hasActivityTriggered = true;
				showIdleMessage = false;
				goto(returnRoute);
			}
		};

		const events = ['click', 'keydown', 'touchstart', 'mousemove', 'touchmove', 'pointerdown'];
		events.forEach((event) => {
			document.addEventListener(event, handleUserActivity, { passive: true });
		});

		return () => {
			unsubscribe();
			events.forEach((event) => {
				document.removeEventListener(event, handleUserActivity);
			});
		};
	});
</script>

<main class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-orange-500 px-4 py-8">
	<div
		class="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-orange-200/30 blur-3xl"
	></div>

	<section class="relative z-10 w-full max-w-2xl rounded-3xl bg-white/95 p-8 text-center shadow-2xl sm:p-12">
		<div class="mb-6">
			<span class="text-6xl">😴</span>
		</div>

		<p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Screensaver</p>
		<h1 class="mb-4 text-3xl font-black text-slate-900 sm:text-4xl">Dispositivo in pausa</h1>

		<p class="mb-8 text-lg leading-relaxed text-slate-700">
			Non c'è stata attività per un po'. Clicca, tocca lo schermo o premi un tasto per tornare.
		</p>

		<div class="space-y-3">
			<button
				type="button"
				onclick={() => goto(returnRoute)}
				class="w-full rounded-full bg-red-700 px-7 py-4 text-lg font-bold text-white transition hover:bg-red-800 active:scale-95"
			>
				Torna indietro →
			</button>
			<p class="text-xs text-slate-500">O muovi il mouse, clicca o tocca lo schermo per continuare</p>
		</div>
	</section>
</main>