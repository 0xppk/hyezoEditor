<script lang="ts">
	import { countWords } from '$lib/utils';
	import { updatePostResponseSuccess } from '$lib/zodSchema';
	import { error } from '@sveltejs/kit';
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

	function scrollToBottom(el: HTMLElement) {
		el.scrollTop = el.scrollHeight;
	}

	afterUpdate(() => {
		scrollToBottom(wrapperDiv);
	});

	async function updatePost(
		{ id, title, content, words_count, archive_name }: Partial<TPost>,
		index: number,
	) {
		try {
			const result = await await fetch('/api/updatePost', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id,
					title,
					content,
					words_count,
					archive_name,
				}),
			}).then(res => res.json());

			const { data: updatedPost } = updatePostResponseSuccess.parse(result);

			originalContents[index].content = updatedPost.content;
			isEdited[index] = false;
		} catch (e) {
			throw error(500, '포스트 업데이트 에러');
		}
	}

	async function updatePublicity({ id, status }: Partial<TPost>) {
		try {
			await fetch('/api/updatePost', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id,
					status,
				}),
			});
		} catch (e) {
			throw error(500, '포스트 공개/비공개 업데이트 에러');
		}
	}

	function toggleEdit(value: string, i: number, key: 'title' | 'content') {
		if (value !== originalContents[i][key]) {
			isEdited[i] = true;
		} else {
			isEdited[i] = false;
		}
	}
</script>

<article class="mb-20 w-full overflow-hidden rounded-xl border border-primary/50 outline-none">
	<section bind:this={wrapperDiv} class="max-h-80 overflow-y-scroll scroll-smooth">
		<input
			class="mb-5 mt-10 w-full bg-transparent text-center text-3xl font-semibold outline-none placeholder:text-content/30"
			aria-label="제목 영역 글쓰기 에디터"
			spellcheck="false"
			placeholder="제목을 입력해주세요"
			bind:value={title}
			on:input={() => toggleEdit(title, index, 'title')}
			on:keypress={e => {
				if (e.key === 'Enter') {
					e.preventDefault();
					contentDiv.focus();
				}
			}} />
		<article
			class="px-5 py-8 outline-none"
			aria-label="본문 영역 글쓰기 에디터"
			contenteditable
			spellcheck="false"
			bind:this={contentDiv}
			bind:innerHTML={content}
			on:input={() => {
				toggleEdit(content, index, 'content');
				youtubeFormatter(content, index);
			}} />
	</section>

	<section class="flex items-center justify-end gap-3 border-t border-primary/50 p-2">
		<input bind:value={archive_name} type="text" />
		<span class="text-right text-primary">word: {countWords(content)}</span>

		{#if isEdited[index]}
			<button
				class="btn-primary btn-outline btn-sm btn w-14"
				on:click={() => updatePost({ id, content, title, words_count }, index)}>수정</button>
		{:else if status === 'private'}
			<button
				class="btn-primary btn-outline btn-sm btn w-14"
				disabled={isEdited[index]}
				on:click={() => {
					alert('작성하신 글을 공개합니다. \n 공개 후 1주일은 수정이 불가능합니다.');
					updatePublicity({ id, status: 'public' });
					status = 'public';
				}}>
				발행
			</button>
		{/if}
	</section>
</article>
