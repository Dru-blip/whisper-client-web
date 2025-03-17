<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { setUserContext } from '$lib/stores/user-store.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { io, Socket } from 'socket.io-client';
	import { setSocketContext } from '$lib/stores/socket-store.svelte';

	let { children, data } = $props();

	let user = $state(data.user);
	setUserContext(user);

	let socket = $state<Nullable<Socket>>(null);

	const onConnect = () => {
		console.log('Connected to server');
	};

	const onDisconnect = () => {
		console.log('Disconnected from server');
	};

	onMount(() => {
		const socket = io('ws://localhost:5000', { withCredentials: true, transports: ['websocket'] });
		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('connect_error', (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
		setSocketContext(socket);
	});

	onDestroy(() => {
		socket?.disconnect();
		socket?.off('connect', onConnect);
		socket?.off('disconnect', onDisconnect);
	});
</script>

<section class="flex min-h-screen">
	<Sidebar />
	<div class="w-full">
		{@render children()}
	</div>
</section>
