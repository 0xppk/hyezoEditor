<script lang="ts">
	import { db } from '$lib/db/client';
	import { countWords } from '$lib/utils';
	import { afterUpdate } from 'svelte';

	export let post: TPost;
	let { id, archive_name, title, content, words_count, status } = post;
	export let index: number = 0;
	export let isEdited: boolean[] = [];
	export let originalContents: { title: string; content: string }[] = [];
	export let youtubeFormatter: (value: string, index: number) => void;

	$: words_count = countWords(content);

	let contentDiv: HTMLElement;
	let wrapperDiv: HTMLElement;

	// 라이프 사이클
	function scrollToBottom(el: HTMLElement) {
		el.scrollTop = el.scrollHeight;
	}
	afterUpdate(() => scrollToBottom(wrapperDiv));

	// 이벤트 핸들러
	function onKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			contentDiv.focus();
		}
	}

	function toggleEdit(value: string, i: number, key: 'title' | 'content') {
		if (value !== originalContents[i][key]) {
			isEdited[i] = true;
		} else {
			isEdited[i] = false;
		}
	}

	function onChange() {
		toggleEdit(content, index, 'content');
		youtubeFormatter(content, index);
	}

	async function updatePost() {
		const updatedPost = await db.updatePost({ id, content, title, words_count }, index);
		originalContents[index].content = updatedPost.content;
		isEdited[index] = false;
	}

	function updatePublicity() {
		db.updatePublicity({ id, status: 'public' });
		status = 'public';
	}
</script>

<article class="mb-20 w-full overflow-y-hidden rounded-xl border border-primary/50 outline-none">
	<section bind:this={wrapperDiv} class="max-h-80 overflow-y-scroll scroll-smooth">
		<!-- 타이틀 -->
		<input
			class="mb-5 mt-10 w-full bg-transparent text-center text-3xl font-semibold outline-none placeholder:text-content/30"
			aria-label="제목 영역 글쓰기 에디터"
			spellcheck="false"
			placeholder="제목을 입력해주세요"
			bind:value={title}
			on:change={() => toggleEdit(title, index, 'title')}
			on:keypress={onKeyPress}
		/>
		<!-- 본문 -->
		<article
			class="px-5 py-8 outline-none"
			aria-label="본문 영역 글쓰기 에디터"
			contenteditable
			spellcheck="false"
			bind:this={contentDiv}
			bind:innerHTML={content}
			on:input={onChange}
		/>
	</section>

	<!-- 바텀 바 -->
	<section class="flex items-center justify-end gap-3 border-t border-primary/50 p-2">
		<input bind:value={archive_name} type="text" />
		<span class="text-right text-primary">word: {countWords(content)}</span>

		{#if isEdited[index]}
			<button class="btn-primary btn-outline btn-sm btn w-14" on:click={updatePost}> 수정 </button>
		{:else if status === 'private'}
			<button
				class="btn-primary btn-outline btn-sm btn w-14"
				disabled={isEdited[index]}
				on:click={updatePublicity}
			>
				발행
			</button>
		{/if}
	</section>
</article>
