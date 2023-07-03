import { writable } from 'svelte/store';

function createArchiveStore() {
	const { subscribe, set, update } = writable('');

	return {
		subscribe,
		select: (newValue: string) => update(val => newValue),
		reset: () => set(''),
	};
}

export const archive = createArchiveStore();
