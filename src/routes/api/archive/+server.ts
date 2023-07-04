import { archiveSchema, archivesSchema } from '$lib/zodSchema.js';
import { error, fail, json, type RequestHandler } from '@sveltejs/kit';

/**
 * 가져오기
 * (private)/+layout.server.ts에서 Load로 사용중
 */
export const GET = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) return json({ message: '로그인 해주세요', success: false });

	const { data, error: isError } = await supabase
		.from('archives')
		.select('*')
		.eq('author_id', session.user.id)
		.order('created_at', { ascending: true });

	if (isError) throw error(500, '등록된 아카이브가 없습니다. 😢');

	const archives = archivesSchema.parse(data);

	return json({ data: archives }, { status: 201 });
}) satisfies RequestHandler;

/**
 * 생성
 */
export const POST = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) throw error(500, { message: '다시 로그인해 주세요' });

	const { name } = archiveSchema.pick({ name: true }).parse(await request.json());

	const { data, error: createArchiveError } = await supabase
		.from('archives')
		.insert({ author_id: session.user.id, name })
		.select('id');

	if (createArchiveError) throw error(500, { message: '아카이브 생성 실패' });

	return json({ success: true, message: '아카이브 생성 성공' });
}) satisfies RequestHandler;

/**
 * 수정
 */
export const PATCH = (async ({ request, locals: { supabase, getSession } }) => {
	const { id, name } = archiveSchema.partial().parse(await request.json());

	const session = await getSession();
	if (!session) throw error(500, { message: '다시 로그인해 주세요' });

	console.log(id, name);
	const { data, error: isError } = await supabase
		.from('archives')
		.update({ name })
		.eq('id', id)
		.select('name');

	if (isError) throw error(500, { message: 'Server error. Try again later.' });

	const updatedArchiveName = archiveSchema.pick({ name: true }).parse(data[0]);

	return json({ data: updatedArchiveName, success: true }, { status: 201 });
}) satisfies RequestHandler;

/**
 * 삭제
 */
export const DELETE = (async ({ request, locals: { supabase, getSession } }) => {
	const { id } = archiveSchema.partial().parse(await request.json());

	const session = await getSession();
	if (!session) throw error(500, { message: '다시 로그인해 주세요' });

	const { error: isError } = await supabase.from('archives').delete().eq('id', id);

	if (isError) throw error(500, { message: 'Server error. Try again later.' });

	return json({ message: '아카이브가 삭제되었습니다', success: true }, { status: 201 });
}) satisfies RequestHandler;
