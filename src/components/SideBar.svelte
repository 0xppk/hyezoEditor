<aside aria-label="sidebar" class="sidebar">
	<slot name="username" />
	<slot name="title" />
	<hr />
	<slot name="navList" />
</aside>

<style lang="postcss">
	.sidebar {
		display: none;
		width: 5rem;

		@media (--desktop) {
			display: flex;
			width: var(--w-sidebar);
			cursor: default;
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
			overflow-y: auto;
			padding: 1.2rem 0.5rem;
		}
	}
</style>
