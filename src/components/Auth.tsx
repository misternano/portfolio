import React from "react";
import { AtSign, Github, LogOut } from "lucide-react";
import { supabase } from "../lib/helper/supabaseClient";
import { useUserData, useToasts } from "../hooks";

const Auth = () => {
	const { user, setUser } = useUserData();
	const toast = useToasts();

	const loginGithub = async () => {
		try {
			await supabase.auth.signInWithOAuth({
				provider: "github",
			});
		} catch (err) {
			console.error(err);
		}
	};

	const loginSpotify = async () => {
		try {
			await supabase.auth.signInWithOAuth({
				provider: "spotify",
			});
		} catch (err) {
			console.error(err);
		}
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		toast("Logged out", "You have been logged out.", 2500, "bg-emerald-500");
	};

	return (
		<>
			{!user &&
				<div className="flex flex-row gap-2 justify-self-end">
					<button onClick={loginSpotify} className="group py-0.5 px-3 flex flex-row gap-2 items-center bg-neutral-900 rounded-full">
						<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-neutral-300 group-hover:fill-white transition-colors">
							<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
						</svg>
						<span className="text-neutral-300 group-hover:text-white transition-colors">Login</span>
					</button>
					<button onClick={loginGithub} className="group py-0.5 px-3 flex flex-row gap-2 items-center bg-neutral-900 rounded-full">
						<Github size="16" className="fill-neutral-300 stroke-neutral-300 group-hover:stroke-white group-hover:fill-white transition-colors" />
						<span className="text-neutral-300 group-hover:text-white transition-colors">Login</span>
					</button>
				</div>
			}
			{user &&
				<button onClick={logout} className="group py-0.5 px-3 flex flex-row gap-2 items-center bg-neutral-900 rounded-full justify-self-end">
					<AtSign size="16" className="stroke-neutral-300 group-hover:hidden" />
					<LogOut size="16" className="stroke-red-400 hidden group-hover:block" />
					<span className={`${user?.user_metadata.name ?? user?.user_metadata.user_name ?? user?.email ? "text-neutral-300 group-hover:text-red-400" : "text-rose-500" }`}>
						{user?.user_metadata.name ? user?.user_metadata.name : user?.user_metadata.user_name ? user?.user_metadata.user_name : user?.email ?? "Could not fetch username or email."}
					</span>
				</button>
			}
		</>
	);
};

export default Auth;
