<script lang="ts">
	let { src, alt = 'QR Code', size = '18.75rem' } = $props<{
		src: string;
		alt?: string;
		size?: string;
	}>();
</script>

<div class="qr-container" style="width: {size}; height: {size};">
	<img {src} {alt} class="h-full w-full object-contain" />
</div>
