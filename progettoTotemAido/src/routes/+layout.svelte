<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AfkMainPagesScroller from '$lib/components/common/AfkMainPagesScroller.svelte';
	import type { MenuOptionSlug } from '$lib/data/menu-options';

	let { children } = $props();


  import { idleOriginPath, isIdleMode, useIdle } from '$lib/useIdle';

	function getSlugFromPath(pathname: string): MenuOptionSlug | '' {
		const matcher = pathname.match(/^\/(opzioni-menu|contenuti|esempio)\/([^/?#]+)/);
		const slug = matcher?.[2] ?? '';

		const validSlugs: MenuOptionSlug[] = [
			'faq',
			'diventa-donatore',
			'processo-donazione',
			'processo-scelta',
			'scopri'
		];

		return validSlugs.includes(slug as MenuOptionSlug) ? (slug as MenuOptionSlug) : 'faq';
	}

	let afkStartSlug = $derived(getSlugFromPath($idleOriginPath));

	// AFK overlay in-page: mostra il carosello principale in auto-scroll.
	useIdle(5000);

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

{#if $isIdleMode}
	<div class="fixed inset-0 z-[999] h-screen w-full pointer-events-none">
		<AfkMainPagesScroller initialSlug={afkStartSlug} />
		<div class="absolute inset-0 z-[2000] bg-slate-900/50 backdrop-blur-[1px]"></div>
	</div>
{/if}
