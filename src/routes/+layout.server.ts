import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies, locals: { supabase, getSession } }) => {
	const theme = cookies.get('siteTheme');
	const session = await getSession();

	const { data, error: isError } = await supabase
		.from('profiles')
		.select('username')
		.eq('id', session?.user.id);

	const username = data ? String(data[0].username) : '손님';

	return {
		theme,
		session,
		username,
	};
}) satisfies ServerLoad;
