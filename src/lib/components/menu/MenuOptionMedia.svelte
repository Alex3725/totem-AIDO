<script lang="ts">
	let {
		slug,
		fixedPreviewItems
	}: {
		slug: string;
		fixedPreviewItems: Array<{ title: string; description: string }>;
	} = $props();
</script>

{#if slug === 'faq'}
	<div class="faq-image-shell">
		<img src="/img/nomi_frequenti.png" alt="Esempio dei nomi piu frequenti" class="faq-image" />
	</div>
{:else if fixedPreviewItems.length > 0}
	<div class="preview-grid">
		{#each fixedPreviewItems as previewCard}
			<div class="preview-card">
				<h3>{previewCard.title}</h3>
				<p>{previewCard.description}</p>
			</div>
		{/each}
	</div>
{/if}
