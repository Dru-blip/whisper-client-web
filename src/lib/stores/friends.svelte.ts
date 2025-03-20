import type { Friend } from '$lib/types';
import { getContext, setContext } from 'svelte';

const FRIENDS_STORE = Symbol('friends');

type Friendships = {
	initiated: Friend[];
	received: Friend[];
};

export const setFriendsContext = (friends: Nullable<Friendships>) => {
	setContext(FRIENDS_STORE, friends);
};

export const getFriendsContext = () => {
	return getContext<Friendships>(FRIENDS_STORE);
};
