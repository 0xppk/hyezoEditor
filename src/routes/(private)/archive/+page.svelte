<script lang="ts">
	import { converterLtGt } from '$lib/utils.js';
	import { Viewer } from '@components';
	export let data;
	let { session, posts } = data;

	const originalContents: { title: string; content: string }[] | undefined = posts.map(post => {
		return { title: post.title, content: post.content };
	});
	const isEdited: boolean[] = Array(posts.length).fill(false);
	const youtubeFormatter = (val: string, i: number) => {
		const convertedValue = converterLtGt(val) ?? '';
		posts[i].content = convertedValue;
	};

	$: ({ session } = data);
</script>

{#if posts.length}
	{#each posts as post, index (post.id)}
		<svelte:component
			this={Viewer}
			{post}
			{index}
			{originalContents}
			{isEdited}
			{youtubeFormatter} />
	{/each}
{:else}
	<div class="flex flex-col">
		<h2 class="text-secondary">'s Archive</h2>
	</div>
{/if}
