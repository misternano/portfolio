import { Stock } from "../types.ts";

const stocks: Stock[] = [
	{
		image: "microsoft",
		name: "Microsoft",
		ticker: "MSFT"
	},
	{
		image: "meta",
		name: "META",
		ticker: "META"
	},
	{
		image: "lilly",
		name: "Eli Lilly",
		ticker: "LLY"
	},
	{
		image: "nvidia",
		name: "Nvidia",
		ticker: "NVDA"
	},
	{
		image: "vanguard",
		name: "Top 500",
		alt: "Vanguard Top 500 ETC",
		ticker: "VOO"
	},
	{
		image: "vanguard",
		name: "REIT",
		alt: "Vanguard Real Estate Investment Trust",
		ticker: "VNQ"
	},
	{
		image: "schwab",
		name: "Broad",
		alt: "Schwab Broad Market ETF",
		ticker: "SCHB"
	},
	{
		image: "blackrock",
		name: "Energy",
		alt: "iShares Clean Energy ETF",
		ticker: "ICLN"
	}
];

export default stocks;
