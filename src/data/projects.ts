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
		stack: ["Next.js", "TS", "Tailwind", "Wrangler"]
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
		image: "nxmAm",
		name: "Manager Dashboard",
		desc: "Manager dashboard for Reverence House's leadership.",
		stack: ["React", "Tailwind", "Vite", "Firebase"]
	},
	{
		image: "LRFG1",
		name: "Dashboard",
		desc: "Concept dashboard, focusing on UI/UX.",
		stack: ["Miscellaneous"]
	}
];

export default projects;
