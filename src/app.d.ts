// See https://kit.svelte.dev/docs/types#app
import type { Cookies } from '@sveltejs/kit';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
			theme?: string;
		}
		interface User {
			username?: string;
		}
		interface Platform {}
	}
}

export {};
