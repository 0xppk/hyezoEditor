<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		ArchiveBox,
		ChevronLeft,
		ChevronRight,
		Icon,
		Pause,
		PlusSmall,
		UserCircle,
		type IconSource,
	} from 'svelte-hero-icons';

	export let icon: TIconSetup;
	export let size: string = '36';
	export let className: string = '';
	export let href: string | undefined = undefined;

	const config = {
		chevronLeft: ChevronLeft,
		chevronRight: ChevronRight,
		pause: Pause,
		user: UserCircle,
		plus: PlusSmall,
		archiveBox: ArchiveBox,
	} satisfies Record<TIconSetup, IconSource>;
</script>

{#if href}
	<a class="btn-ghost btn" {href} aria-label={`${href}로 페이지 이동`} on:click>
		<svelte:component this={Icon} {size} src={config[icon]} class={className} />
	</a>
{:else}
	<svelte:component this={Icon} {size} src={config[icon]} class={className} />
{/if}
