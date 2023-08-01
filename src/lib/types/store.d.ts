import type { TArchiveStore } from '$lib/stores/archive';
import type { TProfileStateStore } from '$lib/stores/profile';
import type { TUserStore } from '$lib/stores/user';

declare global {
	namespace Store {
		type TArchive = TArchiveStore;
		type TProfileState = TProfileStateStore;
	}
}
