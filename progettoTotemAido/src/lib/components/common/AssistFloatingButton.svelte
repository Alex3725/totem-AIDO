<a href="/chat-assistenza" class="assist-fab" aria-label="Apri chat assistenza">
	<span class="assist-icon-wrap">
		<img src="/img/DONAtello_AI.png" alt="Chat assistenza" class="assist-icon" />
	</span>
</a>

<style>
	.assist-fab {
		position: fixed;
		right: clamp(1rem, 2.2vw, 2rem);
		bottom: clamp(1rem, 2.5vh, 2rem);
		width: clamp(5rem, 12vw, 9.6rem);
		aspect-ratio: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		background: #3f64ae;
		box-shadow: 0 0.9rem 1.9rem rgba(0, 0, 0, 0.32);
		z-index: 999;
		text-decoration: none;
		transition: transform 160ms ease, box-shadow 160ms ease;
	}

	.assist-fab:hover,
	.assist-fab:focus-visible {
		transform: translateY(-2px) scale(1.015);
		box-shadow: 0 1.15rem 2.3rem rgba(0, 0, 0, 0.36);
	}

	.assist-fab:focus-visible {
		outline: 3px solid #ffffff;
		outline-offset: 3px;
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

	@media (max-width: 740px) {
		.assist-fab {
			right: 1rem;
			bottom: 1rem;
			width: clamp(4.7rem, 21vw, 6rem);
		}
	}
</style>
