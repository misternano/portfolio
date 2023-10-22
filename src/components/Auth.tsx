import { AtSign, Github, LogOut } from "lucide-react";
import { supabase } from "../lib/helper/supabaseClient";
import { useAuth, useToasts } from "../hooks";

const Auth = () => {
	const { user, setUser } = useAuth();
	const toast = useToasts();

	const loginGithub = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "github"
		});
	};

	const logout = async () => {
		await supabase.auth.signOut().then(() => {
			setUser(null);
		});
		toast("Logged out", "You have been logged out.", 2500, "bg-emerald-500");
	};

	return (
		<>
			{!user &&
				<div className="flex flex-row gap-2 justify-self-end">
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
