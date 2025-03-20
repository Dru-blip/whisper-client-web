import type { Friend } from '$lib/types';
import { getContext, setContext } from 'svelte';

const FRIENDS_STORE = Symbol('friends');

export const setFriendsContext = (friends: Nullable<Friend[]>) => {
	setContext(FRIENDS_STORE, friends);
};

export const getFriendsContext = () => {
	return getContext<Friend[]>(FRIENDS_STORE);
};
