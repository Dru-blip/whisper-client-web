import { fail, redirect, type NumericRange } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { verifySchema } from './schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { env } from '$env/dynamic/private';
import { parseCookie } from '$lib/utils';

export const load: PageServerLoad = async ({ url }) => {
	const tid = url.searchParams.get('tid');
	const user = url.searchParams.get('u');
	return {
		tid,
		user,
		form: await superValidate(zod(verifySchema))
	};
};

export type VerifyResponseData = {
	onboarding: boolean;
	verified: boolean;
	redirectUrl: string;
	message: string;
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(verifySchema));
		if (!form.valid) return fail(400, { form });
		const { otp, cid, u, tid } = form.data;

		const response = await fetch(`${env.API_URL}/auth/verify?u=${u}&tid=${tid}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ otp, email: u, cid })
		});
		const responseData: APIResponse<VerifyResponseData> = await response.json();
		if (responseData.error) {
			return message(form, responseData.error.message, {
				status: <NumericRange<400, 599>>responseData.error.code
			});
		}
		if (responseData.data.onboarding) {
			throw redirect(300, responseData.data.redirectUrl);
		} else {
			const setCookies = response.headers.getSetCookie();
			setCookies.forEach((cookie) => {
				const parsedCookie = parseCookie(cookie);
				cookies.set(parsedCookie.Name, parsedCookie.Value, {
					path: parsedCookie.Path,
					secure: parsedCookie.Secure,
					httpOnly: parsedCookie.HttpOnly,
					sameSite: parsedCookie.SameSite,
					maxAge: parsedCookie.MaxAge
				});
			});
			throw redirect(300, '/chat');
		}
	}
} satisfies Actions;
