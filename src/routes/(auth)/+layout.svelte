<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

{#key data.pathname}
	<div transition:slide>
		{@render children()}
	</div>
{/key}
