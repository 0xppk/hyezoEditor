import { groupSchema, idParser } from '$lib/zodSchema.js';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) return fail(500, { message: '로그인해 주세요', success: false });

		const { groupname } = groupSchema.parse(Object.fromEntries(await request.formData()));
		const { data, error: createGroupError } = await supabase
			.from('groups')
			.insert({ groupname })
			.select('id');

		if (createGroupError) return fail(500, { message: '그룹 생성 실패', success: false });

		const { id: group_id } = idParser(data)[0];
		const { error: createMemberError } = await supabase
			.from('members')
			.insert({ user_id: session.user.id, group_id });

		if (createMemberError) return fail(500, { message: '멤버 추가 실패', success: false });

		return { success: true };
	},
} satisfies Actions;
