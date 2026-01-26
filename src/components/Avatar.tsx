import { useState, useEffect } from "react";
import { useLanyard } from "use-lanyard";
import placeholder from "@/assets/images/avatar.png";

const Avatar = () => {
	const { data } = useLanyard("272535850200596480");
	const [borderColor, setBorderColor] = useState<string>("border-offline");
	const [backgroundColor, setBackgroundColor] = useState<string>("bg-offline/50");

	useEffect(() => {
		if (data?.listening_to_spotify) {
			setBorderColor("border-spotify");
			setBackgroundColor("bg-spotify/25");
		} else {
			switch (data?.discord_status) {
				case "online":
					setBorderColor("border-online");
					setBackgroundColor("bg-online/50");
					break;
				case "idle":
					setBorderColor("border-idle");
					setBackgroundColor("bg-idle/50");
					break;
				case "dnd":
					setBorderColor("border-dnd");
					setBackgroundColor("bg-dnd/50");
					break;
				default:
					setBorderColor("border-offline");
					setBackgroundColor("bg-offline/50");
					break;
			}
		}
	}, [data]);

	return (
		<>
			<div className="relative">
				<img src={data?.discord_user.avatar ? `https://cdn.discordapp.com/avatars/272535850200596480/${data?.discord_user.avatar}.png` : placeholder} alt="Avatar" className={`relative ${borderColor} w-48 md:w-52 h-auto backdrop-blur-xl bg-neutral-800/50 rounded-full border-2 z-20 drop-shadow-xl`} />
				{data?.activities && data.activities.length > 0 ? data.activities[0].id === "custom" && (
					<div className={`absolute bottom-3 right-3 z-20 w-10 h-10 flex justify-center items-center ${backgroundColor} backdrop-blur-sm border-2 ${borderColor} rounded-full`}>
						<img className="w-7 h-7" src={`https://cdn.discordapp.com/emojis/${data?.activities[0].emoji?.id}.png`} alt={`${data?.activities[0].emoji?.name} emoji`} />
					</div>
				) : null}
			</div>
		</>
	);
};

export default Avatar;
