<script lang="ts">
	import type { User } from '$lib/types';

	let { user }: { user: User } = $props();
</script>

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
