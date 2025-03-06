<script lang="ts">
	import { initBrowserFingerprint } from '$lib/stores/fingerprint.svelte';
	import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';

	import '../app.css';
	import { onMount } from 'svelte';
	let { children } = $props();

	onMount(async () => {
		const fingerprint = await getFingerprint();
		window.localStorage.setItem('cfid', fingerprint);
	});
</script>

{@render children()}
