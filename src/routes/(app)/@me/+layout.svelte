<script lang="ts">
	import { SearchIcon, UserIcon, UserPlus2, UserPlus2Icon, UserPlusIcon } from 'lucide-svelte';
	let { children } = $props();
	import { page } from '$app/state';
	let pathname = $derived(page.url.pathname);
</script>

{#snippet link(url: string, label: string, Icon: typeof UserIcon, isActive: boolean)}
	<div class="tooltip tooltip-right" data-tip={label}>
		<a href={url}>
			<button class="w-full btn {isActive ? ' btn-info' : ''}">
				<Icon class="w-4 h-4" />
				{label}
			</button>
		</a>
	</div>
{/snippet}

<div class="flex w-full">
	<div class="flex flex-col w-32 bg-base-200 min-h-screen gap-2 p-2">
		{@render link('/@me/search', 'Search', SearchIcon, pathname === '/@me/search')}
		{@render link('/@me/friends', 'Friends', UserIcon, pathname === '/@me/friends')}
		{@render link('/@me/requests', 'Requests', UserPlusIcon, pathname === '/@me/requests')}
	</div>
	{@render children()}
</div>
