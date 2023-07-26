<script lang="ts">
	import { converterLtGt } from '$lib/utils';
	import { Editor } from '@components';

	let value = '';
	const youtubeFormatter = (val: string) => {
		const convertedValue = converterLtGt(val) ?? '';
		value = convertedValue;
	};
</script>

<div class="h-layout w-full py-20 sm:block sm:p-20 md:max-w-3xl lg:max-w-6xl lg:p-60">
	<Editor content={value} {youtubeFormatter} />
</div>
