import { PATH } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';

const authroutes = ['/login', '/verify', '/onboarding'];

export const handle: Handle = async ({ event, resolve }) => {
	const access_token = event.cookies.get('aid');
	const refresh_token = event.cookies.get('rid');

	const { url } = event;
	const pathname = url.pathname;

	if (!refresh_token) {
		if (authroutes.includes(pathname)) {
		} else {
			throw redirect(301, '/login');
		}
	}

	if (authroutes.includes(pathname)) {
		if (refresh_token) {
			throw redirect(301, '/chat');
		}
		if (pathname === '/verify') {
			const u = url.searchParams.get('u');
			const tid = url.searchParams.get('tid');
			if (!u && !tid) {
				throw redirect(301, '/login');
			}
		}
		if (pathname === '/onboarding') {
			const token = url.searchParams.get('token');
			if (!token) {
				throw redirect(301, '/login');
			}
		}
	}

	return await resolve(event);
};
