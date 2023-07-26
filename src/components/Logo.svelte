<script lang="ts">
	import { goto } from '$app/navigation';
	import Icons from './Icons.svelte';
</script>

<button class="logo btn btn-ghost p-[1.5em]" on:click={() => goto('/')}>
	<Icons src="bracket" style="font-size: 2rem;" />
</button>
