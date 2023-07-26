<script lang="ts">
	import { NavBar } from '@components';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import '../app.css';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
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
