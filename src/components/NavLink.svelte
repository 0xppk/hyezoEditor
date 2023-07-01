<script lang="ts">
	export let href: string;
</script>

<li role="tab">
	<a {href}>
		<slot />
	</a>
</li>
