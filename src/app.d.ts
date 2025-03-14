declare global {
	type Nullable<T> = T | null;
	interface APIResponse<T = {}> {
		data: Nullable<T>;
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
