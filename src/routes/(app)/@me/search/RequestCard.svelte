<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_API_URL } from '$env/static/public';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import type { User } from '$lib/types';
	import { Loader2Icon, UserPlusIcon } from 'lucide-svelte';

	let { user }: { user: User } = $props();
	let loading = $state<boolean>(false);

	const sendFriendRequest = async (receiverId: string) => {
		loading = true;
		try {
			const response = await fetch(`${PUBLIC_API_URL}/friend-requests`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ receiverId })
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}

		loading = false;
	};
</script>

<li class="flex items-center justify-between p-2">
	<div class="flex items-center gap-3">
		<UserAvatar {user} />

		<div class="text-md font-bold">
			{user.name}
		</div>
	</div>
	<div class="tooltip tooltip-top" data-tip={'send friend request'}>
		<button
			class="btn btn-square btn-ghost"
			onclick={async () => {
				await sendFriendRequest(user.id);
			}}
		>
			{#if loading}
				<Loader2Icon class="w-4 h-4 animate-spin" />
			{:else}
				<UserPlusIcon />
			{/if}
		</button>
	</div>
</li>
