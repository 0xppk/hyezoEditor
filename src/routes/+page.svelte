<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<section>
	<h2 class="text-center">비평</h2>
	<form method="POST" action="?/create" use:enhance class="form-control gap-2">
		<input name="groupname" type="text" class="input bg-accent" />
		<button type="submit" class="btn-primary btn-sm btn">확인</button>
	</form>
</section>
