import React from "react";
import { UserCircle2, AtSign, Power } from "lucide-react";
import { supabase } from "../lib/helper/supabaseClient";
import { useUserData } from "../hooks";

const Auth = () => {
	const { user, setUser } = useUserData();

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
				<button onClick={login} className="group py-0.5 px-3 flex flex-row gap-2 items-center bg-neutral-900 rounded-full justify-self-end">
					<UserCircle2 className="h-4 w-auto stroke-neutral-300 group-hover:stroke-white transition-colors" />
					<span className="text-neutral-300 group-hover:text-white transition-colors">Login</span>
				</button>
			}
			{user &&
				<button onClick={logout} className="group py-0.5 px-3 flex flex-row gap-2 items-center bg-neutral-900 rounded-full justify-self-end">
					<AtSign className="h-4 w-auto stroke-neutral-300 group-hover:hidden" />
					<Power className="h-4 w-auto stroke-red-400 hidden group-hover:block" />
					<span className={`${user?.user_metadata.name ? "text-neutral-300 group-hover:text-red-400" : "text-rose-500" }`}>{user?.user_metadata.name ?? "Could not fetch username"}</span>
				</button>
			}
		</>
	);
};

export default Auth;
