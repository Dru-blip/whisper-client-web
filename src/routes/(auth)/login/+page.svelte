<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, FieldErrors, Label } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug from 'sveltekit-superforms';
	import { loginSchema } from './schema.js';
	import { Loader2Icon } from 'lucide-svelte';
	import { getFingerprintContext } from '$lib/stores/fingerprint.svelte.js';
	import { onMount } from 'svelte';
	import { applyAction } from '$app/forms';
	import { page } from '$app/state';

	let { data } = $props();
	let fingerprint = $state('');

	onMount(() => {
		fingerprint = window.localStorage.getItem('cfid')!;
	});

	const form = superForm(data.form, {
		multipleSubmits: 'prevent',
		validators: zodClient(loginSchema),
		onSubmit: ({ formData }) => {
			formData.append('cid', fingerprint);
		}
	});
	const { form: formData, enhance, submitting, formId, message } = form;
</script>

<main class="min-h-screen flex items-center justify-center">
	<form method="POST" action="/login?/login" class="w-[400px] flex flex-col gap-3 p-3" use:enhance>
		{#if $message}
			<h3 class:invalid={page.status >= 400}>{$message}</h3>
		{/if}
		<div class="text-center">
			<h2 class="text-xl font-bold">Login or Signup</h2>
			<p class="text-sm mt-2 text-gray-500">
				Enter your email address to receive one time password
			</p>
		</div>
		<input class="mt-4" type="hidden" name="id" bind:value={$formId} />
		<Field {form} name="email">
			<Control>
				{#snippet children({ props })}
					<Label class="font-semibold">Email</Label>
					<input
						{...props}
						type="email"
						class="input w-full"
						bind:value={$formData.email}
						required
					/>
				{/snippet}
			</Control>
			<FieldErrors class="text-red-500" />
		</Field>
		<button class="btn w-full" type="submit">
			{#if $submitting}
				<Loader2Icon class="animate-spin mx-2" />
			{/if}
			Continue
		</button>
	</form>
</main>
