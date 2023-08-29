<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { NavBar } from '@components';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';
	export let data;
	let { supabase, session, user } = data;
	$: ({ session, user } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Between Parentheses</title>
	<meta name="description" content="심플한 글쓰기 에디터!" />
</svelte:head>

<NavBar {user} />
<main>
	{#key $page.url.pathname}
		<div in:fade={{ duration: 500 }}>
			<slot />
		</div>
	{/key}
</main>

<style>
	main {
		position: relative;
		min-height: 100vh;
		min-height: 100dvh;
		max-width: 100%;
	}
</style>
