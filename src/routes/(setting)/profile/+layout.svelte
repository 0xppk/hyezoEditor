<script lang="ts">
	import SideBar from '@components/SideBar.svelte';

	export let data;
	$: ({ userData } = data);
</script>

<div class="profile-layout">
	<SideBar>
		<h2 slot="username">{userData.username}</h2>
		<span slot="title" class="font-bold">나의 계정 설정</span>
		<div slot="navList">
			<p>회원정보 수정</p>
		</div>
	</SideBar>
	<slot />
</div>

<style>
	.profile-layout {
		display: flex;
		min-height: 100vh;
		justify-content: center;
		gap: 3rem;
		padding: calc(var(--h-nav) + 3rem) 4rem;
	}
</style>
