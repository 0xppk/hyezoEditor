<script lang="ts">
	import { setArchive } from '$lib/context/archive.js';

	export let data;
	let { archiveData } = data;
	$: ({ archiveData } = data);

	// 아카이브 setContext API
	setArchive(archiveData);
</script>

<div class="flex h-layoutHeight w-full items-center py-10 sm:block sm:items-start sm:py-60">
	<slot />
</div>
