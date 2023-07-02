import { loginSchema } from '$lib/zodSchema.js';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = loginSchema.parse(Object.fromEntries(await request.formData()));
		const { email, password } = formData;

		await supabase.auth.signInWithPassword({
			email,
			password,
		});
	},

	update: async ({ request, url, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());
		const {
			data: { user },
		} = await supabase.auth.getUser();

		await supabase.from('profiles').update({ username: formData.username }).eq('id', user?.id);
	},

	logout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
	},

	register: async ({ request, url, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const result = loginSchema.parse(formData);
			const { email, password } = result;

			const { error, data } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${url.origin}/api/auth/callback`,
				},
			});

			if (error) {
				return fail(500, { message: 'Server error. Try again later.', success: false, email });
			}

			return {
				message: '이메일로 토큰을 보냈습니다.',
				success: true,
			};
		} catch (err) {
			if (err instanceof z.ZodError) {
				const { fieldErrors: errors } = err.flatten();

				const { email, password, ...rest } = formData;
				return {
					data: rest,
					errors,
				};
			}
		}
	},

	upload: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const image = formData.get('avatar') as File;
		await supabase.storage.from('avatars').upload('/avatars/image1.png', image);
	},
} satisfies Actions;
