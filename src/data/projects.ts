import { Project } from "../types.ts";

const projects: Project[] = [
	{
		image: "YFKgX",
		name: "Portfolio",
		desc: "Open source portfolio built with React and TS.",
		url: "nanos.club",
		source: "github.com/misternano/portfolio",
		stack: ["React", "TS", "Tailwind", "Vite", "Supabase"],
		immune: true
	},
	{
		image: "wZHUg",
		name: "Fortnite Item Shop",
		desc: "Shows the current Fortnite item shop.",
		url: "fn.nanos.club",
		source: "github.com/misternano/fortnite-itemshop",
		stack: ["React", "TS", "Tailwind", "Vite", "Wrangler"]
	},
	{
		name: "Todo List",
		desc: "Practice for Go & Fiber.",
		source: "github.com/misternano/practice-todo",
		stack: ["React", "TS", "Tailwind", "Vite", "Go", "Fiber", "MongoDB", "Viper", "Air"]
	},
	{
		image: "poKE6",
		name: "Reverence House",
		desc: "Website redesign for Reverence House.",
		stack: ["React", "Tailwind", "Vite"]
	},
	{
		image: "f6Xq5",
		name: "Control Panel",
		desc: "Management panel for Reverence House.",
		stack: ["React", "Tailwind", "Vite", "Firebase"]
	},
	{
		image: "LRFG1",
		name: "Dashboard",
		desc: "Concept dashboard, focusing on UI/UX.",
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
