import React from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

interface SocialProps {
	children: React.ReactNode;
	link: string;
	platform?: string;
	size: string;
	color?: string;
}

const SocialLink = ({ link, platform, children, size, color }: SocialProps) => {
	tippy("#discord", {
		content: "nanos.club",
		placement: "bottom"
	});

	tippy("#twitter", {
		content: "fruitynano",
		placement: "bottom"
	});

	tippy("#steam", {
		content: "nano",
		placement: "bottom"
	});

	tippy("#github", {
		content: "misternano",
		placement: "bottom"
	});

	// TODO: This needs to be made prettier
	return (
		<a href={link} target="norel noopen" id={platform}>
			<svg viewBox="0 0 512 512" className={`${size} w-auto ${color ? `fill-${platform}` : "fill-neutral-200"} cursor-pointer hover:scale-110 transition ${platform && `duration-300 hover:fill-${platform}`}`}>
				{children}
			</svg>
		</a>
	);
};

export default SocialLink;
