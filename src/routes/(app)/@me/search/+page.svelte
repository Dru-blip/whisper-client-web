<script lang="ts">
	import type { User } from '$lib/types';
	import { Split, UserPlusIcon, UserXIcon } from 'lucide-svelte';

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

{#snippet requestCard(user: User)}
	<li class="flex items-center justify-between p-2">
		<div class="flex items-center gap-3">
			{#if user.profilePicture}
				<div class="avatar"></div>
			{:else}
				<div class="avatar avatar-placeholder">
					<div class="bg-base-100 text-neutral-content w-12 rounded-full">
						<span
							>{user.name
								.split(' ')
								.map((char) => char[0].toUpperCase())
								.join('')}</span
						>
					</div>
				</div>
			{/if}

			<div class="text-md font-bold">
				{user.name}
			</div>
		</div>
		<div class="tooltip tooltip-top" data-tip={'send friend request'}>
			<button class="btn btn-square btn-ghost">
				<UserPlusIcon />
			</button>
		</div>
	</li>
{/snippet}

<section class="container flex flex-col px-8 py-8">
	<div class="w-full flex justify-center gap-4">
		<input type="text" class="input" bind:value={searchQuery} placeholder="search user" />
		<button class="btn" onclick={handleSearch}>search</button>
	</div>

	<div class="w-full flex justify-center gap-3 mt-5">
		<!-- {@render requestCard({})} -->
		{#if error}
			<p class="text-red-500">{error}</p>
		{:else if searchQuery && searchResults.length === 0}
			<p class="text-gray-500">No results found</p>
		{:else}
			<ul
				class="flex flex-col justify-center w-[calc(100%-40%)] max-w-lg bg-base-200 rounded-lg shadow-md"
			>
				{#each searchResults as user}
					{@render requestCard(user)}
				{/each}
			</ul>
		{/if}
	</div>
</section>
