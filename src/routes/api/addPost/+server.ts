import { idParser, numberIdParser, postSchema } from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) throw error(500, { message: '다시 로그인해 주세요' });

	const { title, content, words_count, archive_name } = postSchema.parse(await request.json());

	// 아카이브 업데이트
	// 기존 아카이브에 추가할 수도 있다
	// 기존 아카이브 찾을 수 없으면 아카이브 생성으로

	// 아카이브 생성
	const { data, error: createArchiveError } = await supabase
		.from('archives')
		.insert({ author_id: session.user.id, name: archive_name })
		.select('id');

	const archive_id = idParser(data)[0].id;

	// 포스트 생성
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

	// 에러 처리
	if (createArchiveError) {
		throw error(500, { message: '아카이브 생성 실패' });
	} else if (createPostError) {
		throw error(500, { message: '포스트 생성 실패' });
	}

	const postId = numberIdParser(postData)[0].id;
	// 성공
	return json({ data: { id: postId }, success: true }, { status: 201 });
}) satisfies RequestHandler;
