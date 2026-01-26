import { Project } from "@/types";

const projects: Project[] = [
	{
		image: "portfolio",
		name: "Portfolio",
		desc: "Open source React and TypeScript portfolio with a clean, fast design.",
		url: "nanos.club",
		source: "github.com/misternano/portfolio",
		stack: ["React", "TypeScript", "Tailwind", "Vite", "Supabase"],
		immune: true
	},
	{
		image: "fnshop",
		name: "Fortnite Item Shop",
		desc: "Utilizes an API wrapper to instantly deliver the current Fortnite item shop.",
		url: "fn.nanos.club",
		source: "github.com/misternano/fortnite-itemshop",
		stack: ["Next.js", "TypeScript", "Tailwind", "Wrangler", "API Platform"]
	},
	{
		image: "arcade",
		name: "Arcade Games",
		desc: "Lightweight web arcade of small, fast games focused on clean UI and zero distractions.",
		url: "arcade.bkclb.dev",
		source: "github.com/misternano/arcade",
		stack: ["SvelteKit", "TypeScript", "Tailwind", "Wrangler", "API Platform"]
	},
	{
		image: "cookies",
		name: "Cookie Calculator",
		desc: "Making pay-to-win in Hypixel's Skyblock gamemode easier, one step at a time.",
		url: "cookies.nanos.club",
		source: "github.com/misternano/cookiecalculator",
		stack: ["React", "Tailwind", "TypeScript", "Vite"]
	},
	{
		image: "starfallex",
		name: "StarfallEx Status",
		desc: "A central status page for monitoring the uptime, health, and performance of API services.",
		url: "nanos.club/status",
		stack: ["TypeScript", "React", "Tailwind", "Vite"]
	},
	{
		image: "apis",
		name: "API Platform",
		desc: "Personal API platform hosting microservices used across multiple projects.",
		url: "api.ncc.dev",
		stack: ["TypeScript", "Wrangler", "React", "Tailwind"]
	},
	{
		name: "Image Host",
		desc: "A personal image hosting service that automatically uploads images after capture.",
		stack: ["TypeScript", "ShareX", "Wrangler", "R2 Bucket"]
	},
	{
		name: "Discord Bots",
		desc: "Discord bots that manage role automation and surface live stats for admins.",
		stack: ["TypeScript", "Wrangler", "Railway", "API Platform"]
	},
	{
		name: "Go API",
		desc: "Practice building Go-based APIs with database integration and client-facing data flows.",
		source: ["github.com/misternano/practice-todo", "github.com/misternano/usersapi"],
		stack: ["Go", "React", "TypeScript", "Tailwind", "Vite", "Fiber", "MongoDB", "Viper", "Air"]
	}
];

export default projects;
