import { loginSchema } from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase } }) => {
	const { email, password } = loginSchema.parse(await request.json());

	const { data, error: signInError } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (signInError) throw error(500, 'Server error. Try again later.');

	return json({ data: { user_id: data.user?.id } }, { status: 201 });
}) satisfies RequestHandler;
