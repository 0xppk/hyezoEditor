<script lang="ts">
	import { navConfig } from '$lib/config';
	import { Icons, NavLink } from '@components';

	function onClick() {
		const hamburger = document.getElementById('hamburger') as HTMLInputElement;
		hamburger.checked = false;
	}
</script>

<div class="drawer drawer-end">
	<input id="hamburger" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<label for="hamburger" class="btn btn-ghost drawer-button h-full items-center p-[1.5em]">
			<Icons src="hamburger" style={`font-size: 2rem`} />
		</label>
	</div>
	<div class="drawer-side">
		<label for="hamburger" class="drawer-overlay" />
		<ul class="menu h-full w-80 gap-4 bg-bkg p-4 py-10" role="tablist">
			{#each navConfig as { href, name } (name)}
				<svelte:component this={NavLink} on:click={onClick} {href}>
					{name}
				</svelte:component>
			{/each}
		</ul>
	</div>
</div>

<!-- <div
	class={`fixed right-0 top-0 z-10 min-h-screen w-80 rounded-md bg-bkg duration-500 ease-in-out ${
		hamburgerToggle === 'open' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
	}`}
/> -->
