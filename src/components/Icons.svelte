<script lang="ts">
	import {
		ArchiveBox,
		ChevronLeft,
		ChevronRight,
		Icon,
		Pause,
		PlusSmall,
		UserCircle,
		Cog6Tooth,
		type IconSource,
	} from 'svelte-hero-icons';

	export let icon: TIconSetup;
	export let size: string = '36';
	export let className: string = '';
	export let href: string | undefined = undefined;
	export let type: 'solid' | 'outline' | 'mini' = 'outline';

	const config = {
		chevronLeft: ChevronLeft,
		chevronRight: ChevronRight,
		pause: Pause,
		user: UserCircle,
		plus: PlusSmall,
		archiveBox: ArchiveBox,
		setting: Cog6Tooth,
	} satisfies Record<TIconSetup, IconSource>;
</script>

{#if href}
	<a class="btn-ghost btn" {href} aria-label={`${href}로 페이지 이동`} on:click>
		<svelte:component this={Icon} {size} src={config[icon]} class={className} />
	</a>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span role="button" tabindex="0" on:click>
		<svelte:component
			this={Icon}
			solid={type === 'solid'}
			outline={type === 'outline'}
			mini={type === 'mini'}
			{size}
			src={config[icon]}
			class={className} />
	</span>
{/if}
