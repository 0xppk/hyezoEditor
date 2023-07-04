<script lang="ts">
	import { goto } from '$app/navigation';
	import { getArchive } from '$lib/context/archive';
	import { countWords, fetcher } from '$lib/utils';
	import { createPostResponseSuccess } from '$lib/zodSchema';
	import { error } from '@sveltejs/kit';

	export let content: string;
	export let youtubeFormatter: (value: string) => void;
	let title: string;
	let archive_name: string = '';
	let contentDiv: HTMLElement;
	$: words_count = countWords(content);

	// 스토어 변수
	const archives = getArchive();

	// 포스트 함수
	async function addNewPost() {
		try {
			const res = await fetcher('/api/addPost', 'POST', {
				title,
				content,
				words_count,
				archive_name,
			});
			const result = createPostResponseSuccess.parse(res);

			return result;
		} catch (e) {
			throw error(500, '포스트 만들기 실패');
		}
	}

	async function updatePublicity({ id, status }: Partial<TPost>) {
		try {
			await fetcher('/api/updatePost', 'PATCH', {
				id,
				status,
			});
		} catch (e) {
			throw error(500, '포스트 공개/비공개 업데이트 실패');
		}
	}

	// 아카이브 함수
	async function addArchive(index: number) {
		await fetcher<TArchive>('/api/addArchive', 'POST', {
			name: archive_name,
		});
		archives.updateName(archive_name, index);
	}

	async function updateArchive(id: string, index: number) {
		await fetcher('/api/updateArchive', 'PATCH', {
			id,
			name: $archives[index].name,
		});
	}

	async function deleteArchive(id: string) {
		await fetcher('/api/deleteArchive', 'DELETE', {
			id,
		});
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
		<span class="dropdown flex-grow">
			<button class="btn-ghost btn">🗂️ {archive_name}</button>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
				<li class="pointer-events-none"><span>Archives</span></li>
				<!-- 아카이브 리스트 시작 -->
				{#if $archives.length}
					<hr />
					{#each $archives as { id, name }, i (id)}
						<li
							on:pointerdown={() => {
								archive_name = name;
								archives.updateName(name, i);
								if (document.activeElement instanceof HTMLElement) {
									document.activeElement.blur();
								}
							}}>
							<span>{name}</span>
						</li>
					{/each}
				{/if}
				<!-- 아카이브 리스트 끝 -->
			</ul>
		</span>

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
