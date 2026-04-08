<script lang="ts">
	// Pagina figlia: QR code Apple App Store
</script>

<div class="panel">
	<h2 class="subtitle">Apple App Store</h2>
	<p class="desc">Scansiona il QR code per aprire l'App Store e scaricare DigitalAIDO</p>

	<div class="qr-shell">
		<div class="qr-frame">
			<img src="/img/AppleStore.png" alt="QR code Apple Store" class="qr-img" />
		</div>
	</div>
</div>

<style>
	.panel {
		width: 100%;
		height: 100%;
		border-radius: 1.45cqw;
		padding: 2.1cqw 1.9cqw;
		background: #d40000;
		display: flex;
		flex-direction: column;
		gap: 1.4cqh;
		overflow-y: auto;
		color: #fff;
		scrollbar-width: none;
	}

	.panel::-webkit-scrollbar {
		display: none;
	}

	.subtitle {
		margin: 0;
		text-align: center;
		font-size: 5.2cqw;
		font-weight: 900;
		line-height: 1.1;
	}

	.desc {
		margin: 0;
		text-align: center;
		font-size: 3.2cqw;
		font-weight: 700;
		line-height: 1.3;
		opacity: 0.9;
	}

	.qr-shell {
		flex: 1;
		min-height: 0;
		border: 2px dashed rgba(255, 255, 255, 0.72);
		border-radius: 1.4cqw;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(0.35rem, 0.95vw, 0.65rem);
		background: rgba(255, 255, 255, 0.08);
	}

	.qr-frame {
		width: min(100%, 52cqw);
		aspect-ratio: 1 / 1;
		max-height: 100%;
		border-radius: 1.2cqw;
		overflow: hidden;
		background: #fff;
		padding: 0.22rem;
		box-shadow: 0 0.5cqw 1.2cqw rgba(0, 0, 0, 0.24);
	}

	.qr-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 54%;
		transform: scale(0.92);
	}

	@media (orientation: landscape) {
		.panel {
			padding: 1rem 1.05rem;
			gap: 0.9rem;
		}

		.subtitle {
			font-size: clamp(1.55rem, 2vw, 2rem);
		}

		.desc {
			font-size: clamp(1rem, 1.35vw, 1.2rem);
		}

		.qr-frame {
			width: min(100%, 26rem);
		}
	}
</style>