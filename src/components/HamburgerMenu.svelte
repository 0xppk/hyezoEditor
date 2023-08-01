<script lang="ts">
	import { navConfig } from '$lib/config';
	import { Icons, NavLink } from '@components';

	let hamburgerToggler: HTMLInputElement;
	const menuToggle = () => (hamburgerToggler.checked = false);
</script>

<div class="drawer drawer-end">
	<input bind:this={hamburgerToggler} id="hamburger" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<label for="hamburger" class="btn btn-ghost drawer-button h-full items-center pb-1">
			<Icons src="hamburger" style={`font-size: 2rem`} />
		</label>
	</div>
	<div class="drawer-side">
		<label for="hamburger" class="drawer-overlay" />
		<ul class="menu h-full w-80 gap-4 bg-bkg p-4 py-10" role="tablist">
			{#each navConfig as { href, name } (name)}
				<svelte:component this={NavLink} on:click={menuToggle} {href}>
					{name}
				</svelte:component>
			{/each}
		</ul>
	</div>
</div>
