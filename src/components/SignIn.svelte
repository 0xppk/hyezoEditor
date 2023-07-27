<script lang="ts">
	import { goto } from '$app/navigation';
	import Icons from './Icons.svelte';

	function onClick() {
		goto('/signup');
	}
</script>

<button on:click={onClick} class="btn btn-ghost pb-1">
	<Icons src="signIn" />
</button>
