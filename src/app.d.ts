// See https://kit.svelte.dev/docs/types#app
import { Session, SupabaseClient } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		// interface Platform {}

		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
			getUser(): Promise<UserData | null>;
		}
		interface PageData {
			session: Session | null;
			user: UserData | null;
			theme?: 'light' | 'dark';
		}
	}
}

export {};
