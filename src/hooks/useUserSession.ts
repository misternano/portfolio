import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/helper/supabaseClient.ts";

const useUserSession = () => {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const { data, error } = await supabase.auth.getSession();
				if (error) console.error((error as Error).message);
				if (data) setSession(data.session);
			} catch (_) {
				console.error("Unexpected error occurred.");
			}
		})();
	}, []);

	return { session };
}

export default useUserSession;
