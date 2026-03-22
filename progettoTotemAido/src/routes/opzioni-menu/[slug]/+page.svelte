<script lang="ts">
	import OptionDetailCardWithZoom from '$lib/components/menu/OptionDetailCardWithZoom.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<OptionDetailCardWithZoom
	option={data.option}
	previousOption={data.previousOption}
	nextOption={data.nextOption}
/>
