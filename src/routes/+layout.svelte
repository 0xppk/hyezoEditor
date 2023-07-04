<script lang="ts">
	import { NavBar } from '@components';
	import '../app.css';
	// import { twemoji } from 'twemoji-svelte-action';
	// const options = {
	// 	folder: 'svg',
	// 	ext: '.svg',
	// };
</script>

<div class="min-h-screen w-layoutWidth text-base text-content">
	<NavBar />
	<main class="mx-auto flex max-w-4xl flex-col items-center p-5 px-44">
		<slot />
	</main>
</div>
