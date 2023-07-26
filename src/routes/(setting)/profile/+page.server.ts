import { updateProfileSchema } from '$lib/zodSchema.js';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const formData = updateProfileSchema.parse(Object.fromEntries(await request.formData()));
		const { username, website, avatar } = formData;
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (username) await supabase.from('profiles').update({ username }).eq('id', user?.id);
		if (website) await supabase.from('profiles').update({ website }).eq('id', user?.id);
		if (avatar?.size) {
			// todo: db 요청을 줄일 수 있는 방법? 1. param으로 avatar url 받아오기
			const uuid = crypto.randomUUID();
			const { data } = await supabase.from('profiles').select('avatar_url').eq('id', user?.id);
			if (data) await supabase.storage.from('avatars').remove([data[0].avatar_url]);
			await supabase.storage.from('avatars').upload(uuid, avatar);
			await supabase.from('profiles').update({ avatar_url: uuid }).eq('id', user?.id);
		}
	},
} satisfies Actions;

/* 	logout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}, */
