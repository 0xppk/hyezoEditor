import { archiveSchema } from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const DELETE = (async ({ request, locals: { supabase, getSession } }) => {
	const { id } = archiveSchema.partial().parse(await request.json());

	const session = await getSession();
	if (!session) throw error(500, { message: '다시 로그인해 주세요' });

	const { error: isError } = await supabase.from('archives').delete().eq('id', id);

	if (isError) throw error(500, { message: 'Server error. Try again later.' });

	return json({ message: '아카이브가 삭제되었습니다', success: true }, { status: 201 });
}) satisfies RequestHandler;
