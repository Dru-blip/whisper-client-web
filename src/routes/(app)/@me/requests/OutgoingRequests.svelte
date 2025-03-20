<script lang="ts">
	// import { getFingerprintContext } from "$lib/stores/fingerprint.svelte";
	import { getFriendRequestsContext } from '$lib/stores/fr-store.svelte';

	const friendRequests = getFriendRequestsContext().outgoingFriendRequests;
</script>

<h1>Outgoing Requests</h1>

{#each friendRequests as request (request.id)}
	<div>
		<p>{request.receiver.name}</p>
	</div>
{/each}
