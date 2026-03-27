<a href="/chat-assistenza" class="assist-fab" aria-label="Apri chat assistenza">
	<span class="assist-icon-wrap">
		<img src="/img/DONAtello_AI.png" alt="Chat assistenza" class="assist-icon" />
	</span>
</a>

<style>
	.assist-fab {
		position: fixed;
		right: clamp(2.2rem, 5vw, 4rem);
		bottom: clamp(9.4dvh, 11.8dvh, 13.2dvh);
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
		transition: transform 160ms ease, box-shadow 160ms ease;
	}

	.assist-fab:hover,
	.assist-fab:focus-visible {
		transform: translateY(-1px) scale(1.01);
		box-shadow: 0 0.85rem 1.6rem rgba(0, 0, 0, 0.28);
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

	@media (orientation: landscape) {
		.assist-fab {
			bottom: clamp(4.8dvh, 6.4dvh, 7.8dvh);
			width: clamp(3.6rem, 6vw, 4.8rem);
		}
	}

	@media (max-width: 740px) {
		.assist-fab {
			right: 1.6rem;
			bottom: clamp(8.9dvh, 10.8dvh, 12.6dvh);
			width: clamp(3.9rem, 16vw, 4.9rem);
		}
	}
</style>
