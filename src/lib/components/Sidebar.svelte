<script lang="ts">
	import { getUserContext } from '$lib/stores/user-store.svelte';
	import { BellIcon, HomeIcon, MessageCircleIcon, SettingsIcon, UserIcon } from 'lucide-svelte';
	import LogoutButton from './LogoutButton.svelte';
	import { page } from '$app/state';

	let user = getUserContext();
	let pathname = $derived(page.url.pathname);
</script>

{#snippet Link(url: string, label: string, Icon: any, isActive: boolean)}
	<div class="tooltip tooltip-right" data-tip={label}>
		<a href={url}>
			<button class="btn btn-circle{isActive ? ' btn-info' : ''}">
				<Icon class="w-5 h-5" />
			</button>
		</a>
	</div>
{/snippet}

<aside class="flex flex-col justify-between p-2 bg-base-300">
	<div class="flex flex-col gap-3 items-center">
		{@render Link('/@me', 'Home', HomeIcon, pathname === '/@me')}
		{@render Link('/chats', 'Chats', MessageCircleIcon, pathname === '/chats')}
		<!-- {@render Link('/friends', 'Friends', UserIcon, false)} -->
		{@render Link('/notifications', 'Notifications', BellIcon, pathname === '/notifications')}
	</div>

	<div class="flex flex-col items-center gap-4">
		{@render Link('/settings', 'Settings', SettingsIcon, pathname === '/settings')}
		<LogoutButton />
	</div>
</aside>
