<script lang="ts">
	import { goto } from '$app/navigation';
	import { getArchive } from '$lib/context/archive';
	import { db } from '$lib/db/client';
	import { countWords } from '$lib/utils';
	import { afterUpdate } from 'svelte';
	import Dropdown from './Dropdown.svelte';

	export let content: string;
	export let youtubeFormatter: (value: string) => void;
	let title: string;
	let selectedAchive: { id: string; name: string } = { id: '', name: '' };
	$: words_count = countWords(content);

	let contentDiv: HTMLElement;
	let wrapperDiv: HTMLElement;
	let modalDiv: HTMLDialogElement;
	let typingMode: boolean = false; // true => 에디터 중앙 커서 고정

	// 스토어 변수
	const archives = getArchive();

	// 라이프 사이클
	function scrollToBottom(el: HTMLElement) {
		el.scrollTop = el.scrollHeight;
	}
	afterUpdate(() => scrollToBottom(wrapperDiv));

	// 이벤트 핸들러
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

	async function createNewPost(status?: TPostStatus) {
		await db.createNewPost({
			title,
			content,
			words_count,
			archive_id: selectedAchive.id,
			status,
		});
		goto('/archive');
	}
</script>

<article
	class="flex max-h-[85%] min-h-[70%] flex-col justify-center overflow-hidden rounded-xl border border-primary/50 outline-none sm:max-h-full"
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
			on:input={() => youtubeFormatter(content)}
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
			<span class="line-clamp-1 px-2">{selectedAchive.name}</span>
		</div>

		<div class="flex items-center gap-3">
			<span class="text-right text-primary">{countWords(content)}</span>
			<button
				class="btn-primary btn-outline btn-sm btn w-14"
				on:click={e => {
					e.preventDefault();
					typingMode = !typingMode;
					contentDiv.focus();
				}}
			>
				눌러
			</button>
			<button
				class="btn-primary btn-outline btn-sm btn w-14"
				on:click={() => createNewPost('public')}
			>
				발행
			</button>
			<button on:click={() => createNewPost()} class="btn-primary btn-outline btn-sm btn w-14">
				저장
			</button>
		</div>
	</section>
</article>

<dialog bind:this={modalDiv} class="modal modal-bottom mx-auto w-72 sm:modal-middle">
	<form method="dialog" class="modal-box grid place-items-center gap-5">
		<input type="text" bind:value={selectedAchive.name} class="input w-full outline-none" />
		<button
			class="btn-ghost btn-sm btn w-full"
			disabled={!selectedAchive}
			on:click={async () => {
				const newArchive = await db.createArchive(selectedAchive.name);
				archives.insert(newArchive);
				selectedAchive = { id: '', name: '' };
			}}
		>
			만들기
		</button>
	</form>
	<form method="dialog" class="modal-backdrop fixed inset-0">
		<button>close</button>
	</form>
</dialog>
