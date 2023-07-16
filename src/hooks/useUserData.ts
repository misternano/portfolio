import { useState, useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { User, UserResponse } from "@supabase/supabase-js";

const useUserData = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const { data }: UserResponse = await supabase.auth.getUser();
				setUser(data.user);
			} catch (error) {
				console.error((error as Error).message);
			}
		})();
	}, []);

	return { user, setUser };
};

export default useUserData;
