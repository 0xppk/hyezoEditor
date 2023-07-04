<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Icons, NavLink } from '@components';
	import { onMount } from 'svelte';

	const navConfig = [
		{ href: '/post', name: 'Post', icon: 'addPost' },
		{ href: '/archive', name: 'Archive', icon: 'archive' },
		{ href: '/group', name: 'Commune', icon: 'group' },
	];
	const themeValue = $page.data.theme;
	let currentTheme: string | undefined;

	onMount(setTheme);

	function setTheme() {
		const systemPrefferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';

		currentTheme = themeValue ?? systemPrefferredTheme;
		document.documentElement.dataset.theme = currentTheme;
	}

	function toggleTheme() {
		const value = currentTheme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = value;
		document.cookie = `siteTheme=${value};max-age=31536000;path="/"`;
		currentTheme = value;
	}

	$: renderThemeIcon = () => {
		if (!currentTheme) {
			return themeValue === 'dark' ? '🧢' : '🍑';
		}
		return currentTheme === 'dark' ? '🧢' : '🍑';
	};
</script>

<nav class="sticky left-0 top-0 z-10 flex h-nav items-center justify-between border-b bg-bkg">
	<button id="logo" class="flex items-center" on:click={() => goto('/')}>
		<Icons icon="chevronLeft" size="30" />
		<Icons icon="chevronRight" size="30" />
		<span>Parenthesis</span>
	</button>
	<div class="hidden sm:flex sm:items-center sm:gap-2 sm:pr-2">
		<ul class="menu flex-row" role="tablist">
			{#each navConfig as { href, name } (name)}
				<svelte:component this={NavLink} {href}>
					{name}
				</svelte:component>
			{/each}
		</ul>
		<Icons icon="pause" size="20" className="text-content/30" />
		<Icons icon="user" size="20" href="/profile" />
		<button
			class="btn-ghost btn text-lg"
			on:click={toggleTheme}
			aria-label={`다크모드 토글 스위치. 현재 테마는 ${currentTheme}`}
		>
			{renderThemeIcon()}
		</button>
	</div>
</nav>
