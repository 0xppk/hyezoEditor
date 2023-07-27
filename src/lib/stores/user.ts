import { writable } from 'svelte/store';

const initialState = undefined;

function createUserStore() {
	const { subscribe, update } = writable<UserData>(initialState);
	return {
		subscribe,
		syncWith: (newObj: UserData) => update(_state => newObj),
		updateName: (newName: string) =>
			update(state => {
				state.username = newName;
				return state;
			}),
		updateAvatar: (newAvatar: string) =>
			update(state => {
				state.avatar = newAvatar;
				return state;
			}),
	};
}

export const user = createUserStore();
export type TUserStore = ReturnType<typeof createUserStore>;
