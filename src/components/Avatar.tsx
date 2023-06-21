import React, { useState, useEffect } from "react";
import avatar from "../assets/avatar.png";
import { useLanyard } from "use-lanyard";

const Avatar = () => {
	const [borderColor, setBorderColor] = useState<string>("border-offline");
	const { data } = useLanyard("272535850200596480");

	useEffect(() => {
		if (data?.listening_to_spotify)
			setBorderColor("border-spotify");
		else {
			switch (data?.discord_status) {
				case "online":
					setBorderColor("border-online");
					break;
				case "idle":
					setBorderColor("border-idle");
					break;
				case "dnd":
					setBorderColor("border-dnd");
					break;
				default:
					setBorderColor("border-offline");
					break;
			}
		}
	}, [data]);

	return (
		<img src={data ? `https://cdn.discordapp.com/avatars/272535850200596480/${data?.discord_user.avatar}.webp` : avatar} alt="Avatar" className={`${borderColor} w-52 h-auto rounded-full border-2`} />
	);
};

export default Avatar;
