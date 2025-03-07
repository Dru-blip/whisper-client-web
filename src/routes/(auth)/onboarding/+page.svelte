<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { onboardSchema } from './schema.js';
	import { page } from '$app/state';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { Loader2Icon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	let fingerprint = $state('');

	onMount(() => {
		fingerprint = window.localStorage.getItem('cfid')!;
	});

	const form = superForm(data.form, {
		validators: zodClient(onboardSchema),
		onSubmit: ({ formData }) => {
			formData.append('cid', fingerprint);
			formData.append('token', data.token);
		}
	});
	const { form: formData, formId, message, enhance, submitting } = form;
</script>

<main class="min-h-screen flex items-center justify-center">
	<form method="POST" class="w-[400px] flex flex-col gap-3 p-3" use:enhance>
		{#if $message}
			<div class="text-center">
				<h3 class:invalid={page.status >= 400} class="text-red-500">{$message}</h3>
				{#if page.status >= 400}
					<a href="/login" class="underline">something went wrong please try again</a>
				{/if}
			</div>
		{/if}
		<div class="text-center">
			<h2 class="text-xl font-bold">Info</h2>
		</div>
		<input class="mt-4" type="hidden" name="id" bind:value={$formId} />
		<Field {form} name="name">
			<Control>
				{#snippet children({ props })}
					<Label class="font-semibold">Name</Label>
					<input {...props} type="text" class="input w-full" bind:value={$formData.name} required />
				{/snippet}
			</Control>
			<FieldErrors class="text-red-500" />
		</Field>
		<Field {form} name="bio">
			<Control>
				{#snippet children({ props })}
					<Label class="font-semibold">Bio</Label>
					<textarea {...props} class="textarea w-full" bind:value={$formData.bio}> </textarea>
				{/snippet}
			</Control>
			<FieldErrors class="text-red-500" />
		</Field>
		<button class="btn w-full" type="submit">
			{#if $submitting}
				<Loader2Icon class="animate-spin mx-2" />
			{/if}
			Save
		</button>
	</form>
</main>
