import React from "react";
import placeholder from "../assets/placeholder.png";
import { motion } from "framer-motion";

const StockCard = ({ src, name, ticker }) => {
	return (
		<a href={`https://finance.yahoo.com/quote/${ticker}`} target="norel noopen">
			<motion.div whileHover={{ y: -5 }} className="p-4 bg-topography border border-[2px] border-neutral-700 rounded-md glow hover:border-neutral-500 transition-all duration-200">
				<div className="flex flex-row items-center gap-2 md:gap-4">
					<img src={src ? `assets/stocks/${src}.jpeg` : placeholder} alt={`Logo of ${name}`} className="w-12 h-auto rounded-full" />
					<div>
						<p className="text-brand font-medium">
							{name ?? "?"}
						</p>
						<p className="text-sm text-neutral-400">
							${ticker}
						</p>
					</div>
				</div>
			</motion.div>
		</a>
	);
};

export default StockCard;
