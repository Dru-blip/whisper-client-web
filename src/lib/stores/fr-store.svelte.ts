import type { FriendRequests } from '$lib/types';
import { getContext, setContext } from 'svelte';

const FRIEND_REQUEST_STORE = Symbol('friendRequests');

export const setFriendRequestsContext = (friendRequests: Nullable<FriendRequests>) => {
	setContext(FRIEND_REQUEST_STORE, friendRequests);
};

export const getFriendRequestsContext = () => {
	return getContext<FriendRequests>(FRIEND_REQUEST_STORE);
};
