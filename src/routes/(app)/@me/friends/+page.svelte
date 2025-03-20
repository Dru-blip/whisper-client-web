<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import { getFriendsContext } from '$lib/stores/friends.svelte';
	import type { Friend } from '$lib/types';

	let friends = getFriendsContext();

	let loading = $state<boolean>(false);

	const removeFriend = async (friendId: string, initiator: boolean) => {
		loading = true;
		try {
			const response = await fetch(`${PUBLIC_API_URL}/friends/${friendId}/remove`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data: APIResponse<{ friend: Friend }> = await response.json();
			if (data.data) {
				if (initiator) {
					friends.initiated = friends.initiated.filter((f) => f.id !== friendId);
				} else {
					friends.received = friends.received.filter((f) => f.id !== friendId);
				}
			}
		} catch (error) {
			console.error(error);
		}

		loading = false;
	};
</script>

<div class="flex flex-col gap-3 w-full container px-8 py-8">
	{#each friends.initiated as friend (friend.id)}
		<div class="bg-base-200 flex items-center justify-between p-2 rounded-lg gap-3">
			<div class="flex items-center gap-3">
				<UserAvatar user={friend.receiver} />
				<p>{friend.receiver.name}</p>
			</div>
			<div class="flex items-center">
				<button
					class="btn btn-error btn-sm"
					onclick={async () => await removeFriend(friend.id, true)}
				>
					remove
				</button>
			</div>
		</div>
	{/each}

	{#each friends.received as friend (friend.id)}
		<div class="bg-base-200 flex items-center justify-between p-2 rounded-lg gap-3">
			<div class="flex items-center gap-3">
				<UserAvatar user={friend.initiator} />
				<p>{friend.initiator.name}</p>
			</div>

			<div class="flex items-center">
				<button
					class="btn btn-error btn-sm"
					onclick={async () => await removeFriend(friend.id, false)}
				>
					remove
				</button>
			</div>
		</div>
	{/each}
</div>
