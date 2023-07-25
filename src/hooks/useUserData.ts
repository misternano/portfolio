import { useState, useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import type { User } from "@supabase/supabase-js";

const useUserData = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await supabase.auth.getUser();
				setUser(data.user);
			} catch (error) {
				console.error((error as Error));
				setUser(null);
			}
		}
		fetchData().then(null);
	}, []);

	return { user, setUser };
};

export default useUserData;
