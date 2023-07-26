<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Icons } from '@components';

	const themeValue = $page.data.theme;
	let currentTheme: 'dark' | 'light' | undefined;

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

	$: renderThemeIcon = () => {
		if (!currentTheme) {
			return themeValue === 'dark' ? 'dark' : 'light';
		}
		return currentTheme === 'dark' ? 'dark' : 'light';
	};
</script>

<button
	class="btn btn-ghost p-[1.5em]"
	on:click={toggleTheme}
	aria-label={`다크모드 토글 스위치. 현재 테마는 ${currentTheme}`}
>
	<Icons src={renderThemeIcon()} style="color: orange; font-size: 1.6rem;" />
</button>
