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

	if (error) return { posts: [] };
	const posts = postsSchema.parse(data);

	return {
		posts,
	};
}) satisfies ServerLoad;
