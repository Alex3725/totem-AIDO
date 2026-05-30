<script lang="ts">
	let {
		subtitle,
		imageSrc,
		imageAlt
	}: {
		subtitle: string;
		imageSrc: string;
		imageAlt: string;
	} = $props();
</script>

<p
	class="m-0 text-center text-[2.55cqw] font-bold leading-[1.15] text-[#111827] landscape:text-[clamp(1.8cqw,1.35vw,2.3cqw)] [@media(max-width:70vw)]:text-[clamp(2.1cqw,2.3vw,2.55cqw)] [@media(max-height:70dvh)]:text-[clamp(2.1cqw,2.3vw,2.55cqw)]"
>{subtitle}</p>

<div
	class="flex flex-1 min-h-0 items-center justify-center rounded-[1.45cqw] [background:radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.24),transparent_48%),linear-gradient(145deg,#d40000,#ab0000)] p-[1.2cqw] shadow-[inset_0_0_0_0.08cqw_rgba(255,255,255,0.24)]"
>
	<div
		class="w-[min(100%,53cqw)] aspect-square max-h-full overflow-hidden rounded-[1.1cqw] bg-white p-[0.18cqw] shadow-[0_0.5cqw_1.2cqw_rgba(0,0,0,0.24)] landscape:w-[min(100%,50cqw)] [@media(max-width:70vw)]:w-[min(100%,56cqw)] [@media(max-height:70dvh)]:w-[min(100%,56cqw)]"
	>
		<img
			src={imageSrc}
			alt={imageAlt}
			class="h-full w-full object-cover object-[center_54%] scale-[0.92]"
		/>
	</div>
</div>
