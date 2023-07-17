<script lang="ts">
</script>

<aside aria-label="sidebar" class="sidebar">
	<slot name="title" />
	<hr />
	<slot name="navList" />
</aside>

<style>
	.sidebar {
		position: fixed;
		left: 0;
		margin-left: 1.5rem;
		width: var(--w-sidebar);
		cursor: default;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1rem;
		overflow-y: auto;
		border-radius: var(--br-lg);
		padding: 1.2rem 0.5rem;
	}
</style>
