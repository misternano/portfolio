import { createClient } from "@supabase/supabase-js";

interface Database {
	public: {
		Tables: {
			movies: {
				Row: object
				Insert: object
				Update: object
			}
		}
	}
}

export const supabase = createClient<Database>(
	import.meta.env.VITE_SUPABASE_URL as string,
	import.meta.env.VITE_SUPABASE_ANON as string
);
