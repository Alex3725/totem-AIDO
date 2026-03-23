<main class="screen">
	<section class="totem-card">
		<div class="totem-inner">
			<header class="totem-header">
				<a href="/contenuti/scopri" aria-label="Torna indietro" class="icon-wrap">
					<img src="/img/Indietro_pulsante.png" alt="Indietro" class="icon" />
				</a>
				<img src="/img/logoAIDO.png" alt="Logo AIDO" class="logo" />
				<a href="/" aria-label="Home" class="icon-wrap">
					<img src="/img/Home_pulsante.png" alt="Home" class="icon" />
				</a>
			</header>

			<h1 class="title">Scopri - admin</h1>

			<section class="content-panel">
				<button type="button" class="add-btn">Aggiungi</button>

				<div class="filters-row">
					<label class="search-box">
						<input type="search" placeholder="Ricerca" />
						<img src="/img/LenteDiIngrandimento.png" alt="Cerca" />
					</label>
					<button type="button" class="filter-btn">
						<span>Filtri</span>
						<img src="/img/dropdown_pulsante.png" alt="Filtri" />
					</button>
				</div>

				<div class="materials-section">
					<h3>Volantini</h3>
					<div class="thumb-grid">
						<div class="thumb"></div>
						<div class="thumb"></div>
						<div class="thumb"></div>
					</div>
				</div>

				<div class="materials-section">
					<h3>Video</h3>
					<div class="thumb-grid single-row">
						<div class="thumb wide"></div>
					</div>
				</div>
			</section>
		</div>
	</section>
</main>

<style>
	.screen {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		background: linear-gradient(120deg, rgba(169, 0, 0, 1) 0%, rgba(113, 50, 87, 1) 50%, rgba(58, 100, 173, 1) 100%);
	}

	.totem-card {
		width: min(100vw, calc(100dvh * 9 / 16));
		height: min(100dvh, calc(100vw * 16 / 9));
		border-radius: 2.2vmin;
		padding: 1vmin;
		background: #5b7cbd;
	}

	.totem-inner {
		height: 100%;
		border-radius: 24px;
		background: #ffffff;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.totem-header {
		height: 3.9rem;
		border-radius: 16px;
		background: #f6f6f6;
		display: grid;
		grid-template-columns: 2.2rem 1fr 2.2rem;
		align-items: center;
		padding: 0 0.4rem;
		column-gap: 0.3rem;
	}

	.icon-wrap {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	.icon {
		width: 1.9rem;
		height: 1.9rem;
	}

	.logo {
		margin: 0 auto;
		width: 2.75rem;
		height: 2.75rem;
	}

	.title {
		margin-top: 0.4rem;
		text-align: center;
		font-size: clamp(1.55rem, 4.2vw, 2rem);
		font-weight: 900;
		color: #111827;
	}

	.content-panel {
		margin-top: 0.55rem;
		flex: 1;
		min-height: 0;
		border-radius: 12px;
		padding: 0.9rem;
		background: #d40000;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		overflow: auto;
		color: #fff;
	}

	.add-btn {
		height: 2.15rem;
		border: 0;
		border-radius: 999px;
		background: #fff;
		color: #111;
		font-weight: 900;
		font-size: 1rem;
	}

	.filters-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.35rem;
	}

	.search-box {
		height: 2.05rem;
		background: #fff;
		border-radius: 999px;
		display: flex;
		align-items: center;
		padding: 0 0.55rem 0 0.7rem;
	}

	.search-box input {
		width: 100%;
		border: 0;
		outline: none;
		font-size: 0.82rem;
		font-weight: 700;
	}

	.search-box img,
	.filter-btn img {
		width: 1.1rem;
		height: 1.1rem;
	}

	.filter-btn {
		height: 2.05rem;
		border: 0;
		padding: 0 0.65rem;
		border-radius: 999px;
		display: inline-flex;
		gap: 0.3rem;
		align-items: center;
		font-size: 0.82rem;
		font-weight: 800;
		color: #111;
		background: #fff;
	}

	.materials-section h3 {
		margin: 0.2rem 0 0.35rem;
		font-size: 1.45rem;
		font-weight: 900;
	}

	.thumb-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.42rem;
	}

	.thumb-grid.single-row {
		grid-template-columns: 1fr;
	}

	.thumb {
		height: 4.35rem;
		background: #d9d9d9;
		border-radius: 8px;
	}

	.thumb.wide {
		height: 4.75rem;
	}

	@media (orientation: landscape) and (min-width: 1100px) and (min-height: 650px) {
		.totem-card {
			width: 92vw;
			height: 92dvh;
			border-radius: 4.5vmin;
			padding: 1.2vmin;
		}

		.totem-inner {
			border-radius: 4vmin;
			padding: 1.6vmin;
		}

		.totem-header {
			height: 11%;
			border-radius: 2.4vmin;
		}

		.title {
			font-size: clamp(2.1rem, 3.8vw, 4rem);
		}

		.search-box,
		.filter-btn,
		.add-btn {
			font-size: clamp(1rem, 1.3vw, 1.35rem);
		}
	}
</style>
