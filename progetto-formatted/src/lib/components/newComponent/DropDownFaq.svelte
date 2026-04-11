<script lang="ts">
    let { title:string , content:string } = $props()
</script>

<button class="dropdown-like">
    <img src="" alt="">
</button>

<style>
   	.dropdown-like {
		width: 100%;
		border: 0;
		background: #fff;
		min-height: 8.2cqh;
		padding: 1.8cqh 2.2cqw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #111;
		font-size: 3.55cqw;
		font-weight: 800;
		text-align: left;
		transition: background 180ms ease, opacity 180ms ease;
	}
   
	.dropdown-like img {
		width: 4.2cqw;
		height: 4.2cqw;
		transition: transform 260ms cubic-bezier(0.42, 0, 0.58, 1), opacity 260ms cubic-bezier(0.42, 0, 0.58, 1);
	}
   
	.is-open .dropdown-like img {
		transform: rotate(180deg);
		opacity: 0.85;
	}
</style>