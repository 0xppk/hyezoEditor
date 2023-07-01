import { loginSchema } from '$lib/zodSchema.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, url, locals: { supabase } }) => {
	const { email, password } = loginSchema.parse(await request.json());

	const { data, error: signUpError } = await supabase.auth.signUp({
		email,
		password,
	});

	if (signUpError) throw error(500, { message: 'Server error. Try again later.' });

	return json({ data: data.user?.id }, { status: 201 });
}) satisfies RequestHandler;
