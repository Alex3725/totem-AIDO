<a href="/chat-assistenza" class="assist-fab" aria-label="Apri chat assistenza">
	<span class="assist-icon-wrap">
		<img src="/img/DONAtello_AI.png" alt="Chat assistenza" class="assist-icon" />
	</span>
</a>

<style>
	.assist-fab {
		position: fixed;
		left: clamp(0.6rem, 1.4vw, 1.2rem);
		bottom: clamp(0.6rem, 1.4vw, 1.2rem);
		width: clamp(7.5rem, 12.5vw, 10.5rem);
		aspect-ratio: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		background: #3f64ae;
		box-shadow: 0 0.65rem 1.35rem rgba(0, 0, 0, 0.24);
		z-index: 999;
		text-decoration: none;
		transition: none !important;
		animation: none !important;
		transform: none !important;
	}

	.assist-fab:hover,
	.assist-fab:focus-visible {
		transition: none !important;
		animation: none !important;
		transform: none !important;
		box-shadow: 0 0.65rem 1.35rem rgba(0, 0, 0, 0.24);
	}

	.assist-fab,
	.assist-fab * {
		transition: none !important;
		animation: none !important;
	}

	.assist-fab:focus-visible {
		outline: 0.18rem solid #ffffff;
		outline-offset: 0.18rem;
	}

	.assist-icon-wrap {
		width: 74%;
		height: 74%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.assist-icon {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	@media (orientation: landscape) {
		.assist-fab {
			left: clamp(0.6rem, 1.4vw, 1.2rem);
			bottom: clamp(0.6rem, 1.4vw, 1.2rem);
			width: clamp(7rem, 11vw, 9.5rem);
		}
	}

	@media (max-width: 740px) {
		.assist-fab {
			left: clamp(0.5rem, 2.6vw, 1rem);
			bottom: clamp(0.5rem, 2.6vw, 1rem);
			width: clamp(6rem, 22vw, 8.5rem);
		}
	}
</style>
