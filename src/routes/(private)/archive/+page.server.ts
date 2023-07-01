import { postsSchema } from '$lib/zodSchema.js';
import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data, error } = await supabase
		.from('posts')
		.select('*, archives(name)')
		.eq('author_id', session?.user.id)
		.order('created_at', {
			ascending: false,
		});

	const postData = data?.map(post => {
		const { archive_id, archives, ...rest } = post;

		return {
			...rest,
			archive_name: archives.name,
		};
	});

	/**
	 * 에러나는 경우: 세션 데이터가 없을 경우다.
	 * 하지만 로그인을 필수로 요하지 않기 때문에 빈 데이터 리턴으로 대체,
	 * 데이터 유무에 따라 다른 UI를 렌더링할 것.
	 */
	if (error) return { posts: [] };

	const posts = postsSchema.parse(postData);

	return {
		posts,
	};
}) satisfies ServerLoad;
