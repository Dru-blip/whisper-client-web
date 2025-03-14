type FetchOptions = {
	url: string;
	withCredentials?: boolean;
	headers?: Record<string, string>;
};

type MutationOptions = FetchOptions & {
	method: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	body?: string;
};

export const queryApi = async <T>(options: FetchOptions): Promise<APIResponse<T>> => {
	try {
		const response = await fetch(options.url, {
			method: 'GET',
			credentials: options.withCredentials ? 'include' : 'omit',
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			}
		});

		const responseData: APIResponse<T> = await response.json();
		if (responseData.error) {
			return {
				data: null,
				error: responseData.error
			};
		}

		return responseData;
	} catch (error) {
		return {
			data: null,
			error: {
				code: 500,
				message: 'Unable to reach server'
			}
		};
	}
};

export const mutateApi = async <T>(options: MutationOptions): Promise<APIResponse<T>> => {
	try {
		const response = await fetch(options.url, {
			method: options.method,
			credentials: options.withCredentials ? 'include' : 'omit',
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			},
			body: options.body
		});

		const responseData: APIResponse<T> = await response.json();

		if (responseData.error) {
			return {
				data: null,
				error: responseData.error
			};
		}

		return responseData;
	} catch (error) {
		return {
			data: null,
			error: {
				code: 500,
				message: 'Unable to reach server'
			}
		};
	}
};
