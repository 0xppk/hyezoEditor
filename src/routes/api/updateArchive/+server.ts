import { archiveSchema } from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

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
