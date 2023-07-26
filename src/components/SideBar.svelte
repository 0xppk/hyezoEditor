<script lang="ts">
</script>

<aside aria-label="sidebar" class="sidebar">
	<h2><slot name="username" /></h2>
	<slot name="title" />
	<hr />
	<slot name="navList" />
</aside>

<style>
	.sidebar {
		width: var(--w-sidebar);
		cursor: default;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1rem;
		overflow-y: auto;
		padding: 1.2rem 0.5rem;
	}
</style>
