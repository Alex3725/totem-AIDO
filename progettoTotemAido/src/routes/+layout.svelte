<script lang="ts">
  import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();


  import { status, statusColor, useIdle } from '$lib/useIdle';

  import { afterNavigate } from '$app/navigation';
  import { lastPage } from '$lib/stores/lastPage';
    afterNavigate(({ to }) => {
    if (to && to.url.pathname !== '/stackPage') {
      lastPage.set(to.url.pathname + to.url.search);
    }
  });

  // 10 minuti = 600_000 idle, attende 3 secondi prima di tornare 
  useIdle(2000, '/stackPage', 0); // 10 minuti, ritorno immediato

</script>

<div class="w-screen h-screen overflow-hidden bg-linear-to-b from-[#7b0012] via-[#b3152a] via-60% to-[#243a7a] flex items-center justify-center">
  <!-- Container bianco arrotondato -->
  <div class="w-[60vw] h-[90vh]  relative flex flex-col items-center justify-center">
    {@render children()}
    
  </div>
</div>


