import { env } from '$env/dynamic/private';
import { queryApi } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { FriendRequests, InitiatedFriendShips, ReceivedFriendShips, User } from '$lib/types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const userInfo = await queryApi<
		User &
			FriendRequests & { initiatedFriendShips: InitiatedFriendShips } & {
				receivedFriendShips: ReceivedFriendShips;
			}
	>({
		url: `${env.API_URL}/users/@me`,
		withCredentials: true,
		headers: {
			Cookie: `sid=${cookies.get('sid')}`
		}
	});

	if (userInfo.error?.code === 401) {
		throw redirect(301, '/login');
	}

	const { incomingFriendRequests, outgoingFriendRequests, ...rest } = userInfo.data!;

	return {
		user: { ...rest },
		friendRequests: { incomingFriendRequests, outgoingFriendRequests }
	};
};
