<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { DEFAULT_AVATAR } from '$lib/config';
	export let user: UserData;
	let profile_icon: 'open' | 'close' = 'close';

	function toggleProfileIcon() {
		profile_icon = profile_icon === 'open' ? 'close' : 'open';
	}
	async function logout() {
		await fetch('/api/login/sign_out', {
			method: 'POST',
		});
		await invalidateAll();
		goto('/');
	}
</script>

<div class="dropdown dropdown-end">
	<button on:click={toggleProfileIcon} class="avatar btn btn-ghost p-0">
		<div class="mask mask-circle mx-1 w-7">
			<img src={user.avatar_url || DEFAULT_AVATAR} alt="profile icon" />
		</div>
	</button>
	<ul
		tabindex="0"
		class="menu dropdown-content rounded-box z-[1] mt-1 w-36 bg-base-100 p-2 shadow"
		role="tablist"
	>
		<li><a href="/profile">개인정보 수정</a></li>
		<li>
			<button on:click={logout}>로그아웃</button>
		</li>
	</ul>
</div>
