import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';
import { getContext, onMount, setContext } from 'svelte';

let fingerprintKey = Symbol('fingerprint');

export class FingerprintState {
	fingerprint = $state<string>('');
	constructor() {
		onMount(async () => {
			this.fingerprint = await getFingerprint();
			console.log(this.fingerprint);
		});
	}
	getFingerprint() {
		return this.fingerprint;
	}
}

export function initBrowserFingerprint() {
	setContext(fingerprintKey, new FingerprintState());
}

export function getFingerprintContext() {
	return getContext<Readonly<FingerprintState>>(fingerprintKey);
}
