import { Stock } from "../types.ts";

const stocks: Stock[] = [
	{
		src: "microsoft",
		name: "Microsoft",
		ticker: "MSFT"
	},
	{
		src: "meta",
		name: "META",
		ticker: "META"
	},
	{
		src: "lilly",
		name: "Eli Lilly",
		ticker: "LLY"
	},
	{
		src: "nvidia",
		name: "Nvidia",
		ticker: "NVDA"
	},
	{
		src: "vanguard",
		name: "Top 500",
		alt: "Vanguard Top 500 ETC",
		ticker: "VOO"
	},
	{
		src: "vanguard",
		name: "REIT",
		alt: "Vanguard Real Estate Investment Trust",
		ticker: "VNQ"
	},
	{
		src: "schwab",
		name: "Broad",
		alt: "Schwab Broad Market ETF",
		ticker: "SCHB"
	},
	{
		src: "blackrock",
		name: "Energy",
		alt: "iShares Clean Energy ETF",
		ticker: "ICLN"
	}
];

export default stocks;
