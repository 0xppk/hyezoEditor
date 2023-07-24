import { writable } from 'svelte/store';

const initialState: [] = [];

function createArchiveStore() {
	const { subscribe, set, update } = writable<TArchive[]>(initialState);

	return {
		subscribe,
		syncWith: (newArray: TArchive[]) => update(_state => newArray),
		insert: (newArchive: TArchive) => update(state => [...state, newArchive]),
		updateName: (newName: string, index: number) =>
			update(state => {
				// const copy = structuredClone(state);
				state[index].name = newName;
				return state;
			}),
		reset: () => set(initialState),
	};
}

export const archive = createArchiveStore();
export type TArchiveStore = ReturnType<typeof createArchiveStore>;
