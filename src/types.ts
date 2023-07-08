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

export interface UserData {
	email: string;
	id: string;
	user_metadata: {
		avatar_url: string;
		preferred_username: string;
	};
}
