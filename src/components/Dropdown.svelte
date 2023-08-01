<script lang="ts">
	export let selectedAchive: string;
	export let modalDiv: HTMLDialogElement;
</script>

<div class="dropdown-top dropdown">
	<button class="btn btn-ghost">🗂️</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="menu dropdown-content rounded-box z-[1] w-52 overflow-x-hidden bg-base-100 p-2 shadow"
	>
		<div class="flex items-center justify-between">
			<li class="pointer-events-none">
				<span>Archives</span>
			</li>
			<button
				class="btn-circle btn-ghost btn-sm"
				on:click={() => {
					modalDiv.showModal();
					selectedAchive = '';
				}}
			>
				+
			</button>
		</div>
		<slot />
	</ul>
</div>
