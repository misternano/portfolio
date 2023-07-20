import { Project } from "../types.ts";

const projects: Project[] = [
	{
		image: "YFKgX",
		name: "Portfolio",
		desc: "You are here! Built with React, TS, and Tailwind. Vite used for bundling and deployment.",
		url: "nanos.club",
		source: "github.com/misternano/portfolio",
		stack: ["React", "TS", "Tailwind", "Vite", "Supabase"]
	},
	{
		image: "wZHUg",
		name: "Fortnite Item Shop",
		desc: "Shows the current Fortnite item shop, updated daily at 00:00 UTC.",
		url: "fn.nanos.club",
		source: "github.com/misternano/fortnite-itemshop",
		stack: ["React", "TS", "Tailwind", "Vite", "Wrangler"]
	},
	{
		name: "Todo List",
		desc: "Practice todo list built with React and TS. Backend built with Go and Fiber.",
		source: "github.com/misternano/practice-todo",
		stack: ["React", "TS", "Tailwind", "Vite", "Go", "Fiber", "Mongo", "Viper", "Air"]
	},
	{
		image: "poKE6",
		name: "Reverence House",
		desc: "Redesign for Reverence House, built using React.",
		stack: ["React", "Tailwind", "Vite"]
	},
	{
		image: "f6Xq5",
		name: "Control Panel",
		desc: "An administrative control panel for Reverence House used to manage data.",
		stack: ["React", "Tailwind", "Vite", "Firebase"]
	},
	{
		image: "LRFG1",
		name: "Dashboard",
		desc: "Concept dashboard featuring a team system, interactive calendar and messaging system.",
		stack: ["Miscellaneous"]
	},
	{
		image: "z8ktl",
		name: "Dedicated FiveM Server",
		desc: "FiveM economy based server running QBCore.",
		url: "highliferp.org",
		stack: ["FiveM", "Miscellaneous"]
	}
];

export default projects;
