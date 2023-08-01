import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies, locals: { getSession, getUser } }) => {
	const theme = cookies.get('siteTheme');
	const session = await getSession();
	const user = await getUser();

	return {
		theme,
		session,
		user,
	};
}) satisfies ServerLoad;
