import type { TArchiveStore } from '$lib/stores/archive';

declare global {
	namespace Store {
		type TArchive = TArchiveStore;
	}
}
