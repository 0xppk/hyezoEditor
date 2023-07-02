<script lang="ts">
	import { SideBar } from '@components';

	export let data;
	const { archiveData } = data;

</script>

<div class="grid w-full min-w-min place-items-center">
	{#if archiveData?.length}
		<SideBar {archiveData} />
	{/if}
	<slot />
</div>
