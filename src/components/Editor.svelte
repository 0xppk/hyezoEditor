<script lang="ts">
	import { goto } from '$app/navigation';
	import { getArchive } from '$lib/context/archive';
	import { db } from '$lib/db/client';
	import { countWords } from '$lib/utils';
	import { afterUpdate } from 'svelte';
	import Modal from './Modal.svelte';

	export let content: string;
	export let youtubeFormatter: (value: string) => void;
	let title: string;
	let selectedAchive: string = '';
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
	function onKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			contentDiv.focus();
		}
	}

	function selectArchive(name: string) {
		selectedAchive = name;
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
	}

	async function createNewPost(status?: TPostStatus) {
		await db.addNewPost({
			title,
			content,
			words_count,
			archive_name: selectedAchive,
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
		<!-- 아카이브 목록 드랍다운 메뉴 -->
		<div class="dropdown-top dropdown">
			<button class="btn-ghost btn">🗂️ {selectedAchive}</button>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
				<div class="flex items-center justify-between">
					<li class="pointer-events-none">
						<span>Archives</span>
					</li>
					<button
						class="btn-ghost btn-sm btn-circle text-black/90"
						on:pointerdown={() => modalDiv.showModal()}
					>
						➕
					</button>
				</div>
				{#if $archives.length}
					<hr />
					{#each $archives as { id, name }, i (id)}
						<li on:pointerdown={() => selectArchive(name)}>
							<span>{name}</span>
						</li>
					{/each}
				{/if}
				<!-- Open the modal using ID.showModal() method -->

				<!-- 아카이브 리스트 끝 -->
			</ul>
		</div>
		<div class="flex items-center gap-3">
			<span class="text-right text-primary">{countWords(content)}</span>
			<button
				class="btn-primary btn-outline btn-sm btn w-14"
				on:pointerdown={e => {
					e.preventDefault();
					typingMode = !typingMode;
					contentDiv.focus();
				}}
			>
				눌러
			</button>
			<button
				class="btn-primary btn-outline btn-sm btn w-14"
				on:pointerdown={() => createNewPost('public')}
			>
				발행
			</button>
			<button
				on:pointerdown={() => createNewPost()}
				class="btn-primary btn-outline btn-sm btn w-14"
			>
				저장
			</button>
		</div>
	</section>
</article>

<svelte:component this={Modal} {modalDiv} />
