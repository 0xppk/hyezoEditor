import { error, type ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies, locals: { supabase, getSession } }) => {
	const theme = cookies.get('siteTheme');
	const session = await getSession();

	const { data, error: isError } = await supabase
		.from('profiles')
		.select('username, avatar_url')
		.eq('id', session?.user.id);

	if (isError) throw error(500, 'Failed to fetch user data');

	const { username, avatar_url } = data[0];
	let avatar;

	if (avatar_url) {
		const {
			data: { publicUrl },
		} = supabase.storage.from('avatars').getPublicUrl(avatar_url);

		avatar = publicUrl;
	}

	const userData = {
		username,
		avatar: avatar_url ? avatar : '/default_avatar.jpeg',
	};

	if (session) session.user.user_metadata = userData;

	return {
		theme,
		session,
		userData,
	};
}) satisfies ServerLoad;
