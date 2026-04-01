<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import MenuDots from '$lib/components/menu/MenuDots.svelte';

	let { children } = $props();

	const routeSegments = $derived(
		(page.route.id ?? '')
			.split('/')
			.filter(Boolean)
	);

	const isTopLevelOpzioniMenu = $derived(
		routeSegments[0] === 'opzioni-menu' && routeSegments.length === 2
	);

	const isChildPage = $derived(
		page.route.id !== '/' && !isTopLevelOpzioniMenu
	);
</script>

<main
	class="min-h-dvh flex items-center justify-center p-0
	       [background:linear-gradient(120deg,#a90000_0%,#713257_48%,#3a64ad_100%)]"
>
	<section
		class="w-[min(94vw,calc(94dvh*9/16))] h-[min(94dvh,calc(94vw*16/9))]
		       rounded-[2.1cqw] p-[0.95cqw] bg-[#5b7cbd] @container-[size]
		       landscape:w-[min(84vw,calc(84dvh*3/2))] landscape:h-[min(84dvh,calc(84vw*2/3))]
		       landscape:rounded-[4vmin] landscape:p-[1.05vmin]"
	>
		<div
			class="h-full rounded-[2.2cqw] border-[max(2px,0.35cqw)] border-solid border-[#8db9ff]
			       bg-white p-[1.25cqw] flex flex-col min-h-0 gap-[1.25cqh]"
		>
			<!-- ═══════════════════════════
			     HEADER — tre colonne allineate
			     ═══════════════════════════ -->
			<header
				class="grid grid-cols-[1fr_auto_1fr] items-center
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

			<!-- CONTENUTO PRINCIPALE -->
			<section class="flex-1 min-h-0 overflow-hidden flex flex-col">
				{@render children()}
			</section>

			<!-- ═══════════════════════════
			     FOOTER — stessa grid dell'header
			     ═══════════════════════════ -->
			<footer
				class="grid grid-cols-[1fr_auto_1fr] items-center min-h-[4.05cqh]"
			>
				<!-- Sinistra: vuota (allineata con logo Marconi) -->
				<div></div>

				<!-- Centro: dots su pagine primarie, freccia su pagine figlie -->
				<div class="flex items-center justify-center">
					{#if isChildPage}
						<a
							href="javascript:history.back()"
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
						</a>
					{:else}
						<MenuDots />
					{/if}
				</div>

				<!-- Destra: DONAtello AI (allineato con logo Papa Giovanni) -->
				<div class="flex items-center justify-end">
					<a
						href="/chat-assistenza"
						class="inline-flex items-center justify-center
						       w-[9cqw] h-[9cqw] min-w-[3.4rem] min-h-[3.4rem]
						       rounded-full bg-[#5b7cbd]
						       shadow-[0_0.35cqw_0.9cqw_rgba(0,0,0,0.2)]"
						aria-label="Apri chat assistenza DONAtello"
					>
						<img
							src="/img/DONAtello_AI.png"
							alt="DONAtello AI"
							class="w-[74%] h-[74%] object-contain"
						/>
					</a>
				</div>
			</footer>
		</div>
	</section>
</main>