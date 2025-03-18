<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '$lib/types';
	import RequestCard from './RequestCard.svelte';

	let searchQuery = $state('');
	let searchResults = $state<User[]>([]);
	let error = $state<string | null>(null);

	const handleSearch = async () => {
		const response = await fetch(`/@me/search?query=${searchQuery}`);
		const data = await response.json();
		if (data.error) {
			error = data.error.message;
		} else {
			searchResults = data.users ?? [];
		}
	};
</script>

<section class="container flex flex-col px-8 py-8">
	<div class="w-full flex justify-center gap-4">
		<input type="text" class="input" bind:value={searchQuery} placeholder="search user" />
		<button class="btn" onclick={handleSearch}>search</button>
	</div>

	<div class="w-full flex justify-center gap-3 mt-5">
		{#if error}
			<p class="text-red-500">{error}</p>
		{:else if searchQuery && searchResults.length === 0}
			<p class="text-gray-500">No results found</p>
		{:else}
			<ul
				class="flex flex-col justify-center w-[calc(100%-40%)] max-w-lg bg-base-200 rounded-lg shadow-md"
			>
				{#each searchResults as user}
					<RequestCard {user} />
				{/each}
			</ul>
		{/if}
	</div>
</section>
