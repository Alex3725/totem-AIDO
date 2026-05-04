<script lang="ts">
	import { onMount } from 'svelte';
	import PulsanteContent from '$lib/components/newComponent/PulsanteContent.svelte';
	import { menuOptions } from '$lib/data/menu-options';

	const scopriOption = menuOptions.find((option) => option.slug === 'scopri');
	const orbitItems = [
		{
			title: 'Donazione Organi',
			description: 'Scopri il percorso completo dalla scelta al trapianto.',
			tag: 'Percorso'
		},
		{
			title: 'Testimonianze',
			description: 'Voci reali di chi ha scelto di donare e ricevere.',
			tag: 'Storie'
		},
		{
			title: 'Come Iscriversi',
			description: "Tutti i passaggi rapidi per aderire all'AIDO.",
			tag: 'Guida'
		},
		{
			title: 'FAQ Rapide',
			description: 'Risposte immediate ai dubbi piu comuni.',
			tag: 'Supporto'
		},
		{
			title: 'Materiali PDF',
			description: 'Volantini informativi pronti da consultare.',
			tag: 'Documenti'
		}
	] as const;

	let orbitRoot = $state<HTMLDivElement | null>(null);
	let orbitActiveIndex = $state(0);
	let orbitRadius = $state(280);
	let orbitSmallRadius = $state(28);
	let orbitTouchStartX = $state(0);
	let orbitTouchStartY = $state(0);
	let orbitAutoplayTimer = $state<ReturnType<typeof setInterval> | null>(null);

	function orbitNormalizedDistance(index: number, centerIndex: number, total: number) {
		const raw = (index - centerIndex + total) % total;
		if (raw > total / 2) return raw - total;
		return raw;
	}

	function updateOrbitGeometry() {
		if (!orbitRoot) return;

		const width = orbitRoot.clientWidth;
		const height = orbitRoot.clientHeight;
		orbitRadius = Math.max(130, Math.min(300, width * 0.38));
		orbitSmallRadius = Math.max(14, Math.min(34, height * 0.12));
	}

	function renderOrbitCards() {
		if (!orbitRoot) return;

		const cards = Array.from(orbitRoot.querySelectorAll<HTMLElement>('.menu-orbit-card'));
		const total = cards.length;
		if (total === 0) return;

		cards.forEach((card, index) => {
			const relative = orbitNormalizedDistance(index, orbitActiveIndex, total);
			const visible = Math.abs(relative) <= 1;
			const angle = relative * 1.05;

			const x = Math.sin(angle) * orbitRadius;
			const y = Math.cos(angle) * orbitSmallRadius;
			const scale = relative === 0 ? 1.25 : 0.85;
			const z = relative === 0 ? 10 : 5;

			card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${visible ? scale : 0.64})`;
			card.style.zIndex = String(visible ? z : 1);
			card.style.opacity = visible ? '1' : '0';
			card.style.pointerEvents = visible ? 'auto' : 'none';
		});
	}

	function orbitGoTo(index: number) {
		const total = orbitItems.length;
		orbitActiveIndex = (index + total) % total;
		renderOrbitCards();
	}

	function orbitNext() {
		orbitGoTo(orbitActiveIndex + 1);
	}

	function orbitPrev() {
		orbitGoTo(orbitActiveIndex - 1);
	}

	function clearOrbitAutoplay() {
		if (!orbitAutoplayTimer) return;
		clearInterval(orbitAutoplayTimer);
		orbitAutoplayTimer = null;
	}

	function restartOrbitAutoplay() {
		clearOrbitAutoplay();
		orbitAutoplayTimer = setInterval(() => {
			orbitNext();
		}, 2600);
	}

	function handleOrbitTouchStart(event: TouchEvent) {
		orbitTouchStartX = event.touches[0].clientX;
		orbitTouchStartY = event.touches[0].clientY;
	}

	function handleOrbitTouchEnd(event: TouchEvent) {
		const endX = event.changedTouches[0].clientX;
		const endY = event.changedTouches[0].clientY;
		const deltaX = endX - orbitTouchStartX;
		const deltaY = endY - orbitTouchStartY;

		if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

		if (deltaX < 0) {
			orbitNext();
		} else {
			orbitPrev();
		}

		restartOrbitAutoplay();
	}

	onMount(() => {
		window.setTimeout(() => {
			updateOrbitGeometry();
			renderOrbitCards();
			restartOrbitAutoplay();
		}, 0);

		const onResize = () => {
			updateOrbitGeometry();
			renderOrbitCards();
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
			clearOrbitAutoplay();
		};
	});
</script>

<div class="flex h-full w-full">
	<div class="h-full w-[1.15cqw] bg-white"></div>
	<div
		class="flex h-full flex-1 select-none flex-col items-center rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh] text-center text-white"
	>
	<div class="flex h-[20%] w-full items-center justify-center font-black">
		<h1 class="text-[5rem] leading-none text-white">Impara-sium</h1>
	</div>

	<div class="flex w-full flex-1 flex-col items-center justify-center px-[1.2cqw] py-[0.8cqh]">
		<section
			class="menu-orbit-carousel"
			aria-label="Carousel scopri"
			aria-roledescription="carousel"
		>
			
		</section>
	</div>

	<div class="flex h-[20%] w-full flex-col items-center justify-center p-3">
		<PulsanteContent
			titolo={scopriOption?.ctaLabel ?? 'Scopri subito!'}
			route="/opzioni-menu/impara-sium/pagina-content"
		/>
	</div>
	</div>
	<div class="h-full w-[1.15cqw] bg-white"></div>
</div>

<style>
	.menu-orbit-carousel {
		width: 100%;
		max-width: 100%;
		padding: 0;
		background: transparent;
		border: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.menu-orbit-stage {
		position: relative;
		width: min(96%, 74cqw);
		height: 31cqh;
		margin-inline: auto;
		touch-action: pan-y;
	}

	.menu-orbit-track {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.menu-orbit-card {
		position: absolute;
		left: 50%;
		top: 50%;
		width: clamp(11.2rem, 20cqw, 14rem);
		min-height: 22cqh;
		padding: 1.35cqh 1cqw 1.25cqh;
		border-radius: 1.55cqw;
		background: #fff9f0;
		border: 1px solid rgba(233, 196, 143, 0.95);
		box-shadow: 0 0.9cqw 1.5cqw rgba(61, 42, 16, 0.2);
		transition: transform 0.6s ease, opacity 0.6s ease;
		transform: translate(-50%, -50%);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.menu-orbit-tag {
		display: inline-flex;
		padding: 0.28cqh 0.62cqw;
		border-radius: 999px;
		font-size: 1.35cqw;
		font-weight: 800;
		text-transform: uppercase;
		background: rgba(179, 76, 30, 0.14);
		color: #7a3214;
		align-self: center;
	}

	.menu-orbit-card h3 {
		margin: 0.8cqh 0 0.55cqh;
		font-size: 2cqw;
		line-height: 1.15;
		color: #3d2a10;
	}

	.menu-orbit-card p {
		margin: 0;
		font-size: 1.42cqw;
		line-height: 1.32;
		font-weight: 700;
		color: #5f4632;
		max-width: 100%;
	}
</style>
