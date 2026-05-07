<script lang="ts">

	import PulsanteContent from '$lib/components/newComponent/PulsanteContent.svelte';



</script>

<div class="flex h-full w-full">
	<div class="h-full w-[1.15cqw] bg-white"></div>
	<div
		class="flex h-full flex-1 select-none flex-col items-center rounded-[1.45cqw] bg-[#d40000] px-[2.75cqw] pb-[2.2cqh] pt-[2.8cqh] text-center text-white"
	>
	<div class="flex h-[20%] w-full items-center justify-center font-black">
		<h1 class="text-[5rem] leading-none text-white">Impara Giocando</h1>
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
			titolo="Gioca"
			route="/opzioni-menu/impara-giocando/gioca"
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
