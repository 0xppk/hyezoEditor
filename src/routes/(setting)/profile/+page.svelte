<script lang="ts">
	import { enhance } from '$app/forms';
	import { DEFAULT_AVATAR } from '$lib/config/index.js';
	import { getProfileState } from '$lib/contexts/profile.js';
	import { getUser } from '$lib/contexts/user.js';
	import { fade, fly } from 'svelte/transition';

	export let data;
	let { session, supabase } = data;
	$: ({ session } = data);

	const profile_state = getProfileState();
	const user = getUser();
	let fileInput: HTMLInputElement;
	let update_avatar = '';

	function displaySelectedImage(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const input = e.target as HTMLInputElement;
		const file = input.files![0];
		const reader = new FileReader();
		reader.onload = () => (update_avatar = reader.result as string);
		reader.readAsDataURL(file);
	}

	function removeImage() {
		update_avatar = DEFAULT_AVATAR;
		fileInput.value = '';
	}

	async function saveImageAsNull() {
		if (update_avatar === DEFAULT_AVATAR) {
			const avatar = $user.avatar.split('/').pop();
			if (avatar) await supabase.storage.from('avatars').remove([avatar]);
			user.updateAvatar(DEFAULT_AVATAR);
			await supabase.from('profiles').update({ avatar_url: null }).eq('id', session.user.id);
		}
	}
</script>

<form id="update" method="POST" use:enhance enctype="multipart/form-data" class="w-full">
	<!-- 프로필 타이틀, 저장/취소 버튼 -->
	<section class="flex w-full items-center justify-between gap-6 px-5 pb-10 pt-44">
		<img
			src={$user.avatar}
			alt="프사"
			class="pointer-events-none z-10 h-14 w-14 rounded-full object-cover ring-1 ring-white ring-offset-4 ring-offset-white sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-40 lg:w-40"
		/>
		<div class="relative flex grow flex-col">
			<h4 class="py-6">profile</h4>
			<p class="absolute bottom-0 text-base normal-case">Update your photo and personal details.</p>
		</div>
		<input
			type="reset"
			value="Cancel"
			on:click={() => (update_avatar = '')}
			class="btn btn-ghost btn-xs place-self-center"
		/>
		<button type="submit" on:click={saveImageAsNull} class="btn btn-ghost btn-xs place-self-center">
			save
		</button>
	</section>

	<!-- 인풋 리스트 -->
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
				on:change={e => displaySelectedImage(e)}
				bind:this={fileInput}
				type="file"
				id="input-file"
				name="avatar"
				accept="image/*"
				class="hidden"
			/>
			<div>
				<label for="avatar" class="font-bold">your photo</label>
				<p class="w-52 text-sm normal-case">This will be displayed on your profile</p>
			</div>

			<img
				src={update_avatar || $user.avatar}
				class="h-16 w-16 rounded-full object-cover"
				alt="profile"
			/>

			<div class="grow place-self-start">
				<div class="flex justify-end gap-4">
					<button on:click={removeImage} class="cursor-pointer text-sm text-red-600/70">
						Remove
					</button>
					<label for="input-file" class="cursor-pointer text-sm">upload</label>
				</div>
			</div>
		</div>
	</section>
</form>

{#if $profile_state === 'delete'}
	<form
		in:fly={{ y: 200 }}
		out:fade
		use:enhance
		method="POST"
		action="deleteAccount"
		class="w-full"
	>
		<hr />
		<div class="flex items-center justify-start gap-10">
			<label for="update" class="w-52 font-bold">delete account</label>
			<button type="submit" class="btn btn-neutral">Delete</button>
		</div>
	</form>
{/if}

<style lang="postcss">
	hr {
		margin: 1rem 0;

		@media (--tablet) {
			margin: 1.25rem 0;
		}
	}
</style>
