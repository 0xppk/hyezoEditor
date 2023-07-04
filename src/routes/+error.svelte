<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="fixed bottom-0 flex h-layoutHeight flex-col justify-center">
	<h4 class="inline-flex items-center gap-2">{$page.error?.message}</h4>
</div>
