export interface Project {
	src: string;
	name: string;
	desc: string;
	url?: string;
	source?: string;
	stack?: string[];
}

export interface Stock {
	src: string;
	name: string;
	alt?: string;
	ticker: string;
}
