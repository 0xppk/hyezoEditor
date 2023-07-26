<script lang="ts">
	import { Icons } from '@components';
</script>

<div class="wrapper font-line">
	<div class="row">
		<span>between</span>
		<div class="quote font-basis text-sm">
			<p>hello</p>
		</div>
		<div class="quote font-basis text-sm">
			<p>always asking myself</p>
			<p class="text-center">"what is memorable things?"</p>
		</div>
	</div>
	<div class="row">
		<span>paren</span>
		<div class="stacking">
			<Icons src="loader" />
			<span>t</span>
		</div>
		<span>heses</span>
		<span>: </span>
	</div>

	<div class="row">
		<span>Ne</span>
		<div class="stacking">
			<span>v</span>
			<Icons src="vol" />
		</div>
		<span>er</span>
		<span>&nbsp;</span>
		<span>lo</span>
		<div class="stacking">
			<span>s</span>
			<Icons src="zap" />
		</div>
		<span>e</span>
	</div>

	<div class="row">
		<span>terr</span>
		<div class="stacking">
			<Icons src="egg" />
			<span>o</span>
		</div>
		<span>r</span>
	</div>

	<div class="row">
		<span class="circle" />
		<span>f</span>
	</div>

	<div class="row">
		<span>s</span>
		<span>i</span>
		<span>len</span>
		<div class="stacking">
			<span>c</span>
			<Icons src="silence" />
		</div>
		<span>e</span>
	</div>
</div>

<style lang="postcss">
	.wrapper {
		font-size: clamp(1.5rem, calc(1.28rem + 5.77vw), 10rem);
		padding: calc(1em + var(--h-nav)) 0;
		line-height: 1;
		text-transform: uppercase;
		position: absolute;
	}

	.row {
		display: flex;
		align-items: center;
	}

	.stacking {
		display: grid;
		grid-template-areas: 'stacking';
		place-items: center;
	}

	.stacking > * {
		grid-area: stacking;
	}

	.stacking > span:nth-child(1),
	.stacking > :global(.icon):nth-child(1) {
		animation: fadeOffBeat 1.5s ease-in infinite;
		animation-delay: 200ms;
	}

	.stacking > span:nth-child(2),
	.stacking > :global(.icon):nth-child(2) {
		animation: fade 1.5s ease-out infinite;
	}

	:global(.icon) {
		padding-top: 0.2rem;
		position: absolute;

		&:hover {
			background-color: transparent;
		}
	}

	.circle {
		--border: clamp(0.3rem, calc(0.28rem + 0.79vw), 1.3rem);
		--padding: clamp(0.5rem, calc(0.35rem + 1.19vw), 2.4rem);
		--margin: clamp(0.04em, calc(0.05rem + -0.01vw), 0.07em);

		border-radius: 5rem;
		padding: var(--padding);
		margin-top: var(--margin);
		animation: long-O 3.5s ease-in-out 0s infinite;
		border: var(--border) solid var(--icon-color);
	}

	.quote {
		width: 15rem;
		position: absolute;
		bottom: 0;
		left: 5%;
		line-height: 1.4;
		text-transform: none;
	}

	@media (--desktop) {
		.row {
			position: relative;
		}
		.wrapper {
			padding: var(--p-nav);
		}

		.row:nth-child(1) .quote:nth-of-type(1) {
			top: 20%;
			left: 90%;
			bottom: auto;
		}

		.row:nth-child(1) .quote:nth-of-type(2) {
			top: 20%;
			left: 100%;
			bottom: auto;
		}
	}

	@keyframes long-O {
		from,
		to {
			width: 3rem;
		}
		50% {
			width: 18rem;
		}
		70% {
			width: 18rem;
		}
	}

	@keyframes fade {
		from,
		to {
			opacity: 0;
		}
		33% {
			opacity: 1;
		}
		55% {
			opacity: 1;
		}
	}

	@keyframes fadeOffBeat {
		from,
		to {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
