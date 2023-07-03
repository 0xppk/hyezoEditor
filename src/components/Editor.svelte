<script lang="ts">
	import { goto } from '$app/navigation';
	import { archive } from '$lib/stores/archive';
	import { countWords } from '$lib/utils';
	import { createResponseSuccess } from '$lib/zodSchema';
	import { fail } from '@sveltejs/kit';

	export let content: string;
	export let youtubeFormatter: (value: string) => void;

	let title: string;

	$: words_count = countWords(content);

	let contentDiv: HTMLElement;

	async function addNewPost() {
		try {
			const result = await await fetch('/api/addPost', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, content, words_count, archive_name: $archive }),
			}).then(res => res.json());

			return createResponseSuccess.parse(result);
		} catch (e) {
			return fail(500, { message: '서버 에러', success: false });
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
		} catch (error) {
			return fail(500, { message: '서버 에러', success: false });
		}
	}
</script>

<article class="mb-20 w-full rounded-xl border border-primary/50 outline-none">
	<input
		class="mb-5 mt-10 w-full bg-bkg text-center text-3xl font-semibold outline-none placeholder:text-content/30"
		aria-label="제목 영역 글쓰기 에디터"
		spellcheck="false"
		placeholder="제목을 입력해주세요"
		bind:value={title}
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
		on:change={() => youtubeFormatter(content)} />

	<div class="flex items-center justify-end gap-3 border-t border-primary/50 p-2">
		<span class="flex-grow">🗂️ {$archive}</span>
		<span class="text-right text-primary">word: {countWords(content)}</span>
		<button
			class="btn-primary btn-outline btn-sm btn w-14"
			on:click={async () => {
				alert('작성하신 글을 공개합니다. \n 공개 후 1주일은 수정이 불가능합니다.');
				const result = await addNewPost();
				if ('success' in result) {
					const id = result.data.id;
					await updatePublicity({ id, status: 'public' });
					goto('/archive');
				}
			}}>
			발행
		</button>
		<button
			on:click={async () => {
				await addNewPost();
				goto('/archive');
			}}
			class="btn-primary btn-outline btn-sm btn w-14">
			저장
		</button>
	</div>
</article>
