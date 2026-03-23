<main class="screen">
	<a
		href="/opzioni-menu/faq"
		class="totem-card"
		aria-label="Apri il menu"
	>
		<div class="totem-inner-start">
			<img src="/img/logoAIDO.png" alt="Logo AIDO" class="start-logo" />
			<h1 class="start-title">Clicca per scoprire</h1>
		</div>
	</a>
</main>

<style>
	.totem-card {
		width: min(100vw, calc(100dvh * 9 / 16));
		height: min(100dvh, calc(100vw * 16 / 9));
		border-radius: 2.2vmin;
		padding: 1.1vmin;
		background: #5b7cbd;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}

	.screen {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		background: linear-gradient(120deg, rgba(169, 0, 0, 1) 0%, rgba(113, 50, 87, 1) 50%, rgba(58, 100, 173, 1) 100%);
	}

	.totem-inner-start {
		width: 100%;
		height: 100%;
		border-radius: 24px;
		background: #f3f3f3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.5rem 1rem;
	}

	.start-logo {
		width: 82%;
		height: auto;
	}

	.start-title {
		margin-top: 1.2rem;
		font-size: clamp(1.9rem, 5.2vw, 3rem);
		font-weight: 900;
		color: #111;
		text-align: center;
		text-transform: none;
	}

	@media (orientation: landscape) and (min-width: 1100px) and (min-height: 650px) {
		.totem-card {
			width: 92vw;
			height: 92dvh;
			border-radius: 4.5vmin;
			padding: 1.2vmin;
		}

		.totem-inner-start {
			border-radius: 4vmin;
		}

		.start-logo {
			width: 58%;
		}

		.start-title {
			font-size: clamp(2.4rem, 4.6vw, 5rem);
		}
	}
</style>