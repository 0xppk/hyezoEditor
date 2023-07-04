import { writable } from 'svelte/store';

const initialArchive = [
	// {
	// 	id: '',
	// 	author_id: '',
	// 	name: '',
	// 	status: 'private',
	// 	created_at: '',
	// 	updated_at: null,
	// 	start_date: null,
	// 	due_date: null,
	// 	word_goal: null,
	// 	group_id: null,
	// },
] satisfies TArchive[] | [];

function createArchiveStore() {
	const { subscribe, set, update } = writable<TArchive[]>(initialArchive);
	
	return {
		subscribe,
		syncWith: (newArray: TArchive[]) => update(arr => newArray),
		updateName: (newName: string, index: number) =>
			update(arr => {
				arr[index].name = newName;
				return arr;
			}),
		reset: () => set(initialArchive),
	};
}
export const archive = createArchiveStore();
export type TArchiveStore = ReturnType<typeof createArchiveStore>;
