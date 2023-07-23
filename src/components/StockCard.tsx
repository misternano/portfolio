import { Stock } from "../types.ts";

const StockCard = ({ stock }: { stock: Stock }) => {
	return (
		<a
			href={`https://finance.yahoo.com/quote/${stock.ticker}`} target="norel noopen"
			className="first:ml-2 last:mr-2 min-w-fit p-2 md:p-4 flex flex-row items-center gap-2 md:gap-4 bg-card border border-neutral-700 rounded-xl glow hover:border-neutral-500 transition-colors duration-200"
		>
			<img src={`assets/images/${stock.image}.jpeg`} alt={`${stock.alt ?? stock.name} Logo`} className="w-12 h-auto rounded-full" loading="lazy" />
			<div>
				<p className="text-brand font-medium">
					{stock.name}
				</p>
				<p className="text-sm text-neutral-400">
					${stock.ticker}
				</p>
			</div>
		</a>
	);
};

export default StockCard;
