<script lang="ts">
	import { Icons } from '@components';
</script>

<div class="wrapper">
	<div class="row">
		<span>between</span>
		<div class="quote">
			<p>if you're going to do something,</p>
			<p class="center">do it to a death.</p>
			<p class="right">otherwise, don't bother starting.</p>
		</div>
	</div>
	<div class="row">
		<span>paren</span>
		<div class="stack">
			<Icons src="loader" />
			<span>t</span>
		</div>
		<span>heses</span>
		<span>: </span>
	</div>
	<div class="row">
		<span>Ne</span>
		<div class="stack">
			<span>v</span>
			<Icons src="vol" />
		</div>
		<span>er</span>
		<span>&nbsp;</span>
		<span>lo</span>
		<div class="stack">
			<span>s</span>
			<Icons src="zap" />
		</div>
		<span>e</span>
	</div>
	<div class="row">
		<span>terr</span>
		<div class="stack">
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
		<div class="stack">
			<span>c</span>
			<Icons src="silence" />
		</div>
		<span>e</span>
	</div>
</div>

<style>
	:root {
		--text: clamp(2rem, calc(1.58rem + 6.07vw), 10rem);
		--border: clamp(0.5rem, calc(0.34rem + 0.69vw), 1.3rem);
		--padding: clamp(0.8rem, calc(0.47rem + 1.39vw), 2.4rem);
		--margin: clamp(0.05em, calc(0.07rem + -0.02vw), 0.07em);
	}

	.wrapper {
		font: var(--text) var(--ff-line);
		padding: calc(1em + var(--h-nav)) 0;
		line-height: 1;
		text-transform: uppercase;
		position: relative;
	}

	.row {
		display: flex;
		align-items: center;
		position: static;
	}

	.stack > span:nth-child(1),
	.stack > :global(.icon):nth-child(1) {
		animation: fadeOffBeat 1.5s ease-in 0s infinite;
	}

	.stack > span:nth-child(2),
	.stack > :global(.icon):nth-child(2) {
		animation: fade 1.5s ease-out 0s infinite;
	}

	:global(.icon) {
		padding-top: 0.2rem;
		position: absolute;
		font-size: var(--text);
	}

	.circle {
		border: var(--border) solid var(--c-mainText);
		border-radius: 5rem;
		padding: var(--padding);
		margin-top: var(--margin);
		animation: long-O 3.5s ease-in-out 0s infinite;
	}

	.quote {
		width: 15rem;
		position: absolute;
		bottom: -20%;
		left: 5%;
		font: var(--fs-sm) var(--ff-basis);
		line-height: 1.4;
		text-transform: lowercase;
	}
	.quote > .center {
		text-align: center;
	}
	.quote > .right {
		text-align: right;
	}

	@media (--desktop) {
		.wrapper {
			padding: calc(0.4em + var(--h-nav)) 0.3em;
		}
		.row {
			position: relative;
		}
		.quote {
			top: 10%;
			left: 70%;
			bottom: auto;
		}
	}

	@keyframes long-O {
		from {
			width: 3rem;
		}
		50% {
			width: 18rem;
		}
		70% {
			width: 18rem;
		}
		100% {
			width: 3rem;
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		33% {
			opacity: 1;
		}
		55% {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fadeOffBeat {
		from {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
