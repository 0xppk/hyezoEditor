<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navConfig } from '$lib/config';
	import { Icons, NavLink } from '@components';
	import { onMount } from 'svelte';

	const themeValue = $page.data.theme;
	let currentTheme: 'dark' | 'light' | undefined;
	let isShow: 'show' | 'hidden' = 'show';

	function setTheme() {
		const systemPrefferredTheme = matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
		currentTheme = themeValue ?? systemPrefferredTheme;
		document.documentElement.dataset.theme = currentTheme;
	}

	onMount(setTheme);

	function toggleTheme() {
		currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = currentTheme;
		document.cookie = `siteTheme=${currentTheme};max-age=31536000;path="/"`;
	}

	function toggleNavbar() {
		addEventListener('scroll', () => {
			if (scrollY > 150) isShow = 'hidden';
			else isShow = 'show';
		});
	}

	$: renderThemeIcon = () => {
		if (!currentTheme) {
			return themeValue === 'dark' ? 'dark' : 'light';
		}
		return currentTheme === 'dark' ? 'dark' : 'light';
	};
</script>

<svelte:window on:scroll={toggleNavbar} />

<nav class="navbar" class:show={isShow === 'show'}>
	<button class="logo btn" on:click={() => goto('/')}>
		<Icons src="bracket" style="font-size: 2rem;" />
	</button>
	<div class="menu-wrapper">
		<ul class="menu" role="tablist">
			{#each navConfig as { href, name } (name)}
				<svelte:component this={NavLink} {href}>
					{name}
				</svelte:component>
			{/each}
		</ul>
		<button
			class="btn"
			on:click={toggleTheme}
			aria-label={`다크모드 토글 스위치. 현재 테마는 ${currentTheme}`}
		>
			<Icons src={renderThemeIcon()} style="color: orange; font-size: 2rem;" />
		</button>
	</div>
</nav>

<style>
	.navbar {
		display: none;
	}

	@media (--tablet) {
		.navbar {
			position: fixed;
			width: 100%;
			height: var(--h-nav);
			left: 0;
			top: 0;
			z-index: 1;
			padding: 0 2rem;
			border-bottom: 1px solid var(--c-border);
			background: var(--c-bkg);
			transform: translateY(-100%);
			transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 2rem;
			padding-right: 0.5rem;
			opacity: 0;
		}

		:global(.navbar.show) {
			opacity: 1;
			transform: translateY(0);
		}

		.menu-wrapper {
			display: flex;
			gap: 2rem;
			padding: 0 2rem;
		}

		.menu {
			display: flex;
			align-items: center;
			justify-items: center;
			gap: 2rem;
		}

		.btn {
			padding: 1em;
			border: none;
			background: transparent;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: var(--fs-lg);
			cursor: pointer;
		}
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
