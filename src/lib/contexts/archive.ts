import { archive } from '$lib/stores/archive';
import { getContext, setContext } from 'svelte';

export function getArchive() {
	return getContext<Store.TArchive>('archive');
}

export function setArchive(data: TArchive[]) {
	setContext('archive', archive);
	getArchive().syncWith(data);
}
