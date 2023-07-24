import { writable } from 'svelte/store';

type Actions = {
	type: string;
	payload?: {};
};

export function useReducer<T, A extends Actions>(
	initState: T,
	reducer: (prevState: T, action: A) => T,
) {
	const { update, subscribe } = writable(initState);

	function dispatch(action: A) {
		update(state => reducer(state, action));
	}

	return [{ subscribe }, dispatch];
}
