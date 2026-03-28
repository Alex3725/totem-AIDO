<a href="/chat-assistenza" class="assist-fab" aria-label="Apri chat assistenza">
	<span class="assist-icon-wrap">
		<img src="/img/DONAtello_AI.png" alt="Chat assistenza" class="assist-icon" />
	</span>
</a>

<style>
	.assist-fab {
		position: fixed;
		right: clamp(1.1rem, 2.2vw, 2rem);
		bottom: clamp(5.6rem, 10.2vh, 7.2rem);
		width: clamp(4rem, 7.2vw, 5.6rem);
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
			right: clamp(1rem, 2vw, 1.8rem);
			bottom: clamp(4.4rem, 8.6vh, 6rem);
			width: clamp(3.7rem, 6.2vw, 4.9rem);
		}
	}

	@media (max-width: 740px) {
		.assist-fab {
			right: clamp(0.8rem, 3.6vw, 1.2rem);
			bottom: clamp(5.1rem, 9.6vh, 6.8rem);
			width: clamp(3.8rem, 15vw, 4.8rem);
		}
	}
</style>
