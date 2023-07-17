<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<section>
	<h2 class="heading">비평</h2>
	<form method="POST" action="?/create" use:enhance class="form">
		<input name="groupname" type="text" class="input" />
		<button type="submit" class="btn">확인</button>
	</form>
</section>

<style>
	.heading {
		text-align: center;
	}

	.btn {
		background-color: var(c-main);
		padding: 0.5em 0.8em;
	}
</style>
