<script lang="ts">
	import { setArchive } from '$lib/context/archive.js';

	export let data;
	let { archiveData } = data;
	$: ({ archiveData } = data);

	// 아카이브 setContext API
	setArchive(archiveData);
</script>

<div class="container">
	<slot />
</div>

<style>
	.container {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 1.5rem;
	}

	@media (--tablet) {
		.container {
			padding: 0 2.5rem
		}
	}
</style>
