import React, { useState, useEffect } from "react";
import avatar from "../assets/avatar.png";
import { useLanyard } from "use-lanyard";

const Avatar = () => {
	const [borderColor, setBorderColor] = useState("border-offline");
	const { data } = useLanyard("272535850200596480");

	const avatarURL = data ? `https://cdn.discordapp.com/avatars/272535850200596480/${data.discord_user.avatar}.png` : avatar;

	useEffect(() => {
		if (data) {
			if (data.listening_to_spotify)
				setBorderColor("border-spotify");
			else {
				switch (data.discord_status) {
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
		}
	}, [data]);


	return (
		<img className={`${borderColor} w-42 md:w-52 h-auto rounded-full border`} src={avatarURL} alt="Avatar" />
	);
};

export default Avatar;
