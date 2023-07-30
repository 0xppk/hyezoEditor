<script lang="ts">
	import { converterLtGt } from '$lib/utils.js';
	import { Viewer } from '@components';

	export let data;
	let { session, posts } = data;
	$: ({ session, posts } = data);

	const originalContents: { title: string; content: string }[] | undefined = posts.map(post => {
		return { title: post.title, content: post.content };
	});
	const isEdited: boolean[] = Array(posts.length).fill(false);
	const youtubeFormatter = (val: string, i: number) => {
		const convertedValue = converterLtGt(val) ?? '';
		posts[i].content = convertedValue;
	};
</script>

<div class="wrapper">
	{#if posts.length}
		{#each posts as post, index (post.id)}
			<svelte:component
				this={Viewer}
				{post}
				{index}
				{originalContents}
				{isEdited}
				{youtubeFormatter}
			/>
		{/each}
	{:else}
		<div class="not-found">
			<h2>No posts yet.</h2>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
		padding: var(--p-nav);
	}

	.not-found {
		display: flex;
		flex-direction: column;
	}
</style>
