<script lang="ts">
	import 'iconify-icon';

	export let src: keyof typeof list;
	export let style: string = '';

	const list = {
		mango: 'twemoji:mango',
		eyes: 'twemoji:eyes',
		egg: 'tabler:egg-cracked',
		zap: 'prime:bolt',
		apple: 'ep:cherry',
		candle: 'noto-v1:candle',
		vol: 'ph:heart-break-duotone',
		bomb: 'noto:bomb',
		loader: 'eva:loader-outline',
		bracket: 'ph:brackets-round-bold',
		silence: 'clarity:moon-line',
		light: 'line-md:moon-alt-to-sunny-outline-loop-transition',
		dark: 'line-md:moon-rising-alt-loop',
	};
</script>

<iconify-icon icon={list[src]} class="icon" {style} />
