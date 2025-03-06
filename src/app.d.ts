declare global {
	interface APIResponse<T = {}> {
		data: T;
		error?: {
			code: number;
			message: string;
		};
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
