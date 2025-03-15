import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { queryApi } from '$lib/api';
import { env } from '$env/dynamic/private';
import type { User } from '$lib/types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const query = <string>url.searchParams.get('query');

	const response = await queryApi<User[]>({
		url: `${env.API_URL}/users?query=${query}`,
		withCredentials: true,
		headers: {
			Cookie: `sid=${cookies.get('sid')}`
		}
	});
	const { error, data } = response;
	if (error) {
		if (error.code === 401) {
			throw redirect(301, '/login');
		}
		return json(error);
	}

	return json(data);
};
