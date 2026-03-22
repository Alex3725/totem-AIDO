<script lang="ts">
  import Carousel from '$lib/components/common/Carousel.svelte';
  import { menuOptions } from '$lib/data/menu-options';

  const pages = menuOptions.map((option) => ({
    id: option.slug,
    title: option.title,
    subtitle: 'Pagina convertita da opzioniMenu',
    content: option.description,
    link: `/opzioni-menu/${option.slug}`
  }));
</script>

<main class="h-screen w-full">
  <Carousel {pages} autoRotate={false} />
</main>