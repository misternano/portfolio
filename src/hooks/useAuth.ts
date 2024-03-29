import { useState, useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import type { User } from "@supabase/supabase-js";

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const { data, error } = await supabase.auth.getUser();
				if (error) console.error((error as Error).message);
				if (data) setUser(data.user);
			} catch (_) {
				console.error("Unexpected error occurred.");
			}
		})();
	}, []);

	return { user, setUser };
};

export default useAuth;
