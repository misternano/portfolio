export interface Project {
	image?: string;
	name: string;
	desc: string;
	url?: string;
	source?: string;
	stack?: string[];
}

export interface Stock {
	image: string;
	name: string;
	alt?: string;
	ticker: string;
}

export interface Tech {
	image: string;
	name: string;
	description: string;
	type: string;
	url: string;
}
