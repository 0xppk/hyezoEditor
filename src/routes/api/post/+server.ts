import {
	archiveIdSchema,
	archiveSchema,
	postIdSchema,
	postSchema,
	postsSchema,
} from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

/**
 * 부르기
 *
 */
export const GET = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) throw error(500, '다시 로그인해 주세요');

	const { data, error: createPostError } = await supabase
		.from('posts')
		.select('*')
		.eq('author_id', session.user.id);

	if (createPostError) throw error(500, '포스트 불러오기 에러');

	const posts = postsSchema.parse(data);

	return json({ data: posts }, { status: 201 });
}) satisfies RequestHandler;

/**
 * 만들기
 */
export const POST = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) throw error(500, '다시 로그인해 주세요');

	const { title, content, words_count, archive_id } = postSchema
		.omit({ id: true, status: true })
		.parse(await request.json());

	const { data: postData, error: createPostError } = await supabase
		.from('posts')
		.insert({
			author_id: session.user.id,
			title,
			content,
			words_count,
			archive_id,
		})
		.select('id');

	if (createPostError) throw error(500, '포스트 생성 실패');

	const postId = postIdSchema.parse(postData);

	return json({ data: { id: postId }, success: true }, { status: 201 });
}) satisfies RequestHandler;

/**
 * 고치기
 */
export const PATCH = (async ({ request, locals: { supabase, getSession } }) => {
	const {
		id,
		title,
		content,
		words_count,
		archive_id,
		status: isPublicityUpdate,
	} = postSchema.parse(await request.json());

	const session = await getSession();
	if (!session) throw error(500, '다시 로그인해 주세요');

	const { data, error: updatePostError } = isPublicityUpdate
		? await supabase
				.from('posts')
				.update({ status: isPublicityUpdate })
				.eq('id', id)
				.select('*, archives(name)')
		: await supabase
				.from('posts')
				.update({ title, content, words_count, archive_id })
				.eq('id', id)
				.select('*, archives(name)');

	if (updatePostError) throw error(500, '포스트 업데이트 에러');

	const updatedPost = postSchema.parse(data[0]);

	return json({ data: updatedPost, success: true }, { status: 201 });
}) satisfies RequestHandler;
