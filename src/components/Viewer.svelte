<script lang="ts">
	import { getArchive } from '$lib/contexts/archive';
	import { db } from '$lib/db/client';
	import { countWords } from '$lib/utils';
	import { afterUpdate, onMount } from 'svelte';
	import Dropdown from './Dropdown.svelte';

	export let post: TPost;
	let { id, title, content, words_count, status, archive_id } = post;
	export let index: number = 0;
	export let isEdited: boolean[] = [];
	export let originalContents: { title: string; content: string; archive_name: string }[] = [];
	export let youtubeFormatter: (value: string, index: number) => void;

	$: words_count = countWords(content);

	let contentDiv: HTMLElement;
	let wrapperDiv: HTMLElement;
	let modalDiv: HTMLDialogElement;
	let typingMode: boolean = false; // true => 에디터 중앙 커서 고정
	let isDeleted: boolean = false;
	let selectedAchive: { id: string; name: string } = { id: archive_id, name: '' };
	const archives = getArchive();

	function scrollToBottom(el: HTMLElement) {
		el.scrollTop = el.scrollHeight;
		el.scrollLeft = el.scrollWidth;
	}
	afterUpdate(() => scrollToBottom(wrapperDiv));

	function selectArchive(data: { id: string; name: string }) {
		selectedAchive = { ...data };
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
	}
	
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
		const updatedPost = await db.updatePost({
			id,
			content,
			title,
			words_count,
			archive_id: selectedAchive.id,
		});

		originalContents[index] = {
			title: updatedPost.title,
			content: updatedPost.content,
			archive_name: updatedPost.archives!.name,
		};
		archive_id = updatedPost.archive_id;
		isEdited[index] = false;
	}

	async function updatePublicity() {
		await db.updatePublicity({ id, status: 'public' });
		status = 'public';
	}

	async function deletePost() {
		const { success } = await db.deletePost(id);
		isDeleted = success;
	}
</script>

<article
	class={`mb-20 max-h-[40rem] min-h-[30rem] flex-col justify-center overflow-hidden rounded-xl border border-primary/50 outline-none ${
		isDeleted ? 'hidden' : 'flex'
	}`}
>
	<section bind:this={wrapperDiv} class="flex-grow overflow-y-scroll scroll-smooth">
		<!-- 타이틀 -->
		<input
			class="mb-5 mt-10 w-full bg-bkg text-center text-3xl font-semibold outline-none placeholder:text-content/30"
			aria-label="제목 영역 글쓰기 에디터"
			spellcheck="false"
			placeholder="제목을 입력해주세요"
			bind:value={title}
			on:keypress={onKeyPress}
			on:input={() => toggleEdit(title, index, 'title')}
		/>
		<!-- 본문 -->
		<article
			class="h-full w-full px-5 py-8 outline-none"
			style:padding-bottom={typingMode ? '15rem' : ''}
			aria-label="본문 영역 글쓰기 에디터"
			contenteditable
			spellcheck="false"
			bind:this={contentDiv}
			bind:innerHTML={content}
			on:input={onChange}
		/>
	</section>

	<!-- 바텀 바 -->
	<section class="flex max-h-40 items-center justify-between gap-3 border-t border-primary/50 p-2">
		<div class="flex items-center">
			<Dropdown {modalDiv} selectedAchive={selectedAchive.name}>
				{#if $archives.length}
					<div class="max-h-60 w-full overflow-x-hidden overflow-y-scroll">
						<hr />
						{#each $archives as { id, name }, i (id)}
							<li>
								<button on:click={() => selectArchive({ id, name })}>
									<span class="inline-block w-full truncate">{name}</span>
								</button>
							</li>
						{/each}
					</div>
				{/if}
			</Dropdown>
			<div class="line-clamp-1 flex px-2">
				<span class="line-clamp-1">{originalContents[index].archive_name}</span>
				{#if originalContents[index].archive_name !== selectedAchive.name && selectedAchive.name !== ''}
					<span class="line-clamp-1 px-2">👉🏻&nbsp; {selectedAchive.name}</span>
				{/if}
			</div>
		</div>

		<div class="flex items-center gap-3">
			<span class="text-right text-primary">{countWords(content)}</span>
			<button class="btn btn-primary btn-outline btn-sm w-14" on:click={deletePost}>삭제</button>
			{#if isEdited[index] || (originalContents[index].archive_name !== selectedAchive.name && selectedAchive.name !== '')}
				<button class="btn btn-primary btn-outline btn-sm w-14" on:click={updatePost}>
					수정
				</button>
			{:else if status === 'private'}
				<button
					class="btn btn-primary btn-outline btn-sm w-14"
					disabled={isEdited[index]}
					on:click={updatePublicity}
				>
					발행
				</button>
			{/if}
		</div>
	</section>
</article>

<dialog bind:this={modalDiv} class="modal modal-bottom mx-auto w-72 sm:modal-middle">
	<form method="dialog" class="modal-box grid place-items-center gap-5">
		<input type="text" bind:value={selectedAchive.name} class="input w-full outline-none" />
		<button
			class="btn btn-ghost btn-sm w-full"
			disabled={!selectedAchive.name}
			on:click={async () => {
				const newArchive = await db.createArchive(selectedAchive.name);
				archives.insert(newArchive);
				selectedAchive = { id: '', name: '' };
			}}>만들기</button
		>
	</form>
	<form method="dialog" class="modal-backdrop fixed inset-0">
		<button>close</button>
	</form>
</dialog>
