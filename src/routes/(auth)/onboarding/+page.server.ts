import { message, superForm, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { onboardSchema } from './schema';
import { fail, redirect, type NumericRange } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { User } from '$lib/types';

export const load: PageServerLoad = async ({ url }) => {
	return {
		token: url.searchParams.get('token'),
		form: await superValidate(zod(onboardSchema))
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(onboardSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, bio, token, cid } = form.data;

		const response = await fetch(`${env.API_URL}/users/onboarding?token=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, bio, cid })
		});

		const responseData: APIResponse<{ message: string; user: User }> = await response.json();

		if (responseData.error) {
			return message(form, responseData.error.message, {
				status: responseData.error?.code as NumericRange<400, 599>
			});
		}

		if (responseData.data) {
			console.log(response.headers.getSetCookie());
			throw redirect(303, '/chat');
		}
	}
} satisfies Actions;
