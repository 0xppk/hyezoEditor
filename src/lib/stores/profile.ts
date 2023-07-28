import { writable } from 'svelte/store';

const initialState = 'edit';

function createProfileStateStore() {
	const { subscribe, update } = writable<ProfileState>(initialState);
	return {
		subscribe,
		setState: (newState: ProfileState) => update(_state => newState),
	};
}

export const profile_state = createProfileStateStore();
export type TProfileStateStore = ReturnType<typeof createProfileStateStore>;
