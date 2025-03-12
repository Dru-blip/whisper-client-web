import { fail, redirect, type NumericRange } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { loginSchema } from './schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions = {
	logout: async ({ cookies }) => {
		const sid = cookies.get('sid');

		cookies.delete('sid', { path: '/' });
		await fetch(`${env.API_URL}/auth/logout`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `sid=${sid}`
			}
		});

		throw redirect(301, '/login');
	},
	login: async ({ request }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) return fail(400, { form });
		const { email, cid } = form.data;

		const response = await fetch(`${env.API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, cid })
		});
		const responseData: APIResponse<{ message: string; redirectTo: string }> =
			await response.json();
		if (responseData.error) {
			return message(form, 'Internal Server Error', {
				status: responseData.error?.code as NumericRange<400, 599>
			});
		}

		if (responseData.data) {
			throw redirect(303, responseData.data.redirectTo);
		}
	}
} satisfies Actions;
