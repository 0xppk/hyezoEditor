import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
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
		session: data?.session,
		theme: data?.theme,
		userData: data?.userData,
	};
}) satisfies Load;
