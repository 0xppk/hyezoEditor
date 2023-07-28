import { updateProfileSchema } from '$lib/zodSchema.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

type UpdateProfileData = { username: string; website: string; avatar_url: string };

export const actions = {
	updateProfile: async ({ request, locals: { supabase, getSession, getUser } }) => {
		const session = await getSession();
		if (!session) return fail(500, { message: '업데이트 권한이 없습니다', success: false });

		const formData = updateProfileSchema.parse(Object.fromEntries(await request.formData()));
		const { username, website, avatar } = formData;
		const { user } = session;

		const updateData: Partial<UpdateProfileData> = {};
		if (username) updateData.username = username;
		if (website) updateData.website = website;
		if (avatar && avatar.size !== 0) {
			const uuid = crypto.randomUUID();
			await supabase.storage.from('avatars').upload(uuid, avatar, {
				upsert: true,
			});
			updateData.avatar_url = uuid;
		}

		if (Object.keys(updateData).length > 0) {
			await supabase.from('profiles').update(updateData).eq('id', user.id);
			return { message: '프로필이 업데이트 되었습니다', success: true };
		}
	},

	deleteAccount: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) return fail(500, { message: '삭제 권한이 없습니다', success: false });

		await supabase.from('profiles').delete().eq('id', session?.user?.id);
		await supabase.auth.signOut();
		throw redirect(303, '/');
	},
} satisfies Actions;
