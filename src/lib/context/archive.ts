import { archive } from '$lib/stores/archive';
import { getContext, setContext } from 'svelte';

export function setArchive() {
	setContext('archive', archive);
}

export function getArchive() {
	return getContext<Store.TArchive>('archive');
}
