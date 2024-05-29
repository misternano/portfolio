import { Helmet } from "react-helmet";

interface SpecItem {
	title: string;
	description: string;
}

const specs: SpecItem[] = [
	{ title: "Motherboard", description: "Gigabyte X670 AORUS Elite" },
	{ title: "CPU", description: "AMD Ryzen 9 7950X" },
	{ title: "GPU", description: "NVIDIA GeForce RTX 4090 Founders" },
	{ title: "RAM", description: "32GB DDR5" },
	{ title: "PSU", description: "Corsair HX850 Platinum" },
	{ title: "Storage", description: "5TB NVMe M.2 SSD" },
	{ title: "Fans", description: "be quiet! Silent Wings Pro 4 (x5)" },
	{ title: "Case", description: "HYTE Y60" }
];

const Specs = () => {
	return (
		<>
			<Helmet>
				<title>nanos.club | PC Specs</title>
				<meta property="og:site_name" content="nanos.club" />
				<meta property="og:title" content="PC Specs" />
				<meta property="og:url" content="https://nanos.club/specs" />
				<meta property="og:image" content="" />
			</Helmet>
			<div className="min-h-screen flex flex-col justify-center items-center">
				<div className="mx-auto p-8 bg-card border border-neutral-700 rounded-xl shadow-lg max-w-lg w-full">
					<div className="w-fit mx-auto mb-6">
						<h1 className="text-2xl font-bold text-center text-neutral-300">PC Specifications</h1>
						<h3 className="font-medium text-center text-neutral-500 separator-hr">2024</h3>
					</div>
					<ul className="flex flex-col gap-y-2">
						{specs.map((spec, index) => (
							<li key={index} className="flex-grow flex items-center">
								<span className="font-bold text-sm text-gradient">{spec.title}</span>
								<span className="flex-grow border-t border-dotted border-neutral-500 mx-2"/>
								<span>{spec.description}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Specs;
