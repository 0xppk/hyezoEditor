<script lang="ts">
	import { enhance } from '$app/forms';

	let update_avatar = '';
	function displaySelectedImage(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const input = e.target as HTMLInputElement;
		const file = input.files![0];
		const reader = new FileReader();
		reader.onload = () => (update_avatar = reader.result as string);
		reader.readAsDataURL(file);
	}
	export let data;
	let { session, supabase, userData } = data;
	console.log(userData.avatar);
	$: ({ session, userData } = data);
</script>

<div class="relative flex w-full max-w-5xl flex-col items-start gap-8 capitalize">
	<form id="update" method="POST" use:enhance enctype="multipart/form-data" class="w-full">
		<section class="backplate" />
		<section class="flex w-full items-center justify-between gap-6 px-5 pt-44">
			<img
				src={userData.avatar}
				alt="프사"
				class="pointer-events-none z-10 h-14 w-14 rounded-full object-cover ring-1 ring-white ring-offset-4 ring-offset-white sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-40 lg:w-40"
			/>
			<div class="relative flex grow flex-col">
				<h4 class="py-6">profile</h4>
				<p class="absolute bottom-0 text-base normal-case">
					Update your photo and personal details.
				</p>
			</div>
			<input
				type="reset"
				value="Cancel"
				on:click={() => (update_avatar = '')}
				class="btn btn-ghost btn-xs place-self-center"
			/>
			<button
				type="submit"
				on:click={async () => {
					if (update_avatar === '/default_avatar.jpeg') {
						const avatar = userData.avatar.split('/').pop();
						await supabase.storage.from('avatars').remove([avatar]);
						await supabase.from('profiles').update({ avatar_url: null }).eq('id', session.user.id);
						userData.avatar = update_avatar;
					}
				}}
				class="btn btn-ghost btn-xs place-self-center"
			>
				save
			</button>
		</section>

		<section class="w-full">
			<div class="flex items-center justify-start gap-10">
				<label for="update" class="w-52 font-bold">username</label>
				<input type="text" name="username" class="input input-sm grow" />
			</div>
			<hr />

			<div class="flex items-center justify-start gap-10">
				<label for="update" class="w-52 font-bold">website</label>
				<input type="url" placeholder="https://" name="website" class="input input-sm grow" />
			</div>
			<hr />

			<div class="flex items-center gap-10">
				<input
					id="input-file"
					on:change={e => displaySelectedImage(e)}
					type="file"
					name="avatar"
					accept="image/*"
					class="hidden"
				/>
				<div>
					<label for="avatar" class="font-bold">your photo</label>
					<p class="w-52 text-sm normal-case">This will be displayed on your profile</p>
				</div>

				<img
					src={update_avatar || userData.avatar}
					class="h-16 w-16 rounded-full object-cover"
					alt="profile"
				/>

				<div class="grow place-self-start">
					<div class="flex justify-end gap-4">
						<button
							on:click={() => (update_avatar = '/default_avatar.jpeg')}
							class="cursor-pointer text-sm text-red-600/70"
						>
							Remove
						</button>
						<label for="input-file" class="cursor-pointer text-sm">upload</label>
					</div>
				</div>
			</div>
		</section>
	</form>
</div>

<!-- <label for="logout" class="flex justify-center text-lg font-bold">로그아웃</label>
	<form id="logout" method="POST" use:enhance action="?/logout" class="form-control">
		<button type="submit" class="btn btn-secondary">로그아웃</button>
	</form> -->
<style>
	hr {
		margin: 1rem 0;
	}

	::file-selector-button {
		display: none;
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
		height: 14rem;
		border-radius: 4rem 0 0 0;
	}
</style>
