import { archiveSchema } from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) throw error(500, { message: '다시 로그인해 주세요' });

	const { name } = archiveSchema.pick({ name: true }).parse(await request.json());

	// 아카이브 생성
	const { data, error: createArchiveError } = await supabase
		.from('archives')
		.insert({ author_id: session.user.id, name })
		.select('id');

	// 에러 처리
	if (createArchiveError) throw error(500, { message: '아카이브 생성 실패' });

	// 성공
	return json({ success: true, message: '아카이브 생성 성공' });
}) satisfies RequestHandler;
