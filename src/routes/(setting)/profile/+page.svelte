<script lang="ts">
	import { enhance } from '$app/forms';
	import { DEFAULT_AVATAR } from '$lib/config/index.js';
	import { getProfileState } from '$lib/contexts/profile.js';
	import Alert from '@components/Alert.svelte';
	import { fade, fly } from 'svelte/transition';
	export let data;
	let { supabase, user } = data;
	$: ({ user } = data);

	const profile_state = getProfileState();

	let fileInput: HTMLInputElement;
	let update_avatar = '';
	let alert_state: 'show' | 'hidden' = 'hidden';

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

	function uploadImage() {
		fileInput.click();
	}

	function showAlert() {
		alert_state = 'show';
	}

	function hideAlert() {
		alert_state = 'hidden';
	}
</script>

<form
	action="?/updateProfile"
	method="POST"
	use:enhance
	enctype="multipart/form-data"
	class="w-full"
>
	<!-- 프로필 타이틀, 저장/취소 버튼 -->
	<section class="flex w-full items-center justify-between gap-6 px-5 pb-10 pt-[6.5rem] lg:pt-44">
		<img
			src={user?.avatar_url || DEFAULT_AVATAR}
			alt="프사"
			class="pointer-events-none z-10 h-20 w-20 rounded-full object-cover ring-1 ring-white ring-offset-4 ring-offset-white sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40"
		/>
		<div class="relative flex grow flex-col">
			<h4 class="py-6">profile</h4>
			<p class="absolute bottom-0 hidden text-base normal-case lg:block">
				Update your photo and personal details.
			</p>
		</div>
		<input
			type="reset"
			value="Cancel"
			on:click={() => (update_avatar = '')}
			class="btn btn-ghost btn-xs place-self-center"
		/>
		<button type="submit" class="btn btn-ghost btn-xs place-self-center">save</button>
	</section>

	<!-- 인풋 리스트 -->
	<section class="flex w-full flex-col gap-2 sm:block">
		<div class="profile-input">
			<label for="username" class="w-52 font-bold">username</label>
			<input id="username" type="text" name="username" class="input input-sm grow" />
		</div>
		<hr />

		<div class="profile-input">
			<label for="user-website" class="w-52 font-bold">website</label>
			<input
				id="user-website"
				type="url"
				placeholder="https://"
				name="website"
				class="input input-sm grow"
			/>
		</div>
		<hr />

		<div class="profile-input relative">
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
				<p class="font-bold">your photo</p>
				<p class="w-52 text-sm normal-case">This will be displayed on your profile</p>
			</div>

			<img
				src={update_avatar || user?.avatar_url || DEFAULT_AVATAR}
				class="absolute right-4 h-16 w-16 rounded-full object-cover sm:static"
				alt="profile"
			/>

			<div class="grow place-self-start">
				<div class="flex justify-end gap-2">
					<button
						on:click|preventDefault={removeImage}
						class="btn btn-ghost btn-xs capitalize text-warning"
					>
						remove
					</button>
					<button on:click|preventDefault={uploadImage} class="btn btn-ghost btn-xs capitalize">
						<label for="input-file" class="cursor-pointer">upload</label>
					</button>
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
		id="delete"
		method="POST"
		action="?/deleteAccount"
		class="w-full"
	>
		<hr />
		<div class="flex items-center justify-start gap-10">
			<label for="delete" class="w-52 font-bold">delete account</label>
			<button
				disabled={!user?.id}
				on:click|preventDefault={showAlert}
				class="btn btn-warning disabled:btn-neutral">Delete</button
			>
			{#if alert_state === 'show'}
				<Alert>
					<svelte:fragment slot="message">탈퇴하시겠습니까?</svelte:fragment>
					<svelte:fragment slot="button">
						<button on:click|preventDefault={hideAlert} class="btn btn-sm">취소</button>
						<button type="submit" class="btn btn-neutral btn-sm">확인</button>
					</svelte:fragment>
				</Alert>
			{/if}
		</div>
	</form>
{/if}

<style lang="postcss">
	hr {
		margin: 1rem 0;
		display: none;

		@media (--tablet) {
			margin: 1.25rem 0;
			display: block;
		}
	}

	/* flex flex-col gap-2 p-2 sm:flex-row sm:items-center sm:justify-start sm:gap-10 */
	.profile-input {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;

		@media (--tablet) {
			flex-direction: row;
			align-items: center;
			justify-content: start;
			gap: 2.5rem;
		}
	}
</style>
