<script lang="ts">
	import { setArchive } from '$lib/context/archive.js';

	export let data;
	let { archiveData } = data;
	$: ({ archiveData } = data);

	// 아카이브 setContext API
	setArchive(archiveData);
</script>

<div class="grid w-full min-w-min place-items-center">
	<slot />
</div>
