<script lang="ts">
	import './layout.css';


	let { children } = $props();
</script>

<main
	class="min-h-dvh flex items-center justify-center p-0 [background:linear-gradient(120deg,#a90000_0%,#713257_48%,#3a64ad_100%)]"
>
	<section
		class="w-[min(94vw,calc(94dvh*9/16))] h-[min(94dvh,calc(94vw*16/9))] rounded-[2.1cqw] p-[0.95cqw] bg-[#5b7cbd] @container-[size] landscape:w-[min(84vw,calc(84dvh*3/2))] landscape:h-[min(84dvh,calc(84vw*2/3))] landscape:rounded-[4vmin] landscape:p-[1.05vmin]"
	>
		<div
			class="h-full rounded-[2.2cqw] border-[max(2px,0.35cqw)] border-solid border-[#8db9ff] bg-white p-[1.25cqw] flex min-h-0 flex-col gap-[1.25cqh]"
		> <!-- card bianca -->
			<header class="h-[11.2cqh] min-h-[5.6cqw] rounded-[1.5cqw] bg-[#f6f6f6] px-[1.2cqw] flex items-center justify-center">
				<nav><!-- loghi sponsor --></nav>
			</header>

			<section class="flex-1 min-h-0 overflow-hidden flex flex-col"><!-- pagina rosse  (contenuto) -->
				{@render children()}
			</section>

			<footer class="flex items-center justify-between min-h-[4.05cqh]">
				<div><!--menu doots--></div>
				<div><!-- tasto robottino_donatello --></div>
			</footer>
		</div>
	</section>
</main>


