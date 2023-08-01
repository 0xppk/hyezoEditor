<script lang="ts">
	import { HamburgerMenu, DarkMode, Logo, SignIn } from '@components';
	import ProfileIcon from './ProfileIcon.svelte';
	export let user: UserData;

	let navbar_state: 'show' | 'hidden' = 'show';

	function toggleNavbar() {
		addEventListener('scroll', () => {
			if (scrollY > 150) navbar_state = 'hidden';
			else navbar_state = 'show';
		});
	}
</script>

<svelte:window on:scroll={toggleNavbar} />

<nav class="navbar" class:show={navbar_state === 'show'}>
	<Logo />

	<div class="menu-wrapper">
		{#if user?.id}
			<ProfileIcon {user} />
		{:else}
			<SignIn />
		{/if}
		<DarkMode />
		<HamburgerMenu />
	</div>
</nav>

<style type="postcss">
	.navbar {
		position: fixed;
		width: 100%;
		height: var(--h-nav);
		left: 0;
		top: 0;
		z-index: 1;
		padding: 0 1rem;
		background: var(--bkg);
		transform: translateY(-100%);
		transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		opacity: 0;
	}

	:global(.navbar.show) {
		opacity: 1;
		transform: translateY(0);
	}

	.menu-wrapper {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
