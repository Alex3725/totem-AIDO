<script lang="ts">
  import { goto } from '$app/navigation';

  function handleClick() {
    goto(route);
  }
  
  let { titolo, route }: { titolo: string; route: string } = $props();
</script>

<button
  class="w-full max-w-md h-14 bg-white hover:bg-gray-50 active:bg-gray-100 
         border-2 border-gray-200 hover:border-gray-300 active:border-gray-400 
         rounded-xl font-semibold text-lg text-gray-800 shadow-lg 
         hover:shadow-xl active:shadow-md transition-all duration-200 
         flex items-center justify-center px-6 focus:outline-none focus:ring-4 
         focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
  onclick={handleClick}
>
  {titolo}
</button>