<script lang="ts">
	import { piled_menu_showList as showList } from '$lib/config';
	import { StepFolder } from '$lib/model/step_folder';
	import { RotateText } from '@components';
	import { onMount } from 'svelte';

	let sticky: HTMLDivElement | null;

	onMount(() => {
		scrollTo({ top: 0 });
		const stepFolder = new StepFolder({ sticky });
		return () => stepFolder.clearSetup();
	});
</script>

<div class="container">
	<div bind:this={sticky} class="sticky">
		<div class="hero">
			<RotateText />
		</div>
		{#each showList as { title, src, category, description } (title)}
			<section>
				<header>
					<h3 class="title">{title}</h3>
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

<footer>
	<div>&nbsp;</div>
	<div>&copy; 2023</div>
	<div>hyezoprk</div>
	<div>
		<span>&nbsp;</span>
		<span>hyezoprk@kakao.com</span>
		<span>아무말</span>
		<span>대잔치를 벌여도</span>
		<span>같은 결과일까</span>
	</div>
	<div>Developed by</div>
	<div style="text-transform: uppercase;">🍑 svelte</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
</footer>

<style type="postcss">
	.container {
		background-color: var(--c-bkg);
		width: 100%;
		min-height: 590vh;
	}

	.sticky {
		position: sticky;
		top: 0;
		width: 100%;
		max-height: 100vh;
	}

	.hero {
		min-height: 100vh;
		font-size: 2rem;
		padding: 1em;
		position: relative;
	}

	:global(.marquee-wrapper) {
		overflow-x: hidden;
		border-top: 1px solid var(--c-border);
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
		background: var(--c-bkg);

		& header {
			height: var(--nav-height);
			border-top: 1px solid var(--c-border);
			padding: 0 0.5em;
			font: var(--fs-sm) var(--ff-basis);
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
		font: var(--fs-sm) var(--ff-basis);
		display: flex;
		flex-direction: column;
		& div {
			display: flex;
			flex-grow: 1;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid var(--c-border);
			padding: 0.4em 1em;
		}
	}
</style>
