<script lang="ts">
	import { getFriendRequestsContext } from '$lib/stores/fr-store.svelte';

	let friendRequests = getFriendRequestsContext();
</script>

<h1>Requests</h1>
