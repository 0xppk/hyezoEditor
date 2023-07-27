import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ locals: { supabase } }) => {
	const { error: isError } = await supabase.auth.signOut();

	if (isError) throw error(500, 'Server error. Try again later.');
	return json({ message: 'Sign out Complete' }, { status: 201 });
}) satisfies RequestHandler;
