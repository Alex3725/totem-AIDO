<script lang="ts">
	import TotemCardLayout from '$lib/components/common/TotemCardLayout.svelte';
	import StoreQrSection from '$lib/components/contenuti/StoreQrSection.svelte';
</script>

<TotemCardLayout title="Google Play" mode="child" backHref="/contenuti/diventa-donatore">
	<StoreQrSection
		subtitle="Scansiona il QR code per aprire il Play Store"
		imageSrc="/img/PlayStore.png"
		imageAlt="QR code Google Play"
	/>
</TotemCardLayout>
