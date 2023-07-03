<script lang="ts">
	import { getArchive } from '$lib/context/archive';
	import { fade } from 'svelte/transition';

	const archives = getArchive();
</script>

<aside
	aria-label="sidebar"
	class="fixed left-0 ml-12 flex w-sidebar cursor-default flex-col items-stretch gap-4 overflow-y-auto rounded-lg border border-secondary py-5">
	<div class="flex justify-between px-2">
		<span>아카이브</span>
	</div>
	<hr />
	<ul role="navigation" class="px-2" aria-label="sidebar navigation">
		{#if $archives?.length}
			{#each $archives as { id, name }, i (id)}
				<li class="my-1 flex items-center justify-between outline-none">
					<div>
						<span>🗂️&nbsp;</span>
						<span class="outline-none">
							{name}
						</span>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</aside>

<!-- 아카이브 만들기 -->
{#if !$archives?.length}
	<div in:fade class="flex justify-between">
		<span>💬&nbsp;</span>
		<!-- svelte-ignore a11y-autofocus -->
		<li class="flex-grow caret-primary outline-none" />
	</div>
{/if}
