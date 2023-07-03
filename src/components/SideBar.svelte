<script lang="ts">
	import { archive } from '$lib/stores/archive';
	import { fetcher } from '$lib/utils';
	import { Icons } from '@components';
	import { fade } from 'svelte/transition';

	export let archiveData: { id: string; name: string }[] | undefined;

	let archiveName: string;
	let archiveNameElements: HTMLSpanElement[] = Array(archiveData?.length).fill(null);
	let isEditing: boolean = false;

	async function addArchive() {
		await fetcher<TArchive>('/api/addArchive', 'POST', {
			name: archiveName,
		});
		archive.select(archiveName);
	}

	async function updateArchive(id: string, index: number) {
		await fetcher('/api/updateArchive', 'PATCH', {
			id,
			name: archiveNameElements[index].textContent,
		});
	}

	async function deleteArchive(id: string) {
		await fetcher('/api/deleteArchive', 'DELETE', {
			id,
		});
	}
</script>

<aside
	aria-label="sidebar"
	class="fixed left-0 ml-12 flex w-sidebar cursor-default flex-col items-stretch gap-4 overflow-y-auto rounded-lg border border-secondary py-5">
	<div class="flex justify-between px-2">
		<span>아카이브</span>
		<Icons
			icon="setting"
			size="20"
			type="solid"
			on:click={() => (isEditing = !isEditing)}
			className="text-black/80 cursor-pointer" />
	</div>
	<hr />
	<ul role="navigation" class="px-2" aria-label="sidebar navigation">
		{#if archiveData?.length}
			{#each archiveData as { id, name }, i (id)}
				<li
					class="my-1 flex items-center justify-between outline-none"
					on:pointerdown={() => archive.select(name)}>
					<div>
						<span>🗂️&nbsp;</span>
						<span
							class="outline-none"
							contenteditable={isEditing}
							bind:this={archiveNameElements[i]}>
							{name}
						</span>
					</div>
					{#if isEditing}
						<div>
							<button
								in:fade
								class="btn-ghost btn-xs btn animate-none text-xs"
								disabled={isEditing}
								on:click={() => updateArchive(id, i)}>
								수정
							</button>
							<button
								in:fade
								class="btn-ghost btn-xs btn animate-none text-xs"
								on:click={() => deleteArchive(id)}>
								삭제
							</button>
						</div>
					{/if}
				</li>
			{/each}
		{/if}
		{#if !archiveData?.length || isEditing}
			<div in:fade class="flex justify-between">
				<span>💬&nbsp;</span>
				<!-- svelte-ignore a11y-autofocus -->
				<li
					bind:textContent={archiveName}
					autofocus
					contenteditable
					class="flex-grow caret-primary outline-none" />
				<button
					class={`btn-success btn-xs btn duration-500 ${archiveName ? 'opacity-100' : 'opacity-0'}`}
					on:click={addArchive}>
					만들기
				</button>
			</div>
		{/if}
	</ul>
</aside>
