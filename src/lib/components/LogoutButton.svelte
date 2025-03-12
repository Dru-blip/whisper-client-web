<script lang="ts">
	import { LogOutIcon } from 'lucide-svelte';
</script>

<form action="/login?/logout" method="POST">
	<button type="submit" class="btn">
		<LogOutIcon class="icon" />
	</button>
</form>
