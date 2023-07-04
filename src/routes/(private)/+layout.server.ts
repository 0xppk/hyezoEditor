import { archivesSchema } from '$lib/zodSchema';
import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data, error: isError } = await supabase
		.from('archives')
		.select('*')
		.eq('author_id', session?.user.id)
		.order('created_at', { ascending: true });

	const archiveData = data ? archivesSchema.parse(data) : [];

	return { archiveData };
}) satisfies ServerLoad;
