<script lang="ts">
	import { archive } from '$lib/stores/archive.js';
	import { SideBar } from '@components';

	export let data;
	const { archiveData } = data;
</script>

<div class="grid w-full min-w-min place-items-center">
	<SideBar {archiveData} />
	<slot />
</div>
