<script lang="ts">
  import { goto } from '$app/navigation';
  let { titolo, route }: { titolo: string; route: string } = $props();

  function handleClick() {
    goto(route);
  }
  
</script>

<button
    class="max-w-full rounded-[1.2cqw] bg-white px-[clamp(0.85rem,3.25cqw,4.25cqw)] py-[clamp(0.45rem,1.2cqh,1.6cqh)]
           text-[clamp(1rem,3.2cqw,4.7cqw)] font-black leading-tight text-[#121212]
           shadow-[0_0.55cqw_0.75cqw_rgba(0,0,0,0.38)] flex items-center justify-center text-center"
  onclick={handleClick}
>
  {titolo}
</button>