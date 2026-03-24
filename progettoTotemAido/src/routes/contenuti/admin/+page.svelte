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
		width: min(94vw, calc(94dvh * 9 / 16));
		height: min(94dvh, calc(94vw * 16 / 9));
		border-radius: 2.1cqw;
		padding: 0.95cqw;
		background: #5b7cbd;
		container-type: size;
	}

	@media (orientation: landscape) {
		.totem-card {
			width: min(88vw, calc(88dvh * 3 / 2));
			height: min(88dvh, calc(88vw * 2 / 3));
			border-radius: 4vmin;
			padding: 1.05vmin;
		}
	}

	.totem-inner {
		height: 100%;
		border-radius: 2.2cqw;
		background: #ffffff;
		padding: 1.25cqw;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.totem-header {
		height: 11.2cqh;
		min-height: 5.6cqw;
		border-radius: 1.5cqw;
		background: #f6f6f6;
		display: grid;
		grid-template-columns: 6.2cqw 1fr 6.2cqw;
		align-items: center;
		padding: 0 1.1cqw;
		column-gap: 0.8cqw;
	}

	.icon-wrap {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	.icon {
		width: 5.1cqw;
		height: 5.1cqw;
		max-width: 2.1rem;
		max-height: 2.1rem;
	}

	.logo {
		margin: 0 auto;
		width: 12.2cqw;
		height: 12.2cqw;
		max-width: 4.2rem;
		max-height: 4.2rem;
	}

	.title {
		margin-top: 1.45cqh;
		text-align: center;
		font-size: 7.2cqw;
		font-weight: 900;
		color: #111827;
		line-height: 1;
	}

	.content-panel {
		margin-top: 1.25cqh;
		flex: 1;
		min-height: 0;
		border-radius: 1.45cqw;
		padding: 1.65cqw;
		background: #d40000;
		display: flex;
		flex-direction: column;
		gap: 1.2cqh;
		overflow: auto;
		color: #fff;
	}

	.add-btn {
		height: 5.2cqh;
		border: 0;
		border-radius: 999px;
		background: #fff;
		color: #111;
		font-weight: 900;
		font-size: 2.65cqw;
	}

	.filters-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.8cqw;
	}

	.search-box {
		height: 5.2cqh;
		background: #fff;
		border-radius: 999px;
		display: flex;
		align-items: center;
		padding: 0 1.45cqw 0 1.85cqw;
	}

	.search-box input {
		width: 100%;
		border: 0;
		outline: none;
		font-size: 2.65cqw;
		font-weight: 700;
	}

	.search-box img,
	.filter-btn img {
		width: 3.2cqw;
		height: 3.2cqw;
	}

	.filter-btn {
		height: 5.2cqh;
		border: 0;
		padding: 0 1.6cqw;
		border-radius: 999px;
		display: inline-flex;
		gap: 0.8cqw;
		align-items: center;
		font-size: 2.55cqw;
		font-weight: 800;
		color: #111;
		background: #fff;
	}

	.materials-section h3 {
		margin: 0.2cqh 0 0.8cqh;
		font-size: 5cqw;
		font-weight: 900;
	}

	.thumb-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.9cqw;
	}

	.thumb-grid.single-row {
		grid-template-columns: 1fr;
	}

	.thumb {
		height: 9.5cqh;
		background: #d9d9d9;
		border-radius: 1.1cqw;
	}

	.thumb.wide {
		height: 10.8cqh;
	}

	@media (orientation: landscape) and (min-width: 1100px) and (min-height: 650px) {
		.totem-inner {
			border-radius: 4vmin;
			padding: 1.6vmin;
		}

		.totem-header {
			height: 11%;
			border-radius: 2.4vmin;
		}

		.title {
			font-size: 7.2cqw;
		}
	}
</style>
