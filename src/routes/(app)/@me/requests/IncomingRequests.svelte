<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { getFriendRequestsContext } from '$lib/stores/fr-store.svelte';
	import { getFriendsContext } from '$lib/stores/friends.svelte';
	import type { Friend, FriendRequest } from '$lib/types';

	let friendRequests = getFriendRequestsContext();

	let friends = getFriendsContext();

	let loading = $state<boolean>(false);

	const acceptFriendRequest = async (requestId: string) => {
		loading = true;
		try {
			const response = await fetch(`${PUBLIC_API_URL}/friend-requests/${requestId}/accept`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data: APIResponse<Friend> = await response.json();
			if (data.data) {
				friends.received.push(data.data);
				const filteredRequests = friendRequests.incomingFriendRequests.filter(
					(request) => request.id !== requestId
				);
				friendRequests.incomingFriendRequests = [...filteredRequests];
			}
		} catch (error) {
			console.error(error);
		}

		loading = false;
	};

	const rejectFriendRequest = async (requestId: string) => {
		loading = true;
		try {
			const response = await fetch(`${PUBLIC_API_URL}/friend-requests/${requestId}/reject`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data: APIResponse<{ friendRequest: FriendRequest }> = await response.json();
			if (data.data) {
				const filteredRequests = friendRequests.incomingFriendRequests.filter(
					(request) => request.id !== requestId
				);
				friendRequests.incomingFriendRequests = [...filteredRequests];
			}
		} catch (error) {
			console.error(error);
		}

		loading = false;
	};
</script>

<h1>Incoming Requests</h1>

{#each friendRequests.incomingFriendRequests as request (request.id)}
	<div class="bg-base-300 flex items-center justify-between p-2 rounded-lg gap-3">
		<div class="flex items-center gap-2">
			<div class="avatar avatar-placeholder">
				<div class="bg-base-100 text-neutral-content w-12 rounded-full">
					<span
						>{request.sender.name
							.split(' ')
							.map((char) => char[0].toUpperCase())
							.join('')}</span
					>
				</div>
			</div>
			<p>{request.sender.name}</p>
		</div>
		<div class="flex items-center gap-2">
			<button class="btn btn-primary" onclick={async () => await acceptFriendRequest(request.id)}
				>Accept</button
			>
			<button class="btn btn-error" onclick={async () => await rejectFriendRequest(request.id)}
				>Decline</button
			>
		</div>
	</div>
{/each}
