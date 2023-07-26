import { loginSchema } from '$lib/zodSchema.js';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { z } from 'zod';

export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const { email, password } = loginSchema.parse(Object.fromEntries(await request.formData()));

		await supabase.auth.signInWithPassword({
			email,
			password,
		});
	},

	register: async ({ request, url, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const { email, password } = loginSchema.parse(formData);

			const { error, data } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${url.origin}/api/auth/callback`,
				},
			});

			if (error) return fail(500, { message: '가입할 수 없습니다', success: false });

			return {
				message: '토큰을 보냈어요. 이메일을 확인해 주세요 😎',
				success: true,
			};
		} catch (e) {
			if (e instanceof z.ZodError) {
				const { fieldErrors: errors } = e.flatten();
				const { email, password, ...rest } = formData;

				return {
					data: rest,
					errors,
				};
			}
		}
	},
} satisfies Actions;
