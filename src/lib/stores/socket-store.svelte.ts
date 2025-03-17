import type { Socket } from 'socket.io-client';
import { getContext, setContext } from 'svelte';

const SOCKET_STORE = Symbol('user');

export const setSocketContext = (socket: Nullable<Socket>) => {
	setContext(SOCKET_STORE, socket);
};

export const getSocketContext = () => {
	return getContext<Socket>(SOCKET_STORE);
};
