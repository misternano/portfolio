/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { UserCircle2, AtSign, Power } from "lucide-react";
import { supabase } from "../lib/helper/supabaseClient";

interface UserData {
	email: string;
	id: string;
	user_metadata: {
		avatar_url: string;
		preferred_username: string;
	};
}

const Auth = () => {
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

	const login = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "github"
		});
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
	};

	return (
		<>
			{!user &&
				<button onClick={login} className="group py-0.5 px-2 flex flex-row gap-1 items-center bg-[#171717] rounded-full justify-self-end">
					<UserCircle2 className="h-4 w-auto stroke-neutral-300 group-hover:stroke-white transition-colors" />
					<span className="text-neutral-300 group-hover:text-white transition-colors">Login</span>
				</button>
			}
			{user &&
				<button onClick={logout} className="group py-0.5 px-2 flex flex-row gap-1 items-center bg-[#171717] rounded-full justify-self-end">
					<AtSign className="h-4 w-auto stroke-neutral-300 group-hover:hidden" />
					<Power className="h-4 w-auto stroke-red-400 hidden group-hover:block" />
					<span className="text-neutral-300 group-hover:text-red-400">{user?.user_metadata.preferred_username ?? "Could not fetch username"}</span>
				</button>
			}
		</>
	);
};

export default Auth;
