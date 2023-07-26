<script lang="ts">
	import { setArchive } from '$lib/contexts/archive.js';

	export let data;
	let { archiveData } = data;
	$: ({ archiveData } = data);

	// 아카이브 setContext API
	setArchive(archiveData);
</script>

<div class="layout">
	<slot />
</div>

<style>
	.layout {
		min-height: inherit;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 1.5rem;
	}

	@media (--tablet) {
		.layout {
			padding: 1.5rem 2.5rem;
		}
	}
</style>
