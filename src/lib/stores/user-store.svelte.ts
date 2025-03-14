import type { User } from '$lib/types';
import { getContext, setContext } from 'svelte';

const USER_STORE = Symbol('user');

export const setUserContext = (user: Nullable<User>) => {
	setContext(USER_STORE, user);
};

export const getUserContext = () => {
	return getContext<User>(USER_STORE);
};
