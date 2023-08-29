<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	let auth_state: 'sign in' | 'sign up' = 'sign in';

	function changeMode() {
		auth_state = auth_state === 'sign in' ? 'sign up' : 'sign in';
	}

	function onRequest() {
		if (auth_state === 'sign in') goto('/');
	}
</script>

<div class="w-full max-w-lg">
	<label for="auth" class="flex justify-center py-4 text-4xl font-bold">
		{auth_state === 'sign in' ? 'Welcome Back' : 'Create New Account'}
	</label>
	<form
		id="auth"
		method="POST"
		use:enhance
		action={auth_state === 'sign in' ? '?/login' : '?/register'}
		class="form-control gap-2"
	>
		<input type="email" name="email" autocomplete="username" class="input" />
		<input type="password" name="password" autocomplete="current-password" class="input" />
		<button on:click|preventDefault={changeMode} class="text-blue-700">
			{auth_state === 'sign in' ? "Don't you have an account?" : 'You already have an account?'}
		</button>
		<button type="submit" class="btn btn-primary" on:click={onRequest}>
			{auth_state === 'sign in' ? 'sign in' : 'sign up'}
		</button>
	</form>
</div>
