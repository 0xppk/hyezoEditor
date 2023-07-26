// See https://kit.svelte.dev/docs/types#app
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		// interface Platform {}

		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
			theme?: 'light' | 'dark';
		}
	}
}

export {};
