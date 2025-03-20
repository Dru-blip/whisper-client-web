<script lang="ts">
	import { getFriendRequestsContext } from '$lib/stores/fr-store.svelte';
	import IncomingRequests from './IncomingRequests.svelte';

	let friendRequests = getFriendRequestsContext();
</script>

<section class="flex flex-col gap-4 w-full px-8 container">
	<div>
		<IncomingRequests />
	</div>

	<div>
		<h1>Outgoing Requests</h1>

		{#each friendRequests.outgoingFriendRequests as request (request.id)}
			<div>
				<p>{request.receiver.name}</p>
			</div>
		{/each}
	</div>
</section>
