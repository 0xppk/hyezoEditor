import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) throw error(500, { message: '다시 로그인해 주세요' });

	const { data, error: createPostError } = await supabase
		.from('posts')
		.select('*')
		.eq('author_id', session.user.id);

	if (createPostError) throw error(500, { message: 'Server error. Try again later.' });

	return json({ data }, { status: 201 });
}) satisfies RequestHandler;
