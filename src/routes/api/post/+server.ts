import { idParser, numberIdParser, postSchema, postsSchema } from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

/**
 * 가져오기
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
 * 추가
 */
export const POST = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) throw error(500, '다시 로그인해 주세요');

	const { title, content, words_count, archive_name } = postSchema
		.omit({ id: true, status: true })
		.parse(await request.json());

	// todo 아카이브 업데이트
	// 기존 아카이브에 추가할 수도 있다
	// 기존 아카이브 찾을 수 없으면 아카이브 생성으로

	// todo 아카이브 생성
	const { data, error: createArchiveError } = await supabase
		.from('archives')
		.insert({ author_id: session.user.id, name: archive_name })
		.select('id');

	const archive_id = idParser(data)[0].id;

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

	if (createArchiveError) {
		throw error(500, '아카이브 생성 실패');
	} else if (createPostError) {
		throw error(500, '포스트 생성 실패');
	}

	const postId = numberIdParser(postData)[0].id;

	return json({ data: { id: postId }, success: true }, { status: 201 });
}) satisfies RequestHandler;

/**
 * 업데이트
 */
export const PATCH = (async ({ request, locals: { supabase, getSession } }) => {
	const {
		id,
		title,
		content,
		words_count,
		status: isPublicityUpdate,
	} = postSchema.partial().parse(await request.json());

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
				.update({ title, content, words_count })
				.eq('id', id)
				.select('*, archives(name)');

	if (updatePostError) throw error(500, '포스트 업데이트 에러');

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
