import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies, locals: { supabase, getSession } }) => {
	const session = await getSession();
	const { data, error } = await supabase
		.from('profiles')
		.select('username')
		.eq('id', session?.user.id);

	/**
	 * 에러나는 경우: 세션 데이터가 없을 경우다.
	 * 로그인을 필수로 요하지 않기 때문에 별도의 에러 처리 x,
	 * 데이터 유무에 따라 다른 UI를 렌더링할 것.
	 */
	const username = data ? String(data[0].username) : '손님';

	return {
		theme: cookies.get('siteTheme'),
		session: {
			...session,
			user: {
				...session?.user,
				username,
			},
		},
	};
}) satisfies ServerLoad;
