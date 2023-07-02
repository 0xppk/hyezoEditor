<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;

	let { session, username } = data;
	$: ({ session } = data);
</script>

<h1>{username}</h1>

<label for="register" class="flex justify-center text-xl font-bold">회원가입</label>
<form id="register" method="POST" use:enhance action="?/register" class="form-control gap-1 p-5">
	<input type="email" name="email" class="rounded-lg bg-twitter p-2" />
	<input type="password" name="password" class="rounded-lg bg-twitch p-2" />
	<button type="submit" class="btn-primary btn">회원가입</button>
</form>

<label for="login" class="flex justify-center text-lg font-bold">로그인</label>
<form id="login" method="POST" use:enhance action="?/login" class="form-control gap-1 p-5">
	<input type="email" name="email" class="rounded-lg bg-twitter p-2" />
	<input type="password" name="password" class="rounded-lg bg-twitch p-2" />
	<button type="submit" class="btn-primary btn">로그인</button>
</form>

<label for="update" class="flex justify-center text-lg font-bold">업데이트</label>
<form id="update" method="POST" use:enhance action="?/update" class="form-control gap-1 p-5">
	<input type="text" name="username" class="rounded-lg bg-twitter p-2" />
	<button type="submit" class="btn-primary btn">업데이트</button>
</form>

<label for="logout" class="flex justify-center text-lg font-bold">로그아웃</label>
<form id="logout" method="POST" use:enhance action="?/logout" class="form-control gap-1 p-5">
	<button type="submit" class="btn-warning btn">로그아웃</button>
</form>

<form action="?/upload" method="POST" use:enhance enctype="multipart/form-data">
	<input type="file" name="avatar" class="file-input" />
	<button type="submit">업로드</button>
</form>
