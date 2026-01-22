export interface Project {
	image?: string;
	name: string;
	desc: string;
	url?: string;
	source?: string | string[];
	stack: string[];
	immune?: boolean;
}

export interface Tech {
	image: string;
	name: string;
	type: string;
	url: string;
}
