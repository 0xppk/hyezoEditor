<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error">
	<h4 class="error-content">{$page.error?.message}</h4>
</div>

<style>
	.error {
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: column;
		height: var(--h-layout);
		justify-content: center;
	}

	.error-content {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
