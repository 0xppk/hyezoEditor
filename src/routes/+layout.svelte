<script lang="ts">
	import { NavBar } from '@components';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
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

<div class="min-h-screen w-layoutWidth text-base text-content">
	<NavBar />
	<main class="mx-auto flex max-w-4xl flex-col items-center p-5 px-44">
		<slot />
	</main>
</div>
