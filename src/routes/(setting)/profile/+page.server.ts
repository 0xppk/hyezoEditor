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

	logout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	},

	update: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());
		const {
			data: { user },
		} = await supabase.auth.getUser();

		await supabase.from('profiles').update({ username: formData.username }).eq('id', user?.id);
	},

	register: async ({ request, url, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const { email, password } = loginSchema.parse(formData);
			const { error } = await supabase.auth.signUp({
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

	upload: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const image = formData.get('avatar') as File;
		await supabase.storage.from('avatars').upload('/avatars/image1.png', image);
	},
} satisfies Actions;
