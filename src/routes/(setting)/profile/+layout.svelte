<script lang="ts">
	import SideBar from '@components/SideBar.svelte';
</script>

<div>
	<SideBar>
		<span slot="title">프로필</span>
		<div slot="navList">
			<p>1</p>
			<p>2</p>
		</div>
	</SideBar>
	<slot />
</div>
