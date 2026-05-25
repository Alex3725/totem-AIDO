<script lang="ts">
  import { goto } from '$app/navigation';
  let { titolo, route }: { titolo: string; route: string } = $props();

  function handleClick() {
    goto(route);
  }
  
</script>

<button
    class=" rounded-[1.2cqw] bg-white px-[4.25cqw] py-[1.6cqh]
           text-[4.7cqw] font-black leading-none text-[#121212]
           shadow-[0_0.55cqw_0.75cqw_rgba(0,0,0,0.38)] flex items-center "
  onclick={handleClick}
>
  {titolo}
</button>