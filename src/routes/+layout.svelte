<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { NavBar } from '@components';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { setUser } from '$lib/contexts/user';
	import '../app.css';

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	export let data;
	let { supabase, session, userData } = data;
	$: ({ session, userData } = data);
	$: setUser(userData);
</script>

<NavBar />
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
