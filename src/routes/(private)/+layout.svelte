<script lang="ts">
	import { getArchive, setArchive } from '$lib/context/archive.js';

	export let data;
	let { archiveData } = data;
	$: ({ archiveData } = data);

	setArchive();
	if (archiveData?.length) getArchive().syncWith(archiveData);
</script>

<div class="grid w-full min-w-min place-items-center">
	<slot />
</div>
