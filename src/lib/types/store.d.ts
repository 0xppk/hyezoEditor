import type { TArchiveStore } from '$lib/store/archive';

declare global {
	namespace Store {
		type TArchive = TArchiveStore;
	}
}
