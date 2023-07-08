import { useState, useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { UserData } from "../types";

const useUserData = () => {
	const [user, setUser] = useState<UserData | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const { data } = await supabase.auth.getUser();
				setUser(data.user);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserData();
	}, []);

	return { user, setUser };
};

export default useUserData;
