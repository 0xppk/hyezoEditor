<script lang="ts">
	import { Icons } from '@components';
	export let archiveData: TArchive[];

	function addArchive() {}
</script>

<aside
	aria-label="sidebar"
	class="fixed left-0 ml-12 flex w-sidebar cursor-default flex-col items-stretch gap-4 overflow-y-auto rounded-lg border border-secondary px-5 py-5">
	<div class="flex justify-between">
		<span>아카이브</span>
		<Icons icon="plus" size="20" on:click={addArchive} className="cursor-pointer" />
	</div>
	<hr />
	<ul role="navigation" aria-label="sidebar navigation">
		{#each archiveData as { name, id } (id)}
			<li class="cursor-pointer">{name}</li>
		{/each}
	</ul>
</aside>
