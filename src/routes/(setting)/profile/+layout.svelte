<script lang="ts">
	import { setProfileState } from '$lib/contexts/profile.js';
	import SideBar from '@components/SideBar.svelte';
	export let data;
	$: ({ user } = data);
	const profile = setProfileState('edit');

	function profileEdit() {
		profile.setState('edit');
	}
	function profileDelte() {
		profile.setState('delete');
	}
</script>

<div class="profile-layout">
	<SideBar>
		<h2 slot="username">{user?.username || 'Guest'}</h2>
		<span slot="title" class="font-bold">나의 계정 설정</span>
		<ul slot="navList" class="flex flex-col gap-1">
			<li>
				<button class="btn btn-ghost btn-sm" on:click={profileEdit}>회원정보 수정</button>
			</li>
			<li>
				<button class="btn btn-ghost btn-sm" on:click={profileDelte}>회원탈퇴</button>
			</li>
		</ul>
	</SideBar>
	<div class="relative flex w-full max-w-5xl flex-col items-start capitalize">
		<section class="backplate h-32 lg:h-56" />
		<slot />
	</div>
</div>

<style lang="postcss">
	.profile-layout {
		display: flex;
		min-height: 100vh;
		justify-content: center;
		gap: 3rem;
		padding: 1.5rem;
		padding-top: var(--h-nav);

		@media (--desktop) {
			padding: calc(var(--h-nav) + 3rem) 4rem;
		}
	}

	.backplate {
		position: absolute;
		width: 100%;
		background: rgb(242, 250, 255);
		background: linear-gradient(
			135deg,
			rgba(242, 250, 255, 1) 0%,
			rgba(241, 253, 255, 1) 5%,
			rgba(240, 245, 255, 1) 22%,
			rgba(244, 240, 255, 1) 63%,
			rgba(250, 243, 255, 1) 100%
		);
		border-radius: 4rem 0 0 0;
	}
</style>
