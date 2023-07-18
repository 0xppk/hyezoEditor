<script lang="ts">
	import { converterLtGt } from '$lib/utils';
	import { Editor } from '@components';

	let value = '';
	const youtubeFormatter = (val: string) => {
		const convertedValue = converterLtGt(val) ?? '';
		value = convertedValue;
	};
</script>

<div class="container">
	<Editor content={value} {youtubeFormatter} />
</div>

<style>
	.container {
		height: var(--h-layoutHeight);
		width: 100%;
		display: flex;
		align-items: center;
		padding: 1.2rem 0;
	}

	@media (--tablet) {
		.container {
			display: block;
			align-items: start;
			padding: 15rem;
		}
	}
</style>
