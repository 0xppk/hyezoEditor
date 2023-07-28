import { DEFAULT_AVATAR } from '$lib/config';
import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies, locals: { supabase, getSession, getUser } }) => {
	const theme = cookies.get('siteTheme');
	const session = await getSession();
	const user = await getUser();

	let avatar;

	if (user?.avatar_url) {
		const {
			data: { publicUrl },
		} = supabase.storage.from('avatars').getPublicUrl(user?.avatar_url);

		avatar = publicUrl;
	}

	const userData = {
		...user,
		avatar: user?.avatar_url ? avatar : DEFAULT_AVATAR,
	};

	return {
		theme,
		session,
		user: userData,
	};
}) satisfies ServerLoad;
