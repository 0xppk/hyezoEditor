<script lang="ts">
	import {
		Icon,
		Pause,
		UserCircle,
		ChevronLeft,
		ChevronRight,
		type IconSource,
	} from 'svelte-hero-icons';

	export let icon: TIconSetup;
	export let size: string = '36';
	export let className: string = '';

	const config = {
		chevronLeft: ChevronLeft,
		chevronRight: ChevronRight,
		pause: Pause,
		user: UserCircle,
	} satisfies Record<TIconSetup, IconSource>;
</script>

<svelte:component this={Icon} {size} src={config[icon]} class={className} />
