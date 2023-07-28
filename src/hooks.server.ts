import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event,
		cookieOptions: {
			sameSite: 'lax',
			secure: new URL(event.url.origin).protocol === 'https:',
		},
	});

	event.locals.getSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.getUser = async () => {
		const session = await event.locals.getSession();
		const { data } = await event.locals.supabase
			.from('profiles')
			.select('*')
			.eq('id', session?.user.id);

		const user = data?.[0];
		return user;
	};

	const theme = event.cookies.get('siteTheme');

	const response = resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		},
		transformPageChunk: ({ html }) =>
			html.replace('data-theme=""', `data-theme=${theme ?? 'light'}`),
	});

	return response;
}) satisfies Handle;
