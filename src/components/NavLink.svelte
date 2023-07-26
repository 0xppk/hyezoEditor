<script lang="ts">
	export let href: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class="font-basis text-lg" on:click role="tab">
	<a {href}>
		<slot />
	</a>
</li>
