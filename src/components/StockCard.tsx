import React from "react";
import { motion } from "framer-motion";
import { Stock } from "../types.ts";

const StockCard: React.FC<{ data: Stock }> = ({ data }) => {
	return (
		<a href={`https://finance.yahoo.com/quote/${data.ticker}`} target="norel noopen">
			<motion.div whileHover={{ y: -5 }} className="p-4 bg-topography border border-[2px] border-neutral-700 rounded-md glow hover:border-neutral-500 transition-all duration-200">
				<div className="flex flex-row items-center gap-2 md:gap-4">
					<img src={`assets/stocks/${data.src}.jpeg`} alt={`${data.name} Logo`} className="w-12 h-auto rounded-full" />
					<div>
						<p className="text-brand font-medium">
							{data.name}
						</p>
						<p className="text-sm text-neutral-400">
							${data.ticker}
						</p>
					</div>
				</div>
			</motion.div>
		</a>
	);
};

export default StockCard;
