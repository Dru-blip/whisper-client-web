<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { setUserContext } from '$lib/stores/user-store.svelte';
	import type { LayoutData } from './$types';

	let { children, data } = $props();

	let user = $state(data.user);
	setUserContext(user);
</script>

<section class="flex min-h-screen">
	<Sidebar />
	<div class="w-full">
		{@render children()}
	</div>
</section>
