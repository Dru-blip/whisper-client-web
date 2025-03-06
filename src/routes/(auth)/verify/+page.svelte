<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, FieldErrors, Label } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug from 'sveltekit-superforms';
	import { verifySchema } from './schema';
	import { Loader2Icon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let { data } = $props();
	let fingerprint = $state('');

	onMount(() => {
		fingerprint = window.localStorage.getItem('cfid')!;
	});

	const form = superForm(data.form, {
		multipleSubmits: 'prevent',
		validators: zodClient(verifySchema),
		onSubmit: ({ formData }) => {
			formData.append('cid', fingerprint);
			formData.append('tid', data.tid);
			formData.append('u', data.user);
		}
	});
	const { form: formData, enhance, submitting, message } = form;
</script>

<main class="min-h-screen flex items-center justify-center">
	<form method="POST" class="w-[400px] flex flex-col gap-3 p-3" use:enhance>
		<button class="btn btn-ghost underline w-[70px] justify-start"
			><a href="/login">login</a></button
		>
		{#if $message}
			<h3 class:invalid={page.status >= 400} class="text-red-500 text-center font-bold text-lg">
				{$message}
			</h3>
		{/if}
		<Field {form} name="otp">
			<Control>
				{#snippet children({ props })}
					<Label class="font-semibold">OTP</Label>
					<input {...props} type="text" class="input w-full" bind:value={$formData.otp} />
				{/snippet}
			</Control>
			<FieldErrors class="text-red-500" />
		</Field>
		<button class="btn w-full" type="submit">
			{#if $submitting}
				<Loader2Icon class="animate-spin mx-2" />
			{/if}
			Verify
		</button>
	</form>
</main>
