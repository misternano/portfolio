/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				brand: "#ecba16",
				online: "#43b581",
				idle: "#faa61a",
				dnd: "#f04747",
				offline: "#747f8d",
				spotify: "#1fdf64",
				discord: "#5865f2",
				twitter: "#00acee",
				steam: "#2a475e",
				github: "#646464",
			}
		}
	},
	plugins: [],
}
