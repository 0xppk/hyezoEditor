<script lang="ts">
	import { piled_menu_showList as showList } from '$lib/config';
	import { StepFolder } from '$lib/models/step_folder';
	import { RotateText } from '@components';
	import { onMount } from 'svelte';

	let sticky: HTMLDivElement;

	onMount(() => {
		scrollTo({ top: 0 });
		StepFolder.getInstance(sticky);
		return () => StepFolder.removeInstance();
	});
</script>

<div class="container bg-bkg">
	<div bind:this={sticky} class="sticky-wrapper">
		<div class="hero-section">
			<RotateText />
		</div>
		{#each showList as { title, src, category, description } (title)}
			<section class="bg-bkg">
				<header class="font-basis text-sm">
					<span class="font-basis text-sm">{title}</span>
					<span>{description}</span>
					<span>{category}</span>
				</header>
				<figure>
					<img {src} alt={title} />
				</figure>
			</section>
		{/each}
	</div>
</div>

<footer class="bg-bkg font-basis text-sm">
	<div>&nbsp;</div>
	<div>
		<span>&copy; 2023</span>
		<span>CONTACT</span>
		<span>&nbsp;</span>
		<span>If you're going to</span>
	</div>
	<div>
		<span>hyezoprk</span>
		<span>&nbsp;</span>
		<span>☎️</span>
		<span>do something,</span>
	</div>
	<div>
		<span>&nbsp;</span>
		<span>&nbsp;hyezoprk</span>
		<span>010-7351-0097</span>
		<span>&nbsp;</span>
	</div>
	<div>
		<span>Developed by</span>
		<span>@kakao.com</span>
		<span>&nbsp;</span>
		<span>do it to a death!</span>
	</div>

	<div>Svelte</div>
	<div>&nbsp;</div>
</footer>

<style type="postcss">
	.container {
		max-width: 100%;
		min-height: 590vh;
		position: relative;
	}

	.sticky-wrapper {
		position: sticky;
		top: 0;
		max-height: 100vh;
	}

	.hero-section {
		min-height: 100vh;
		font-size: 2rem;
		padding: 1em;
		position: relative;
	}

	:global(.marquee-wrapper) {
		overflow-x: hidden;
		border-top: 1px solid var(--border-color);
		min-height: 100vh;
	}

	:global(.marquee) {
		width: 100%;
		height: 300px;
		scale: 2;
		transform-origin: center top;
	}

	:global(.marquee) > img {
		height: 100% !important;
	}

	:global(.hero-marquee) {
		bottom: 0;
		position: absolute;
		scale: 2;
		transform-origin: center bottom;
		padding: 1em;
	}

	:global(.marquee) > img {
		height: 100% !important;
	}

	section {
		width: 100%;
		height: 100%;
		position: absolute;

		& header {
			height: 2vh;
			border-top: 1px solid var(--border-color);
			padding: 0 0.5em;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text-transform: uppercase;

			& * {
				width: 100%;
			}

			& *:nth-child(2) {
				text-align: center;
			}

			& *:nth-child(3) {
				text-align: right;
			}
		}

		& figure {
			height: 100%;
			overflow: hidden;
			transform-origin: 'top right';
			transform: scale(0);

			& img {
				display: block;
				max-width: 100%;
				object-fit: cover;
			}
		}
	}

	footer {
		width: 100%;
		position: absolute;
		bottom: -8vh;
		display: flex;
		flex-direction: column;

		& div {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid var(--border-color);
			gap: 1rem;
			padding: 0.25em 1em;

			& span {
				width: 25%;
			}
		}
	}
</style>
