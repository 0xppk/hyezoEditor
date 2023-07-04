import { error, type ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies, locals: { supabase, getSession } }) => {
	const theme = cookies.get('siteTheme');
	const session = await getSession();
	if (!session) return { theme };

	const { data, error: isError } = await supabase
		.from('profiles')
		.select('username')
		.eq('id', session.user.id);

	if (isError) throw error(500, '유저 정보를 찾을 수 없습니다');

	const username = String(data[0].username);

	return {
		theme,
		session,
		username,
	};
}) satisfies ServerLoad;
