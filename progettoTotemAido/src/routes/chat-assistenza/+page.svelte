<script lang="ts">
	import TotemCardLayout from '$lib/components/common/TotemCardLayout.svelte';
	import StoreQrSection from '$lib/components/contenuti/StoreQrSection.svelte';
</script>

<TotemCardLayout title="Donatello" mode="child" backHref="/opzioni-menu/diventa-donatore">
	<StoreQrSection
		subtitle="Scansiona il QR code per aprire Donatello"
		imageSrc="/img/PlayStore-qr.png"
		imageAlt="QR code Donatello"
	/>
</TotemCardLayout>
