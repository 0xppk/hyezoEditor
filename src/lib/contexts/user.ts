import { user } from '$lib/stores/user';
import { getContext, setContext } from 'svelte';

export function getUser() {
	return getContext<Store.TUser>('user');
}

export function setUser(data: UserData) {
	setContext('user', user);
	getUser().syncWith(data);
}
