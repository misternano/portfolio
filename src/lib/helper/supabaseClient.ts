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
	"https://gzaugebcaztbhqpytozf.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YXVnZWJjYXp0YmhxcHl0b3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3NjYwNDUsImV4cCI6MjAwNDM0MjA0NX0.mDbBYmeufgc1uFRWbBYgUK6ggB_NKTufGzLDf6_6_FE"
);
