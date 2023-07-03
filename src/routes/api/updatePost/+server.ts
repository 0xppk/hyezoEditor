import { postSchema } from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const PATCH = (async ({ request, locals: { supabase, getSession } }) => {
	const {
		id,
		title,
		content,
		words_count,
		status: isPublicityUpdate,
	} = postSchema.partial().parse(await request.json());

	const session = await getSession();
	if (!session) throw error(500, { message: '다시 로그인해 주세요' });

	const { data, error: updatePostError } = isPublicityUpdate
		? await supabase
				.from('posts')
				.update({ status: isPublicityUpdate })
				.eq('id', id)
				.select('*, archives(name)')
		: await supabase
				.from('posts')
				.update({ title, content, words_count })
				.eq('id', id)
				.select('*, archives(name)');

	if (updatePostError) throw error(500, { message: 'Server error. Try again later.' });

	const refinedPost = {
		...data[0],
		archive_name: data[0].archives.name,
	};

	const updatedPost = (() => {
		delete refinedPost.archive_id;
		delete refinedPost.archives;

		return postSchema.parse(refinedPost);
	})();

	return json({ data: updatedPost, success: true }, { status: 201 });
}) satisfies RequestHandler;
