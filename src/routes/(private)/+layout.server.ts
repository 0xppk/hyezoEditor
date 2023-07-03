import { archivesSchema } from '$lib/zodSchema';
import { fail, type ServerLoad } from '@sveltejs/kit';

export const load = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	const userId = session?.user.id;

	const { data, error } = await supabase
		.from('archives')
		.select('name, id')
		.eq('author_id', userId)
		.order('created_at', { ascending: true });

	if (error) return fail(500, { message: '등록된 아카이브가 없습니다. 😢', success: false });

	const archiveData = archivesSchema.parse(data);

	return {
		archiveData,
	};
}) satisfies ServerLoad;
