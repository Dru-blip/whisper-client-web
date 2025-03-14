<script>
	import LogoutButton from '$lib/components/LogoutButton.svelte';
	import { getUserContext } from '$lib/stores/user-store.svelte';

	let user = getUserContext();
</script>

<h1>{user?.email}</h1>
