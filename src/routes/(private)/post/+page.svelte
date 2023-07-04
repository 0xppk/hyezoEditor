<script lang="ts">
	import { converterLtGt } from '$lib/utils';
	import { Editor } from '@components';

	let value = '';
	const youtubeFormatter = (val: string) => {
		const convertedValue = converterLtGt(val) ?? '';
		value = convertedValue;
		console.log(convertedValue);
	};
</script>

<Editor content={value} {youtubeFormatter} />
