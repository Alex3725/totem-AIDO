<script lang="ts">
import { goto } from '$app/navigation';
import { authStore } from '$lib/stores/auth.store.svelte';

	let email = $state('');
	let password = $state('');
	let mostraPassword = $state(false);

	async function handleLogin() {
		const success = await authStore.login(email, password);
		
		if (success) {
			// Redirect a documenti
			goto('/documents');
		}
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleLogin();
		}
	}

	// Quick login per test
	function quickLogin(tipo: 'admin' | 'user') {
		if (tipo === 'admin') {
			email = 'admin@aido.it';
			password = 'admin123';
		} else {
			email = 'utente@aido.it';
			password = 'user123';
		}
		handleLogin();
	}
</script>

<div class="flex h-screen items-center justify-center bg-gradient-to-br from-red-500 to-red-700">
	<div class="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-2xl">
		<!-- Logo -->
		<div class="text-center">
			<div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600 shadow-lg">
				<span class="text-4xl font-bold text-white">aido</span>
			</div>
			<h1 class="text-3xl font-bold text-gray-800">Accedi al Sistema</h1>
			<p class="mt-2 text-gray-600">Gestione Documenti AIDO</p>
		</div>

		<!-- Form -->
		<div class="space-y-6">
			<!-- Email -->
			<div>
				<label for="email" class="mb-2 block text-sm font-medium text-gray-700">
					Email
				</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					onkeypress={handleKeyPress}
					placeholder="esempio@email.it"
					class="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
					disabled={authStore.isLoading}
				/>
			</div>

			<!-- Password -->
			<div>
				<label for="password" class="mb-2 block text-sm font-medium text-gray-700">
					Password
				</label>
				<div class="relative">
					<input
						id="password"
						type={mostraPassword ? 'text' : 'password'}
						bind:value={password}
						onkeypress={handleKeyPress}
						placeholder="••••••••"
						class="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
						disabled={authStore.isLoading}
					/>
					<button
						type="button"
						onclick={() => mostraPassword = !mostraPassword}
						class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
					>
						{mostraPassword ? '🙈' : '👁️'}
					</button>
				</div>
			</div>

			<!-- Errore -->
			{#if authStore.errore}
				<div class="rounded-lg bg-red-50 p-4 text-center text-red-800">
					⚠️ {authStore.errore}
				</div>
			{/if}

			<!-- Pulsante Login -->
			<button
				onclick={handleLogin}
				disabled={authStore.isLoading || !email || !password}
				class="w-full rounded-lg bg-red-600 py-3 text-lg font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{authStore.isLoading ? '🔄 Accesso in corso...' : 'Accedi'}
			</button>
		</div>

		<!-- Separatore -->
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<div class="w-full border-t border-gray-300"></div>
			</div>
			<div class="relative flex justify-center text-sm">
				<span class="bg-white px-4 text-gray-500">Accesso rapido per test</span>
			</div>
		</div>

		<!-- Quick Login Buttons -->
		<div class="grid grid-cols-2 gap-4">
			<button
				onclick={() => quickLogin('admin')}
				class="rounded-lg border-2 border-purple-500 bg-purple-50 py-3 font-semibold text-purple-700 transition hover:bg-purple-100"
				disabled={authStore.isLoading}
			>
				👑 Admin
			</button>
			<button
				onclick={() => quickLogin('user')}
				class="rounded-lg border-2 border-blue-500 bg-blue-50 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
				disabled={authStore.isLoading}
			>
				👤 Utente
			</button>
		</div>

		<!-- Info credenziali -->
		<div class="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
			<p class="mb-2 font-semibold">📋 Credenziali di test:</p>
			<div class="space-y-1 font-mono text-xs">
				<p><strong>Admin:</strong> admin@aido.it / admin123</p>
				<p><strong>Utente:</strong> utente@aido.it / user123</p>
			</div>
		</div>
	</div>
</div>