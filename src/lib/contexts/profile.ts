import { profile_state } from '$lib/stores/profile';
import { getContext, setContext } from 'svelte';

export function getProfileState() {
	return getContext<Store.TProfileState>('profile_state');
}

export function setProfileState(data: ProfileState) {
	setContext('profile_state', profile_state);
	getProfileState().syncWith(data);

	return getProfileState();
}
