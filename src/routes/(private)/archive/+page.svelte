<script lang="ts">
	import { getArchive } from '$lib/contexts/archive.js';
	import { converterLtGt } from '$lib/utils.js';
	import { Viewer } from '@components';
	import SideBar from '@components/SideBar.svelte';

	export let data;

	const archives = getArchive();
	let { session, posts } = data;
	$: ({ session, posts } = data);

	const originalContents: { title: string; content: string; archive_name: string }[] = posts.map(
		post => {
			return { title: post.title, content: post.content, archive_name: post.archives!.name };
		},
	);
	const isEdited: boolean[] = Array(posts.length).fill(false);
	const youtubeFormatter = (val: string, i: number) => {
		const convertedValue = converterLtGt(val) ?? '';
		posts[i].content = convertedValue;
	};
</script>

<div class="archive-layout">
	<SideBar>
		<p slot="title">나의 아카이브</p>
		<ul slot="navList">
			{#each $archives as archive}
				<li>
					<a href={`archive?name=${archive.name}`}>{archive.name}</a>
				</li>
			{/each}
		</ul>
	</SideBar>
	<div class="wrapper max-w-3xl">
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
</div>

<style lang="postcss">
	.archive-layout {
		display: flex;
		width: 100%;
		min-height: 100vh;
		justify-content: center;
		gap: 2rem;
		padding: 1rem;
		padding-top: var(--h-nav);

		@media (--desktop) {
			padding: calc(var(--h-nav) + 3rem) 2rem;
		}
	}

	.wrapper {
		width: 100%;
	}

	.not-found {
		display: flex;
		flex-direction: column;
	}
</style>
