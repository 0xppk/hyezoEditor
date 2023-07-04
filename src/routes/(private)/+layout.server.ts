import { archivesSchema } from '$lib/zodSchema';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) return;

	const { data, error: isError } = await supabase
		.from('archives')
		.select('*')
		.eq('author_id', session.user.id)
		.order('created_at', { ascending: true });

	if (isError) throw error(500, '등록된 아카이브가 없습니다. 😢');

	const archiveData = archivesSchema.parse(data);

	return {
		archiveData,
	};
}) satisfies ServerLoad;
