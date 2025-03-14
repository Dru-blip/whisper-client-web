import { redirect, type Handle } from '@sveltejs/kit';

const authroutes = ['/login', '/verify'];

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('sid');

	const { url } = event;
	const pathname = url.pathname;

	if (!sessionId) {
		if (authroutes.includes(pathname)) {
		} else {
			throw redirect(301, '/login');
		}
	}

	if (pathname === '/onboarding') {
		const token = url.searchParams.get('token');
		if (!token) {
			throw redirect(301, '/login');
		}
	}

	if (authroutes.includes(pathname)) {
		if (url.searchParams.has('/logout')) {
		} else {
			if (sessionId) {
				throw redirect(301, '/@me');
			}
			if (pathname === '/verify') {
				const u = url.searchParams.get('u');
				const tid = url.searchParams.get('tid');
				if (!u && !tid) {
					throw redirect(301, '/login');
				}
			}
		}
	}

	return await resolve(event);
};
