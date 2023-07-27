import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { setUser } from '$lib/contexts/user';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Session } from '@supabase/supabase-js';
import type { Load } from '@sveltejs/kit';

export const load = (({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data?.session,
	});

	return {
		supabase,
		theme: data?.theme,
		session: data?.session as Session,
		userData: data?.userData as UserData,
	};
}) satisfies Load;
