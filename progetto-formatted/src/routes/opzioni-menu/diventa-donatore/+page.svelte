<script lang="ts">
	import { goto } from '$app/navigation';

	const goToStore = (route: string) => goto(route);
</script>

<div class="flex h-full w-full">
	<div class="h-full w-[1.15cqw] bg-white"></div>
	<div class="relative flex h-full flex-1 select-none flex-col items-center overflow-hidden
            rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh]
			text-center text-white">

	<!-- Rumore di sfondo decorativo -->
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
		style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E'); background-size: 180px;"
	></div>

	<!-- Titolo -->
	<div class="flex h-[20%] w-full items-center justify-center">
		<h1 class="text-[5rem] font-black leading-none tracking-tight text-white drop-shadow-md">
			Diventa Donatore
		</h1>
	</div>

	<!-- Corpo -->
	<div class="flex w-full flex-1 flex-col items-center gap-[1cqh] px-[1.6cqw] py-[0.6cqh]">

		<!-- QR shell -->
		<div class="flex flex-1 items-center justify-center w-full">
			<div class="mx-auto flex aspect-square w-[min(100%,58cqw)] shrink-0 items-center
			            justify-center rounded-[2cqw] border border-white/25 bg-white/10
			            p-[1.1cqw] shadow-[0_1cqw_2.2cqw_rgba(0,0,0,0.25)] backdrop-blur-sm">
				<div class="flex h-full w-full items-center justify-center rounded-[1.45cqw] bg-white p-[0.55cqw]">
					<img
						src="/img/DigitalAido.png"
						alt="QR code per iscrizione AIDO"
						class="h-full w-full object-contain"
					/>
				</div>
			</div>
		</div>

		<!-- Pulsanti store -->
		<div class="flex w-full flex-col items-center gap-[0.8cqh]">
			<div class="flex w-[min(100%,58cqw)] items-center justify-center gap-[2cqw]">

				<button
					type="button"
					aria-label="Apri QR code Google Play"
					onclick={() => goToStore('/opzioni-menu/diventa-donatore/play-store')}
					class="flex w-1/2 cursor-pointer items-center justify-center rounded-[2cqw]
					       border border-white/25 bg-white/10 p-[1.1cqw]
					       shadow-[0_1cqw_2.2cqw_rgba(0,0,0,0.25)] backdrop-blur-sm
					       transition-all duration-150 active:scale-95 active:opacity-80"
				>
					<img
						src="/img/GooglePlayButton.png"
						alt="Get it on Google Play"
						class="h-auto w-full rounded-[0.8cqw] object-contain"
					/>
				</button>

				<button
					type="button"
					aria-label="Apri QR code App Store"
					onclick={() => goToStore('/opzioni-menu/diventa-donatore/apple-store')}
					class="flex w-1/2 cursor-pointer items-center justify-center rounded-[2cqw]
					       border border-white/25 bg-white/10 p-[1.1cqw]
					       shadow-[0_1cqw_2.2cqw_rgba(0,0,0,0.25)] backdrop-blur-sm
					       transition-all duration-150 active:scale-95 active:opacity-80"
				>
					<img
						src="/img/AppStoreButton.png"
						alt="Download on the App Store"
						class="h-auto w-full rounded-[0.8cqw] object-contain"
					/>
				</button>

			</div>
		</div>

	</div>
	</div>
	<div class="h-full w-[1.15cqw] bg-white"></div>
</div>