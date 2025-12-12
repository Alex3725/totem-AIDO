# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### 💡 L'Alias `$lib` - Importazioni Semplici

**`$lib`** è un **alias speciale** che punta sempre a `src/lib/`, indipendentemente da dove ti trovi nel progetto.

**Senza `$lib` (percorsi relativi complicati):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '../../../lib/components/Button.svelte';
import { formatDate } from '../../../lib/utils/date.js';
import { user } from '../../../lib/stores/user.js';

// 😵 Difficile da mantenere, facile sbagliare
```

**Con `$lib` (sempre uguale, ovunque sei):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '$lib/components/Button.svelte';
import { formatDate } from '$lib/utils/date';
import { user } from '$lib/stores/user';

// ✅ Sempre lo stesso path, facile da ricordare!
```

**Struttura tipica di `$lib`:**
```
src/lib/
├── components/               # Componenti riutilizzabili
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── Modal.svelte
│   └── forms/
│       ├── Input.svelte
│       └── Select.svelte
│
├── server/                   # ⚠️ Codice SOLO server (non esposto al client)
│   ├── database.ts          # DB connection
│   ├── auth.ts              # Auth logic
│   └── email.ts             # Email service
│
├── stores/                   # Svelte stores globali
│   ├── user.ts
│   ├── cart.ts
│   └── theme.ts
│
├── utils/                    # Utility functions
│   ├── date.ts
│   ├── format.ts
│   └── validators.ts
│
├── types/                    # TypeScript types condivisi
│   └── index.ts
│
└── index.ts                  # Esporta componenti pubblici
```

**Esempi pratici:**

```typescript
// src/lib/components/Button.svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button class={variant} {disabled}>
  <slot />
</button>

// src/lib/index.ts - Esporta per uso esterno
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';

// Ora puoi importare così:
// import { Button, Card } from '$lib';
```

```typescript
// src/lib/stores/user.ts
import { writable } from 'svelte/store';

export const user = writable(null);
export const isLoggedIn = derived(user, $user => $user !== null);

// Usa ovunque con:
// import { user, isLoggedIn } from '$lib/stores/user';
```

```typescript
// src/lib/utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('it-IT').format(date);
}

// Usa con:
// import { formatDate } from '$lib/utils/date';
```

**⚠️ IMPORTANTE - `$lib/server`:**

Il codice in `src/lib/server/` è **accessibile SOLO dal server**. Vite lo esclude automaticamente dal bundle client.

```typescript
// ✅ OK - Importa in +page.server.ts
import { db } from '$lib/server/database';

// ❌ ERRORE - Non puoi importare in +page.svelte
import { db } from '$lib/server/database'; // Build error!
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database'; // ✅ Solo qui!

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot /> <!-- Pagina child renderizzata qui -->
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

## 🏪 Stores di SvelteKit

### 💡 Il Simbolo `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 - Auto-subscription

In Svelte, il simbolo **`# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

** davanti a una variabile indica che è uno **store** e vogliamo:
1. **Auto-subscribe** → Svelte si iscrive automaticamente allo store
2. **Auto-unsubscribe** → Svelte rimuove l'iscrizione quando il componente viene distrutto
3. **Reattività automatica** → Il DOM si aggiorna quando lo store cambia

**Senza `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (manuale):**
```svelte
<script>
  import { page } from '$app/stores';
  
  let currentPath;
  
  // Devi fare subscribe manualmente
  const unsubscribe = page.subscribe(value => {
    currentPath = value.url.pathname;
  });
  
  // E ricordarti di fare unsubscribe
  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1>{currentPath}</h1>
```

**Con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (automatico e reattivo):**
```svelte
<script>
  import { page } from '$app/stores';
  
  // Il $ fa tutto automaticamente!
  // - Subscribe all'inizio
  // - Aggiorna quando cambia
  // - Unsubscribe quando componente viene distrutto
</script>

<h1>{$page.url.pathname}</h1>
```

### $app/stores

```svelte
<script>
  import { page, navigating, updated } from '$app/stores';
  
  // ✅ $page - Informazioni sulla pagina corrente
  // $page.url - URL corrente (oggetto URL)
  // $page.params - Parametri route dinamici
  // $page.route.id - Route ID (es: "/blog/[slug]")
  // $page.status - Status code HTTP
  // $page.error - Oggetto errore se presente
  // $page.data - Dati dalle load functions
  // $page.form - Risultato form action
  // $page.state - Navigation state
  
  // ✅ $navigating - Stato navigazione (null se non stai navigando)
  // $navigating.from - Pagina di provenienza
  // $navigating.to - Pagina di destinazione
  // $navigating.type - Tipo: 'link', 'popstate', 'goto'
  // $navigating.willUnload - True se pagina verrà scaricata
  // $navigating.delta - +1 forward, -1 backward
  // $navigating.complete - Promise che si risolve quando navigazione completa
  
  // ✅ $updated - True se nuova versione app disponibile
</script>

<!-- Esempi pratici -->

<!-- 1. Mostra URL corrente -->
<h1>Current path: {$page.url.pathname}</h1>
<p>Full URL: {$page.url.href}</p>
<p>Query params: {$page.url.searchParams.get('q')}</p>

<!-- 2. Accedi ai parametri dinamici -->
{#if $page.params.slug}
  <p>Stai visualizzando: {$page.params.slug}</p>
{/if}

<!-- 3. Loading spinner durante navigazione -->
{#if $navigating}
  <div class="loading-bar">
    Navigating to {$navigating.to.url.pathname}...
  </div>
{/if}

<!-- 4. Notifica aggiornamento app -->
{#if $updated}
  <div class="update-banner">
    <p>New version available!</p>
    <button on:click={() => location.reload()}>
      Update now
    </button>
  </div>
{/if}

<!-- 5. Evidenzia link attivo -->
<nav>
  <a 
    href="/home" 
    class:active={$page.url.pathname === '/home'}
  >
    Home
  </a>
  <a 
    href="/about" 
    class:active={$page.url.pathname === '/about'}
  >
    About
  </a>
</nav>

<!-- 6. Mostra dati dalla load function -->
<p>User: {$page.data.user?.name}</p>

<!-- 7. Mostra risultato form -->
{#if $page.form?.error}
  <p class="error">{$page.form.error}</p>
{/if}
```

### Esempi Avanzati con Stores

**Progress bar durante navigazione:**
```svelte
<script>
  import { navigating } from '$app/stores';
  import { tweened } from 'svelte/motion';
  
  const progress = tweened(0);
  
  $: if ($navigating) {
    progress.set(0.3); // Inizia al 30%
    $navigating.complete.then(() => {
      progress.set(1); // Completa al 100%
      setTimeout(() => progress.set(0), 500); // Reset
    });
  }
</script>

{#if $progress > 0}
  <div class="progress-bar" style="width: {$progress * 100}%"></div>
{/if}
```

**Breadcrumb dinamico:**
```svelte
<script>
  import { page } from '$app/stores';
  
  $: segments = $page.url.pathname.split('/').filter(Boolean);
</script>

<nav class="breadcrumb">
  <a href="/">Home</a>
  {#each segments as segment, i}
    / 
    <a href="/{segments.slice(0, i + 1).join('/')}">
      {segment}
    </a>
  {/each}
</nav>
```

---

## 🪝 Hooks

### Server Hooks (src/hooks.server.ts)

```typescript
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

// handle - Intercetta ogni richiesta
export const handle: Handle = async ({ event, resolve }) => {
  // Autenticazione
  const session = event.cookies.get('session');
  event.locals.user = await getUser(session);
  
  // Resolve
  const response = await resolve(event);
  
  // Modifica response
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
};

// handleFetch - Modifica fetch requests
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  if (request.url.startsWith('https://api.example.com/')) {
    request.headers.set('Authorization', `Bearer ${API_KEY}`);
  }
  
  return fetch(request);
};

// handleError - Gestione errori
export const handleError: HandleServerError = async ({ error, event }) => {
  console.error(error);
  
  return {
    message: 'Ops! Qualcosa è andato storto'
  };
};
```

### Sequence Multiple Hooks

```typescript
import { sequence } from '@sveltejs/kit/hooks';

const auth = async ({ event, resolve }) => {
  // Auth logic
  return resolve(event);
};

const logging = async ({ event, resolve }) => {
  console.log('Request:', event.url.pathname);
  return resolve(event);
};

export const handle = sequence(auth, logging);
```

---

## 🎯 State Management - Svelte 5 Runes

Le **Runes** sono il nuovo sistema di reattività di Svelte 5. Ogni rune inizia con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### 💡 L'Alias `$lib` - Importazioni Semplici

**`$lib`** è un **alias speciale** che punta sempre a `src/lib/`, indipendentemente da dove ti trovi nel progetto.

**Senza `$lib` (percorsi relativi complicati):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '../../../lib/components/Button.svelte';
import { formatDate } from '../../../lib/utils/date.js';
import { user } from '../../../lib/stores/user.js';

// 😵 Difficile da mantenere, facile sbagliare
```

**Con `$lib` (sempre uguale, ovunque sei):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '$lib/components/Button.svelte';
import { formatDate } from '$lib/utils/date';
import { user } from '$lib/stores/user';

// ✅ Sempre lo stesso path, facile da ricordare!
```

**Struttura tipica di `$lib`:**
```
src/lib/
├── components/               # Componenti riutilizzabili
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── Modal.svelte
│   └── forms/
│       ├── Input.svelte
│       └── Select.svelte
│
├── server/                   # ⚠️ Codice SOLO server (non esposto al client)
│   ├── database.ts          # DB connection
│   ├── auth.ts              # Auth logic
│   └── email.ts             # Email service
│
├── stores/                   # Svelte stores globali
│   ├── user.ts
│   ├── cart.ts
│   └── theme.ts
│
├── utils/                    # Utility functions
│   ├── date.ts
│   ├── format.ts
│   └── validators.ts
│
├── types/                    # TypeScript types condivisi
│   └── index.ts
│
└── index.ts                  # Esporta componenti pubblici
```

**Esempi pratici:**

```typescript
// src/lib/components/Button.svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button class={variant} {disabled}>
  <slot />
</button>

// src/lib/index.ts - Esporta per uso esterno
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';

// Ora puoi importare così:
// import { Button, Card } from '$lib';
```

```typescript
// src/lib/stores/user.ts
import { writable } from 'svelte/store';

export const user = writable(null);
export const isLoggedIn = derived(user, $user => $user !== null);

// Usa ovunque con:
// import { user, isLoggedIn } from '$lib/stores/user';
```

```typescript
// src/lib/utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('it-IT').format(date);
}

// Usa con:
// import { formatDate } from '$lib/utils/date';
```

**⚠️ IMPORTANTE - `$lib/server`:**

Il codice in `src/lib/server/` è **accessibile SOLO dal server**. Vite lo esclude automaticamente dal bundle client.

```typescript
// ✅ OK - Importa in +page.server.ts
import { db } from '$lib/server/database';

// ❌ ERRORE - Non puoi importare in +page.svelte
import { db } from '$lib/server/database'; // Build error!
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database'; // ✅ Solo qui!

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot /> <!-- Pagina child renderizzata qui -->
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

## 🏪 Stores di SvelteKit

### 💡 Il Simbolo `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 - Auto-subscription

In Svelte, il simbolo **`# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

** davanti a una variabile indica che è uno **store** e vogliamo:
1. **Auto-subscribe** → Svelte si iscrive automaticamente allo store
2. **Auto-unsubscribe** → Svelte rimuove l'iscrizione quando il componente viene distrutto
3. **Reattività automatica** → Il DOM si aggiorna quando lo store cambia

**Senza `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (manuale):**
```svelte
<script>
  import { page } from '$app/stores';
  
  let currentPath;
  
  // Devi fare subscribe manualmente
  const unsubscribe = page.subscribe(value => {
    currentPath = value.url.pathname;
  });
  
  // E ricordarti di fare unsubscribe
  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1>{currentPath}</h1>
```

**Con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (automatico e reattivo):**
```svelte
<script>
  import { page } from '$app/stores';
  
  // Il $ fa tutto automaticamente!
  // - Subscribe all'inizio
  // - Aggiorna quando cambia
  // - Unsubscribe quando componente viene distrutto
</script>

<h1>{$page.url.pathname}</h1>
```

### $app/stores

```svelte
<script>
  import { page, navigating, updated } from '$app/stores';
  
  // ✅ $page - Informazioni sulla pagina corrente
  // $page.url - URL corrente (oggetto URL)
  // $page.params - Parametri route dinamici
  // $page.route.id - Route ID (es: "/blog/[slug]")
  // $page.status - Status code HTTP
  // $page.error - Oggetto errore se presente
  // $page.data - Dati dalle load functions
  // $page.form - Risultato form action
  // $page.state - Navigation state
  
  // ✅ $navigating - Stato navigazione (null se non stai navigando)
  // $navigating.from - Pagina di provenienza
  // $navigating.to - Pagina di destinazione
  // $navigating.type - Tipo: 'link', 'popstate', 'goto'
  // $navigating.willUnload - True se pagina verrà scaricata
  // $navigating.delta - +1 forward, -1 backward
  // $navigating.complete - Promise che si risolve quando navigazione completa
  
  // ✅ $updated - True se nuova versione app disponibile
</script>

<!-- Esempi pratici -->

<!-- 1. Mostra URL corrente -->
<h1>Current path: {$page.url.pathname}</h1>
<p>Full URL: {$page.url.href}</p>
<p>Query params: {$page.url.searchParams.get('q')}</p>

<!-- 2. Accedi ai parametri dinamici -->
{#if $page.params.slug}
  <p>Stai visualizzando: {$page.params.slug}</p>
{/if}

<!-- 3. Loading spinner durante navigazione -->
{#if $navigating}
  <div class="loading-bar">
    Navigating to {$navigating.to.url.pathname}...
  </div>
{/if}

<!-- 4. Notifica aggiornamento app -->
{#if $updated}
  <div class="update-banner">
    <p>New version available!</p>
    <button on:click={() => location.reload()}>
      Update now
    </button>
  </div>
{/if}

<!-- 5. Evidenzia link attivo -->
<nav>
  <a 
    href="/home" 
    class:active={$page.url.pathname === '/home'}
  >
    Home
  </a>
  <a 
    href="/about" 
    class:active={$page.url.pathname === '/about'}
  >
    About
  </a>
</nav>

<!-- 6. Mostra dati dalla load function -->
<p>User: {$page.data.user?.name}</p>

<!-- 7. Mostra risultato form -->
{#if $page.form?.error}
  <p class="error">{$page.form.error}</p>
{/if}
```

### Esempi Avanzati con Stores

**Progress bar durante navigazione:**
```svelte
<script>
  import { navigating } from '$app/stores';
  import { tweened } from 'svelte/motion';
  
  const progress = tweened(0);
  
  $: if ($navigating) {
    progress.set(0.3); // Inizia al 30%
    $navigating.complete.then(() => {
      progress.set(1); // Completa al 100%
      setTimeout(() => progress.set(0), 500); // Reset
    });
  }
</script>

{#if $progress > 0}
  <div class="progress-bar" style="width: {$progress * 100}%"></div>
{/if}
```

**Breadcrumb dinamico:**
```svelte
<script>
  import { page } from '$app/stores';
  
  $: segments = $page.url.pathname.split('/').filter(Boolean);
</script>

<nav class="breadcrumb">
  <a href="/">Home</a>
  {#each segments as segment, i}
    / 
    <a href="/{segments.slice(0, i + 1).join('/')}">
      {segment}
    </a>
  {/each}
</nav>
```

---

## 🪝 Hooks

### Server Hooks (src/hooks.server.ts)

```typescript
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

// handle - Intercetta ogni richiesta
export const handle: Handle = async ({ event, resolve }) => {
  // Autenticazione
  const session = event.cookies.get('session');
  event.locals.user = await getUser(session);
  
  // Resolve
  const response = await resolve(event);
  
  // Modifica response
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
};

// handleFetch - Modifica fetch requests
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  if (request.url.startsWith('https://api.example.com/')) {
    request.headers.set('Authorization', `Bearer ${API_KEY}`);
  }
  
  return fetch(request);
};

// handleError - Gestione errori
export const handleError: HandleServerError = async ({ error, event }) => {
  console.error(error);
  
  return {
    message: 'Ops! Qualcosa è andato storto'
  };
};
```

### Sequence Multiple Hooks

```typescript
import { sequence } from '@sveltejs/kit/hooks';

const auth = async ({ event, resolve }) => {
  // Auth logic
  return resolve(event);
};

const logging = async ({ event, resolve }) => {
  console.log('Request:', event.url.pathname);
  return resolve(event);
};

export const handle = sequence(auth, logging);
```

---

 e ha uno scopo specifico.

### 🔹 `$state` - Stato Reattivo Mutabile

**`$state`** dichiara che una variabile **cambierà nel tempo** e Svelte deve monitorarla per aggiornare il DOM.

```svelte
<script>
  // ✅ Dichiara che 'count' è reattivo e può cambiare
  let count = $state(0);
  
  // ✅ Oggetti e array sono anche reattivi (deep reactivity)
  let user = $state({
    name: 'Mario',
    age: 25
  });
  
  let items = $state(['Apple', 'Banana']);
  
  function increment() {
    count++; // Svelte rileva il cambiamento e aggiorna il DOM
  }
  
  function updateUser() {
    user.age++; // Anche le proprietà nested sono reattive!
  }
  
  function addItem() {
    items.push('Orange'); // Array methods funzionano!
  }
</script>

<button onclick={increment}>
  Count: {count}
</button>

<button onclick={updateUser}>
  {user.name} is {user.age} years old
</button>

<button onclick={addItem}>
  Add Item (Total: {items.length})
</button>

<ul>
  {#each items as item}
    <li>{item}</li>
  {/each}
</ul>
```

**⚠️ Nota importante:**
```svelte
<script>
  // ❌ SBAGLIATO - Non reattivo (normale variabile JavaScript)
  let count = 0;
  
  // ✅ GIUSTO - Reattivo con $state
  let count = $state(0);
</script>
```

---

### 🔹 `$derived` - Valori Calcolati Automaticamente

**`$derived`** crea una variabile che **si ricalcola automaticamente** quando le sue dipendenze cambiano.

```svelte
<script>
  let count = $state(0);
  
  // ✅ doubled si aggiorna AUTOMATICAMENTE quando count cambia
  let doubled = $derived(count * 2);
  
  // ✅ Può dipendere da più variabili
  let price = $state(100);
  let quantity = $state(2);
  let total = $derived(price * quantity);
  
  // ✅ Può contenere logica complessa
  let discount = $derived(
    total > 500 ? total * 0.1 : 0
  );
  
  let finalPrice = $derived(total - discount);
  
  // ✅ Può essere usato per condizioni
  let isExpensive = $derived(finalPrice > 200);
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>

<button onclick={() => count++}>Increment</button>

<hr>

<input type="number" bind:value={price} />
<input type="number" bind:value={quantity} />

<p>Total: €{total}</p>
<p>Discount: €{discount}</p>
<p>Final Price: €{finalPrice}</p>

{#if isExpensive}
  <p class="warning">⚠️ This is expensive!</p>
{/if}
```

**Differenza tra `$state` e `$derived`:**
```svelte
<script>
  let x = $state(5);
  
  // ❌ SBAGLIATO - Non si aggiorna quando x cambia
  let y = x * 2; // Calcolato una volta sola
  
  // ✅ GIUSTO - Si aggiorna automaticamente
  let y = $derived(x * 2);
</script>
```

---

### 🔹 `$effect` - Esegui Codice Quando Cambia Qualcosa

**`$effect`** esegue del codice **ogni volta che le sue dipendenze cambiano**.

```svelte
<script>
  let count = $state(0);
  let name = $state('Mario');
  
  // ✅ Si esegue ogni volta che 'count' cambia
  $effect(() => {
    console.log(`Count è ora: ${count}`);
    
    // Esempio: Salva in localStorage
    localStorage.setItem('count', count.toString());
  });
  
  // ✅ Si esegue quando 'count' O 'name' cambiano
  $effect(() => {
    document.title = `${name} - Count: ${count}`;
  });
  
  // ✅ Cleanup function (eseguita prima del prossimo effect)
  $effect(() => {
    console.log('Setting up timer...');
    
    const interval = setInterval(() => {
      console.log('Tick!');
    }, 1000);
    
    // 🧹 Cleanup - eseguito quando:
    // - Il componente viene distrutto
    // - Prima che l'effect venga ri-eseguito
    return () => {
      console.log('Cleaning up timer...');
      clearInterval(interval);
    };
  });
  
  // ✅ Effect con dipendenze specifiche
  $effect(() => {
    if (count > 10) {
      alert('Count is over 10!');
    }
  });
</script>

<input bind:value={name} />
<button onclick={() => count++}>
  Count: {count}
</button>
```

**Casi d'uso comuni per `$effect`:**
- 💾 Salvare dati in localStorage/sessionStorage
- 📡 Chiamate API quando cambia un filtro
- 📊 Aggiornare grafici/librerie esterne
- 🔔 Notifiche o analytics
- ⏱️ Timer e interval

---

### 🔹 `$props` - Passare Dati da Padre a Figlio

**`$props`** definisce le **proprietà che un componente può ricevere** dal componente padre.

```svelte
<!-- Child.svelte -->
<script>
  // ✅ Dichiara le props che questo componente accetta
  let { 
    name,           // Richiesta (obbligatoria)
    age = 18,       // Opzionale con default
    premium = false // Opzionale con default
  } = $props();
  
  // ✅ Le props sono reattive!
  // Quando il padre cambia 'name', si aggiorna automaticamente qui
</script>

<div class="user-card">
  <h2>{name}</h2>
  <p>Age: {age}</p>
  {#if premium}
    <span class="badge">⭐ Premium</span>
  {/if}
</div>

<style>
  .badge { color: gold; }
</style>
```

**Uso dal componente padre:**
```svelte
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';
  
  let userName = $state('Mario');
  let userAge = $state(25);
</script>

<!-- ✅ Passa i dati al componente figlio -->
<Child name={userName} age={userAge} premium={true} />

<button onclick={() => userName = 'Luigi'}>
  Change Name
</button>
```

**Props con TypeScript:**
```svelte
<!-- Child.svelte -->
<script lang="ts">
  interface Props {
    name: string;
    age?: number;
    premium?: boolean;
    onUpdate?: (value: string) => void;
  }
  
  let { 
    name, 
    age = 18, 
    premium = false,
    onUpdate
  }: Props = $props();
</script>
```

---

### 🔹 `$bindable` - Collegamento Bidirezionale Padre ↔ Figlio

**`$bindable`** crea un **collegamento costante** tra una variabile del padre e del figlio. Quando una cambia, cambia anche l'altra!

```svelte
<!-- Input.svelte (componente figlio) -->
<script>
  // ✅ Questa prop può essere modificata dal figlio
  // E il padre vedrà automaticamente i cambiamenti!
  let { value = $bindable('') } = $props();
</script>

<input 
  type="text" 
  bind:value={value}
  placeholder="Type here..."
/>
```

**Uso dal componente padre:**
```svelte
<!-- Parent.svelte -->
<script>
  import Input from './Input.svelte';
  
  let text = $state('');
  
  $effect(() => {
    console.log('Text changed to:', text);
  });
</script>

<!-- ✅ Usa bind: per collegamento bidirezionale -->
<Input bind:value={text} />

<p>You typed: {text}</p>
<p>Length: {text.length}</p>

<button onclick={() => text = ''}>Clear</button>
```

**Come funziona:**
1. L'utente digita nell'input del componente figlio
2. `value` nel figlio cambia
3. `text` nel padre cambia AUTOMATICAMENTE ✨
4. Il `<p>You typed: {text}</p>` si aggiorna

**Esempio avanzato - Counter personalizzato:**
```svelte
<!-- Counter.svelte -->
<script>
  let { count = $bindable(0) } = $props();
</script>

<div class="counter">
  <button onclick={() => count--}>-</button>
  <span>{count}</span>
  <button onclick={() => count++}>+</button>
</div>
```

```svelte
<!-- App.svelte -->
<script>
  import Counter from './Counter.svelte';
  
  let myCount = $state(0);
  
  // ✅ myCount si aggiorna quando clicchi i bottoni nel Counter!
  $effect(() => {
    if (myCount >= 10) {
      alert('You reached 10!');
    }
  });
</script>

<Counter bind:count={myCount} />
<p>Main count: {myCount}</p>
```

---

### 🔹 `$inspect` - Debug: Vedi Quando Una Variabile Cambia

**`$inspect`** è uno strumento di **debugging** che logga automaticamente quando una variabile cambia.

```svelte
<script>
  let count = $state(0);
  let user = $state({ name: 'Mario', age: 25 });
  
  // ✅ Logga nella console ogni volta che count cambia
  $inspect(count);
  
  // ✅ Puoi ispezionare più variabili insieme
  $inspect(count, user);
  
  // ✅ Con un label per identificare facilmente
  $inspect('User object:', user);
  
  // ✅ Ispeziona valori derivati
  let doubled = $derived(count * 2);
  $inspect('Doubled value:', doubled);
</script>

<button onclick={() => count++}>
  Increment (check console!)
</button>

<button onclick={() => user.age++}>
  Birthday
</button>
```

**Output nella console:**
```
count: 0
count: 1
count: 2
User object: { name: 'Mario', age: 25 }
User object: { name: 'Mario', age: 26 }
Doubled value: 4
```

**Quando usare `$inspect`:**
- 🐛 Debug di problemi di reattività
- 🔍 Vedere quando e come cambiano i valori
- 📊 Monitorare il flusso dei dati
- ✅ Verificare che gli effect si attivino correttamente

---

### 📊 Riepilogo Completo delle Runes

| Rune | Scopo | Esempio |
|------|-------|---------|
| `$state` | Variabile reattiva che può cambiare | `let count = $state(0)` |
| `$derived` | Valore calcolato automaticamente | `let doubled = $derived(count * 2)` |
| `$effect` | Esegui codice quando qualcosa cambia | `$effect(() => console.log(count))` |
| `$props` | Ricevi dati dal componente padre | `let { name } = $props()` |
| `$bindable` | Collegamento bidirezionale padre↔figlio | `let { value = $bindable() } = $props()` |
| `$inspect` | Debug: vedi quando una variabile cambia | `$inspect(count)` |

### Esempio Completo - Tutto Insieme

```svelte
<!-- TodoItem.svelte -->
<script>
  // Props dal padre
  let { 
    todo,
    onDelete = $bindable() 
  } = $props();
  
  // State locale
  let isEditing = $state(false);
  let editText = $state(todo.text);
  
  // Derived
  let isCompleted = $derived(todo.done);
  let textLength = $derived(editText.length);
  
  // Effect
  $effect(() => {
    console.log(`Todo "${todo.text}" is ${isCompleted ? 'done' : 'pending'}`);
  });
  
  // Debug
  $inspect('Todo state:', todo);
</script>

<div class="todo" class:completed={isCompleted}>
  {#if isEditing}
    <input bind:value={editText} />
    <span>({textLength} chars)</span>
    <button onclick={() => isEditing = false}>Save</button>
  {:else}
    <span>{todo.text}</span>
    <button onclick={() => isEditing = true}>Edit</button>
  {/if}
  
  <button onclick={onDelete}>Delete</button>
</div>
```

### 📦 Svelte Stores - State Management Globale

Gli **Stores** sono un sistema per gestire **stato condiviso** tra più componenti. A differenza di `$state` che è locale al componente, gli stores sono **globali** e accessibili ovunque.

#### 🔹 **writable** - Store Scrivibile

Il tipo di store più comune. Può essere letto e modificato da qualsiasi componente.

```typescript
// src/lib/stores/counter.ts
import { writable } from 'svelte/store';

// ✅ Crea uno store con valore iniziale
export const count = writable(0);

// ✅ Store con oggetto
export const user = writable({
  name: '',
  email: '',
  isLoggedIn: false
});

// ✅ Store con array
export const todos = writable([]);
```

**Metodi disponibili:**
- **`subscribe(callback)`** - Ascolta i cambiamenti
- **`set(value)`** - Imposta un nuovo valore
- **`update(callback)`** - Aggiorna basandosi sul valore corrente

```svelte
<!-- Component.svelte -->
<script>
  import { count } from '$lib/stores/counter';
  
  // ✅ Auto-subscribe con $
  // Svelte gestisce automaticamente subscribe/unsubscribe
</script>

<p>Count: {$count}</p>

<!-- Modifica lo store -->
<button onclick={() => count.set(0)}>
  Reset
</button>

<button onclick={() => count.update(n => n + 1)}>
  Increment
</button>

<button onclick={() => count.update(n => n - 1)}>
  Decrement
</button>
```

**Uso manuale (senza `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### 💡 L'Alias `$lib` - Importazioni Semplici

**`$lib`** è un **alias speciale** che punta sempre a `src/lib/`, indipendentemente da dove ti trovi nel progetto.

**Senza `$lib` (percorsi relativi complicati):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '../../../lib/components/Button.svelte';
import { formatDate } from '../../../lib/utils/date.js';
import { user } from '../../../lib/stores/user.js';

// 😵 Difficile da mantenere, facile sbagliare
```

**Con `$lib` (sempre uguale, ovunque sei):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '$lib/components/Button.svelte';
import { formatDate } from '$lib/utils/date';
import { user } from '$lib/stores/user';

// ✅ Sempre lo stesso path, facile da ricordare!
```

**Struttura tipica di `$lib`:**
```
src/lib/
├── components/               # Componenti riutilizzabili
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── Modal.svelte
│   └── forms/
│       ├── Input.svelte
│       └── Select.svelte
│
├── server/                   # ⚠️ Codice SOLO server (non esposto al client)
│   ├── database.ts          # DB connection
│   ├── auth.ts              # Auth logic
│   └── email.ts             # Email service
│
├── stores/                   # Svelte stores globali
│   ├── user.ts
│   ├── cart.ts
│   └── theme.ts
│
├── utils/                    # Utility functions
│   ├── date.ts
│   ├── format.ts
│   └── validators.ts
│
├── types/                    # TypeScript types condivisi
│   └── index.ts
│
└── index.ts                  # Esporta componenti pubblici
```

**Esempi pratici:**

```typescript
// src/lib/components/Button.svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button class={variant} {disabled}>
  <slot />
</button>

// src/lib/index.ts - Esporta per uso esterno
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';

// Ora puoi importare così:
// import { Button, Card } from '$lib';
```

```typescript
// src/lib/stores/user.ts
import { writable } from 'svelte/store';

export const user = writable(null);
export const isLoggedIn = derived(user, $user => $user !== null);

// Usa ovunque con:
// import { user, isLoggedIn } from '$lib/stores/user';
```

```typescript
// src/lib/utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('it-IT').format(date);
}

// Usa con:
// import { formatDate } from '$lib/utils/date';
```

**⚠️ IMPORTANTE - `$lib/server`:**

Il codice in `src/lib/server/` è **accessibile SOLO dal server**. Vite lo esclude automaticamente dal bundle client.

```typescript
// ✅ OK - Importa in +page.server.ts
import { db } from '$lib/server/database';

// ❌ ERRORE - Non puoi importare in +page.svelte
import { db } from '$lib/server/database'; // Build error!
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database'; // ✅ Solo qui!

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot /> <!-- Pagina child renderizzata qui -->
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

## 🏪 Stores di SvelteKit

### 💡 Il Simbolo `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 - Auto-subscription

In Svelte, il simbolo **`# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

** davanti a una variabile indica che è uno **store** e vogliamo:
1. **Auto-subscribe** → Svelte si iscrive automaticamente allo store
2. **Auto-unsubscribe** → Svelte rimuove l'iscrizione quando il componente viene distrutto
3. **Reattività automatica** → Il DOM si aggiorna quando lo store cambia

**Senza `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (manuale):**
```svelte
<script>
  import { page } from '$app/stores';
  
  let currentPath;
  
  // Devi fare subscribe manualmente
  const unsubscribe = page.subscribe(value => {
    currentPath = value.url.pathname;
  });
  
  // E ricordarti di fare unsubscribe
  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1>{currentPath}</h1>
```

**Con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (automatico e reattivo):**
```svelte
<script>
  import { page } from '$app/stores';
  
  // Il $ fa tutto automaticamente!
  // - Subscribe all'inizio
  // - Aggiorna quando cambia
  // - Unsubscribe quando componente viene distrutto
</script>

<h1>{$page.url.pathname}</h1>
```

### $app/stores

```svelte
<script>
  import { page, navigating, updated } from '$app/stores';
  
  // ✅ $page - Informazioni sulla pagina corrente
  // $page.url - URL corrente (oggetto URL)
  // $page.params - Parametri route dinamici
  // $page.route.id - Route ID (es: "/blog/[slug]")
  // $page.status - Status code HTTP
  // $page.error - Oggetto errore se presente
  // $page.data - Dati dalle load functions
  // $page.form - Risultato form action
  // $page.state - Navigation state
  
  // ✅ $navigating - Stato navigazione (null se non stai navigando)
  // $navigating.from - Pagina di provenienza
  // $navigating.to - Pagina di destinazione
  // $navigating.type - Tipo: 'link', 'popstate', 'goto'
  // $navigating.willUnload - True se pagina verrà scaricata
  // $navigating.delta - +1 forward, -1 backward
  // $navigating.complete - Promise che si risolve quando navigazione completa
  
  // ✅ $updated - True se nuova versione app disponibile
</script>

<!-- Esempi pratici -->

<!-- 1. Mostra URL corrente -->
<h1>Current path: {$page.url.pathname}</h1>
<p>Full URL: {$page.url.href}</p>
<p>Query params: {$page.url.searchParams.get('q')}</p>

<!-- 2. Accedi ai parametri dinamici -->
{#if $page.params.slug}
  <p>Stai visualizzando: {$page.params.slug}</p>
{/if}

<!-- 3. Loading spinner durante navigazione -->
{#if $navigating}
  <div class="loading-bar">
    Navigating to {$navigating.to.url.pathname}...
  </div>
{/if}

<!-- 4. Notifica aggiornamento app -->
{#if $updated}
  <div class="update-banner">
    <p>New version available!</p>
    <button on:click={() => location.reload()}>
      Update now
    </button>
  </div>
{/if}

<!-- 5. Evidenzia link attivo -->
<nav>
  <a 
    href="/home" 
    class:active={$page.url.pathname === '/home'}
  >
    Home
  </a>
  <a 
    href="/about" 
    class:active={$page.url.pathname === '/about'}
  >
    About
  </a>
</nav>

<!-- 6. Mostra dati dalla load function -->
<p>User: {$page.data.user?.name}</p>

<!-- 7. Mostra risultato form -->
{#if $page.form?.error}
  <p class="error">{$page.form.error}</p>
{/if}
```

### Esempi Avanzati con Stores

**Progress bar durante navigazione:**
```svelte
<script>
  import { navigating } from '$app/stores';
  import { tweened } from 'svelte/motion';
  
  const progress = tweened(0);
  
  $: if ($navigating) {
    progress.set(0.3); // Inizia al 30%
    $navigating.complete.then(() => {
      progress.set(1); // Completa al 100%
      setTimeout(() => progress.set(0), 500); // Reset
    });
  }
</script>

{#if $progress > 0}
  <div class="progress-bar" style="width: {$progress * 100}%"></div>
{/if}
```

**Breadcrumb dinamico:**
```svelte
<script>
  import { page } from '$app/stores';
  
  $: segments = $page.url.pathname.split('/').filter(Boolean);
</script>

<nav class="breadcrumb">
  <a href="/">Home</a>
  {#each segments as segment, i}
    / 
    <a href="/{segments.slice(0, i + 1).join('/')}">
      {segment}
    </a>
  {/each}
</nav>
```

---

## 🪝 Hooks

### Server Hooks (src/hooks.server.ts)

```typescript
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

// handle - Intercetta ogni richiesta
export const handle: Handle = async ({ event, resolve }) => {
  // Autenticazione
  const session = event.cookies.get('session');
  event.locals.user = await getUser(session);
  
  // Resolve
  const response = await resolve(event);
  
  // Modifica response
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
};

// handleFetch - Modifica fetch requests
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  if (request.url.startsWith('https://api.example.com/')) {
    request.headers.set('Authorization', `Bearer ${API_KEY}`);
  }
  
  return fetch(request);
};

// handleError - Gestione errori
export const handleError: HandleServerError = async ({ error, event }) => {
  console.error(error);
  
  return {
    message: 'Ops! Qualcosa è andato storto'
  };
};
```

### Sequence Multiple Hooks

```typescript
import { sequence } from '@sveltejs/kit/hooks';

const auth = async ({ event, resolve }) => {
  // Auth logic
  return resolve(event);
};

const logging = async ({ event, resolve }) => {
  console.log('Request:', event.url.pathname);
  return resolve(event);
};

export const handle = sequence(auth, logging);
```

---

## 🎯 State Management - Svelte 5 Runes

Le **Runes** sono il nuovo sistema di reattività di Svelte 5. Ogni rune inizia con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### 💡 L'Alias `$lib` - Importazioni Semplici

**`$lib`** è un **alias speciale** che punta sempre a `src/lib/`, indipendentemente da dove ti trovi nel progetto.

**Senza `$lib` (percorsi relativi complicati):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '../../../lib/components/Button.svelte';
import { formatDate } from '../../../lib/utils/date.js';
import { user } from '../../../lib/stores/user.js';

// 😵 Difficile da mantenere, facile sbagliare
```

**Con `$lib` (sempre uguale, ovunque sei):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '$lib/components/Button.svelte';
import { formatDate } from '$lib/utils/date';
import { user } from '$lib/stores/user';

// ✅ Sempre lo stesso path, facile da ricordare!
```

**Struttura tipica di `$lib`:**
```
src/lib/
├── components/               # Componenti riutilizzabili
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── Modal.svelte
│   └── forms/
│       ├── Input.svelte
│       └── Select.svelte
│
├── server/                   # ⚠️ Codice SOLO server (non esposto al client)
│   ├── database.ts          # DB connection
│   ├── auth.ts              # Auth logic
│   └── email.ts             # Email service
│
├── stores/                   # Svelte stores globali
│   ├── user.ts
│   ├── cart.ts
│   └── theme.ts
│
├── utils/                    # Utility functions
│   ├── date.ts
│   ├── format.ts
│   └── validators.ts
│
├── types/                    # TypeScript types condivisi
│   └── index.ts
│
└── index.ts                  # Esporta componenti pubblici
```

**Esempi pratici:**

```typescript
// src/lib/components/Button.svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button class={variant} {disabled}>
  <slot />
</button>

// src/lib/index.ts - Esporta per uso esterno
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';

// Ora puoi importare così:
// import { Button, Card } from '$lib';
```

```typescript
// src/lib/stores/user.ts
import { writable } from 'svelte/store';

export const user = writable(null);
export const isLoggedIn = derived(user, $user => $user !== null);

// Usa ovunque con:
// import { user, isLoggedIn } from '$lib/stores/user';
```

```typescript
// src/lib/utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('it-IT').format(date);
}

// Usa con:
// import { formatDate } from '$lib/utils/date';
```

**⚠️ IMPORTANTE - `$lib/server`:**

Il codice in `src/lib/server/` è **accessibile SOLO dal server**. Vite lo esclude automaticamente dal bundle client.

```typescript
// ✅ OK - Importa in +page.server.ts
import { db } from '$lib/server/database';

// ❌ ERRORE - Non puoi importare in +page.svelte
import { db } from '$lib/server/database'; // Build error!
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database'; // ✅ Solo qui!

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot /> <!-- Pagina child renderizzata qui -->
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

## 🏪 Stores di SvelteKit

### 💡 Il Simbolo `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 - Auto-subscription

In Svelte, il simbolo **`# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

** davanti a una variabile indica che è uno **store** e vogliamo:
1. **Auto-subscribe** → Svelte si iscrive automaticamente allo store
2. **Auto-unsubscribe** → Svelte rimuove l'iscrizione quando il componente viene distrutto
3. **Reattività automatica** → Il DOM si aggiorna quando lo store cambia

**Senza `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (manuale):**
```svelte
<script>
  import { page } from '$app/stores';
  
  let currentPath;
  
  // Devi fare subscribe manualmente
  const unsubscribe = page.subscribe(value => {
    currentPath = value.url.pathname;
  });
  
  // E ricordarti di fare unsubscribe
  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1>{currentPath}</h1>
```

**Con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (automatico e reattivo):**
```svelte
<script>
  import { page } from '$app/stores';
  
  // Il $ fa tutto automaticamente!
  // - Subscribe all'inizio
  // - Aggiorna quando cambia
  // - Unsubscribe quando componente viene distrutto
</script>

<h1>{$page.url.pathname}</h1>
```

### $app/stores

```svelte
<script>
  import { page, navigating, updated } from '$app/stores';
  
  // ✅ $page - Informazioni sulla pagina corrente
  // $page.url - URL corrente (oggetto URL)
  // $page.params - Parametri route dinamici
  // $page.route.id - Route ID (es: "/blog/[slug]")
  // $page.status - Status code HTTP
  // $page.error - Oggetto errore se presente
  // $page.data - Dati dalle load functions
  // $page.form - Risultato form action
  // $page.state - Navigation state
  
  // ✅ $navigating - Stato navigazione (null se non stai navigando)
  // $navigating.from - Pagina di provenienza
  // $navigating.to - Pagina di destinazione
  // $navigating.type - Tipo: 'link', 'popstate', 'goto'
  // $navigating.willUnload - True se pagina verrà scaricata
  // $navigating.delta - +1 forward, -1 backward
  // $navigating.complete - Promise che si risolve quando navigazione completa
  
  // ✅ $updated - True se nuova versione app disponibile
</script>

<!-- Esempi pratici -->

<!-- 1. Mostra URL corrente -->
<h1>Current path: {$page.url.pathname}</h1>
<p>Full URL: {$page.url.href}</p>
<p>Query params: {$page.url.searchParams.get('q')}</p>

<!-- 2. Accedi ai parametri dinamici -->
{#if $page.params.slug}
  <p>Stai visualizzando: {$page.params.slug}</p>
{/if}

<!-- 3. Loading spinner durante navigazione -->
{#if $navigating}
  <div class="loading-bar">
    Navigating to {$navigating.to.url.pathname}...
  </div>
{/if}

<!-- 4. Notifica aggiornamento app -->
{#if $updated}
  <div class="update-banner">
    <p>New version available!</p>
    <button on:click={() => location.reload()}>
      Update now
    </button>
  </div>
{/if}

<!-- 5. Evidenzia link attivo -->
<nav>
  <a 
    href="/home" 
    class:active={$page.url.pathname === '/home'}
  >
    Home
  </a>
  <a 
    href="/about" 
    class:active={$page.url.pathname === '/about'}
  >
    About
  </a>
</nav>

<!-- 6. Mostra dati dalla load function -->
<p>User: {$page.data.user?.name}</p>

<!-- 7. Mostra risultato form -->
{#if $page.form?.error}
  <p class="error">{$page.form.error}</p>
{/if}
```

### Esempi Avanzati con Stores

**Progress bar durante navigazione:**
```svelte
<script>
  import { navigating } from '$app/stores';
  import { tweened } from 'svelte/motion';
  
  const progress = tweened(0);
  
  $: if ($navigating) {
    progress.set(0.3); // Inizia al 30%
    $navigating.complete.then(() => {
      progress.set(1); // Completa al 100%
      setTimeout(() => progress.set(0), 500); // Reset
    });
  }
</script>

{#if $progress > 0}
  <div class="progress-bar" style="width: {$progress * 100}%"></div>
{/if}
```

**Breadcrumb dinamico:**
```svelte
<script>
  import { page } from '$app/stores';
  
  $: segments = $page.url.pathname.split('/').filter(Boolean);
</script>

<nav class="breadcrumb">
  <a href="/">Home</a>
  {#each segments as segment, i}
    / 
    <a href="/{segments.slice(0, i + 1).join('/')}">
      {segment}
    </a>
  {/each}
</nav>
```

---

## 🪝 Hooks

### Server Hooks (src/hooks.server.ts)

```typescript
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

// handle - Intercetta ogni richiesta
export const handle: Handle = async ({ event, resolve }) => {
  // Autenticazione
  const session = event.cookies.get('session');
  event.locals.user = await getUser(session);
  
  // Resolve
  const response = await resolve(event);
  
  // Modifica response
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
};

// handleFetch - Modifica fetch requests
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  if (request.url.startsWith('https://api.example.com/')) {
    request.headers.set('Authorization', `Bearer ${API_KEY}`);
  }
  
  return fetch(request);
};

// handleError - Gestione errori
export const handleError: HandleServerError = async ({ error, event }) => {
  console.error(error);
  
  return {
    message: 'Ops! Qualcosa è andato storto'
  };
};
```

### Sequence Multiple Hooks

```typescript
import { sequence } from '@sveltejs/kit/hooks';

const auth = async ({ event, resolve }) => {
  // Auth logic
  return resolve(event);
};

const logging = async ({ event, resolve }) => {
  console.log('Request:', event.url.pathname);
  return resolve(event);
};

export const handle = sequence(auth, logging);
```

---

 e ha uno scopo specifico.

### 🔹 `$state` - Stato Reattivo Mutabile

**`$state`** dichiara che una variabile **cambierà nel tempo** e Svelte deve monitorarla per aggiornare il DOM.

```svelte
<script>
  // ✅ Dichiara che 'count' è reattivo e può cambiare
  let count = $state(0);
  
  // ✅ Oggetti e array sono anche reattivi (deep reactivity)
  let user = $state({
    name: 'Mario',
    age: 25
  });
  
  let items = $state(['Apple', 'Banana']);
  
  function increment() {
    count++; // Svelte rileva il cambiamento e aggiorna il DOM
  }
  
  function updateUser() {
    user.age++; // Anche le proprietà nested sono reattive!
  }
  
  function addItem() {
    items.push('Orange'); // Array methods funzionano!
  }
</script>

<button onclick={increment}>
  Count: {count}
</button>

<button onclick={updateUser}>
  {user.name} is {user.age} years old
</button>

<button onclick={addItem}>
  Add Item (Total: {items.length})
</button>

<ul>
  {#each items as item}
    <li>{item}</li>
  {/each}
</ul>
```

**⚠️ Nota importante:**
```svelte
<script>
  // ❌ SBAGLIATO - Non reattivo (normale variabile JavaScript)
  let count = 0;
  
  // ✅ GIUSTO - Reattivo con $state
  let count = $state(0);
</script>
```

---

### 🔹 `$derived` - Valori Calcolati Automaticamente

**`$derived`** crea una variabile che **si ricalcola automaticamente** quando le sue dipendenze cambiano.

```svelte
<script>
  let count = $state(0);
  
  // ✅ doubled si aggiorna AUTOMATICAMENTE quando count cambia
  let doubled = $derived(count * 2);
  
  // ✅ Può dipendere da più variabili
  let price = $state(100);
  let quantity = $state(2);
  let total = $derived(price * quantity);
  
  // ✅ Può contenere logica complessa
  let discount = $derived(
    total > 500 ? total * 0.1 : 0
  );
  
  let finalPrice = $derived(total - discount);
  
  // ✅ Può essere usato per condizioni
  let isExpensive = $derived(finalPrice > 200);
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>

<button onclick={() => count++}>Increment</button>

<hr>

<input type="number" bind:value={price} />
<input type="number" bind:value={quantity} />

<p>Total: €{total}</p>
<p>Discount: €{discount}</p>
<p>Final Price: €{finalPrice}</p>

{#if isExpensive}
  <p class="warning">⚠️ This is expensive!</p>
{/if}
```

**Differenza tra `$state` e `$derived`:**
```svelte
<script>
  let x = $state(5);
  
  // ❌ SBAGLIATO - Non si aggiorna quando x cambia
  let y = x * 2; // Calcolato una volta sola
  
  // ✅ GIUSTO - Si aggiorna automaticamente
  let y = $derived(x * 2);
</script>
```

---

### 🔹 `$effect` - Esegui Codice Quando Cambia Qualcosa

**`$effect`** esegue del codice **ogni volta che le sue dipendenze cambiano**.

```svelte
<script>
  let count = $state(0);
  let name = $state('Mario');
  
  // ✅ Si esegue ogni volta che 'count' cambia
  $effect(() => {
    console.log(`Count è ora: ${count}`);
    
    // Esempio: Salva in localStorage
    localStorage.setItem('count', count.toString());
  });
  
  // ✅ Si esegue quando 'count' O 'name' cambiano
  $effect(() => {
    document.title = `${name} - Count: ${count}`;
  });
  
  // ✅ Cleanup function (eseguita prima del prossimo effect)
  $effect(() => {
    console.log('Setting up timer...');
    
    const interval = setInterval(() => {
      console.log('Tick!');
    }, 1000);
    
    // 🧹 Cleanup - eseguito quando:
    // - Il componente viene distrutto
    // - Prima che l'effect venga ri-eseguito
    return () => {
      console.log('Cleaning up timer...');
      clearInterval(interval);
    };
  });
  
  // ✅ Effect con dipendenze specifiche
  $effect(() => {
    if (count > 10) {
      alert('Count is over 10!');
    }
  });
</script>

<input bind:value={name} />
<button onclick={() => count++}>
  Count: {count}
</button>
```

**Casi d'uso comuni per `$effect`:**
- 💾 Salvare dati in localStorage/sessionStorage
- 📡 Chiamate API quando cambia un filtro
- 📊 Aggiornare grafici/librerie esterne
- 🔔 Notifiche o analytics
- ⏱️ Timer e interval

---

### 🔹 `$props` - Passare Dati da Padre a Figlio

**`$props`** definisce le **proprietà che un componente può ricevere** dal componente padre.

```svelte
<!-- Child.svelte -->
<script>
  // ✅ Dichiara le props che questo componente accetta
  let { 
    name,           // Richiesta (obbligatoria)
    age = 18,       // Opzionale con default
    premium = false // Opzionale con default
  } = $props();
  
  // ✅ Le props sono reattive!
  // Quando il padre cambia 'name', si aggiorna automaticamente qui
</script>

<div class="user-card">
  <h2>{name}</h2>
  <p>Age: {age}</p>
  {#if premium}
    <span class="badge">⭐ Premium</span>
  {/if}
</div>

<style>
  .badge { color: gold; }
</style>
```

**Uso dal componente padre:**
```svelte
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';
  
  let userName = $state('Mario');
  let userAge = $state(25);
</script>

<!-- ✅ Passa i dati al componente figlio -->
<Child name={userName} age={userAge} premium={true} />

<button onclick={() => userName = 'Luigi'}>
  Change Name
</button>
```

**Props con TypeScript:**
```svelte
<!-- Child.svelte -->
<script lang="ts">
  interface Props {
    name: string;
    age?: number;
    premium?: boolean;
    onUpdate?: (value: string) => void;
  }
  
  let { 
    name, 
    age = 18, 
    premium = false,
    onUpdate
  }: Props = $props();
</script>
```

---

### 🔹 `$bindable` - Collegamento Bidirezionale Padre ↔ Figlio

**`$bindable`** crea un **collegamento costante** tra una variabile del padre e del figlio. Quando una cambia, cambia anche l'altra!

```svelte
<!-- Input.svelte (componente figlio) -->
<script>
  // ✅ Questa prop può essere modificata dal figlio
  // E il padre vedrà automaticamente i cambiamenti!
  let { value = $bindable('') } = $props();
</script>

<input 
  type="text" 
  bind:value={value}
  placeholder="Type here..."
/>
```

**Uso dal componente padre:**
```svelte
<!-- Parent.svelte -->
<script>
  import Input from './Input.svelte';
  
  let text = $state('');
  
  $effect(() => {
    console.log('Text changed to:', text);
  });
</script>

<!-- ✅ Usa bind: per collegamento bidirezionale -->
<Input bind:value={text} />

<p>You typed: {text}</p>
<p>Length: {text.length}</p>

<button onclick={() => text = ''}>Clear</button>
```

**Come funziona:**
1. L'utente digita nell'input del componente figlio
2. `value` nel figlio cambia
3. `text` nel padre cambia AUTOMATICAMENTE ✨
4. Il `<p>You typed: {text}</p>` si aggiorna

**Esempio avanzato - Counter personalizzato:**
```svelte
<!-- Counter.svelte -->
<script>
  let { count = $bindable(0) } = $props();
</script>

<div class="counter">
  <button onclick={() => count--}>-</button>
  <span>{count}</span>
  <button onclick={() => count++}>+</button>
</div>
```

```svelte
<!-- App.svelte -->
<script>
  import Counter from './Counter.svelte';
  
  let myCount = $state(0);
  
  // ✅ myCount si aggiorna quando clicchi i bottoni nel Counter!
  $effect(() => {
    if (myCount >= 10) {
      alert('You reached 10!');
    }
  });
</script>

<Counter bind:count={myCount} />
<p>Main count: {myCount}</p>
```

---

### 🔹 `$inspect` - Debug: Vedi Quando Una Variabile Cambia

**`$inspect`** è uno strumento di **debugging** che logga automaticamente quando una variabile cambia.

```svelte
<script>
  let count = $state(0);
  let user = $state({ name: 'Mario', age: 25 });
  
  // ✅ Logga nella console ogni volta che count cambia
  $inspect(count);
  
  // ✅ Puoi ispezionare più variabili insieme
  $inspect(count, user);
  
  // ✅ Con un label per identificare facilmente
  $inspect('User object:', user);
  
  // ✅ Ispeziona valori derivati
  let doubled = $derived(count * 2);
  $inspect('Doubled value:', doubled);
</script>

<button onclick={() => count++}>
  Increment (check console!)
</button>

<button onclick={() => user.age++}>
  Birthday
</button>
```

**Output nella console:**
```
count: 0
count: 1
count: 2
User object: { name: 'Mario', age: 25 }
User object: { name: 'Mario', age: 26 }
Doubled value: 4
```

**Quando usare `$inspect`:**
- 🐛 Debug di problemi di reattività
- 🔍 Vedere quando e come cambiano i valori
- 📊 Monitorare il flusso dei dati
- ✅ Verificare che gli effect si attivino correttamente

---

### 📊 Riepilogo Completo delle Runes

| Rune | Scopo | Esempio |
|------|-------|---------|
| `$state` | Variabile reattiva che può cambiare | `let count = $state(0)` |
| `$derived` | Valore calcolato automaticamente | `let doubled = $derived(count * 2)` |
| `$effect` | Esegui codice quando qualcosa cambia | `$effect(() => console.log(count))` |
| `$props` | Ricevi dati dal componente padre | `let { name } = $props()` |
| `$bindable` | Collegamento bidirezionale padre↔figlio | `let { value = $bindable() } = $props()` |
| `$inspect` | Debug: vedi quando una variabile cambia | `$inspect(count)` |

### Esempio Completo - Tutto Insieme

```svelte
<!-- TodoItem.svelte -->
<script>
  // Props dal padre
  let { 
    todo,
    onDelete = $bindable() 
  } = $props();
  
  // State locale
  let isEditing = $state(false);
  let editText = $state(todo.text);
  
  // Derived
  let isCompleted = $derived(todo.done);
  let textLength = $derived(editText.length);
  
  // Effect
  $effect(() => {
    console.log(`Todo "${todo.text}" is ${isCompleted ? 'done' : 'pending'}`);
  });
  
  // Debug
  $inspect('Todo state:', todo);
</script>

<div class="todo" class:completed={isCompleted}>
  {#if isEditing}
    <input bind:value={editText} />
    <span>({textLength} chars)</span>
    <button onclick={() => isEditing = false}>Save</button>
  {:else}
    <span>{todo.text}</span>
    <button onclick={() => isEditing = true}>Edit</button>
  {/if}
  
  <button onclick={onDelete}>Delete</button>
</div>
```

):**
```typescript
import { count } from '$lib/stores/counter';

// Subscribe manualmente
const unsubscribe = count.subscribe(value => {
  console.log('Count is:', value);
});

// Modifica
count.set(10);
count.update(n => n + 5);

// ⚠️ Ricordati di fare unsubscribe!
unsubscribe();
```

---

#### 🔹 **readable** - Store Solo Lettura

Store che può essere solo **letto**, non modificato dall'esterno. Utile per valori che cambiano nel tempo ma controllati internamente.

```typescript
// src/lib/stores/time.ts
import { readable } from 'svelte/store';

// ✅ Store che aggiorna ogni secondo
export const time = readable(new Date(), (set) => {
  // Questa funzione viene chiamata quando c'è almeno 1 subscriber
  
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);
  
  // 🧹 Cleanup quando non ci sono più subscribers
  return () => {
    clearInterval(interval);
  };
});
```

```svelte
<script>
  import { time } from '$lib/stores/time';
</script>

<!-- ✅ Può essere solo letto, non modificato -->
<p>Current time: {$time.toLocaleTimeString()}</p>

<!-- ❌ Questo causerebbe un errore -->
<!-- <button onclick={() => time.set(new Date())}>Won't work</button> -->
```

**Altri esempi di readable stores:**

```typescript
// Store per window size
export const windowSize = readable({ width: 0, height: 0 }, (set) => {
  const updateSize = () => {
    set({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  
  updateSize();
  window.addEventListener('resize', updateSize);
  
  return () => {
    window.removeEventListener('resize', updateSize);
  };
});

// Store per posizione mouse
export const mousePosition = readable({ x: 0, y: 0 }, (set) => {
  const handleMove = (e) => {
    set({ x: e.clientX, y: e.clientY });
  };
  
  window.addEventListener('mousemove', handleMove);
  
  return () => {
    window.removeEventListener('mousemove', handleMove);
  };
});

// Store per online/offline status
export const isOnline = readable(navigator.onLine, (set) => {
  const handleOnline = () => set(true);
  const handleOffline = () => set(false);
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
});
```

---

#### 🔹 **derived** - Store Derivato

Store che **deriva il suo valore** da uno o più altri stores. Si aggiorna automaticamente quando gli stores sorgente cambiano.

```typescript
// src/lib/stores/cart.ts
import { writable, derived } from 'svelte/store';

// Store base
export const cartItems = writable([
  { id: 1, name: 'Product A', price: 10, quantity: 2 },
  { id: 2, name: 'Product B', price: 20, quantity: 1 }
]);

// ✅ Derived da un singolo store
export const itemCount = derived(
  cartItems,
  $cartItems => $cartItems.length
);

// ✅ Derived con calcolo
export const totalPrice = derived(
  cartItems,
  $cartItems => $cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  )
);

// ✅ Derived da multipli stores
export const shippingCost = writable(5);

export const finalTotal = derived(
  [totalPrice, shippingCost],
  ([$totalPrice, $shippingCost]) => $totalPrice + $shippingCost
);

// ✅ Derived con logica complessa
export const discount = derived(
  totalPrice,
  $totalPrice => {
    if ($totalPrice > 100) return $totalPrice * 0.15;
    if ($totalPrice > 50) return $totalPrice * 0.10;
    return 0;
  }
);

export const finalPrice = derived(
  [totalPrice, discount, shippingCost],
  ([$totalPrice, $discount, $shippingCost]) => 
    $totalPrice - $discount + $shippingCost
);
```

```svelte
<!-- Cart.svelte -->
<script>
  import { 
    cartItems, 
    itemCount, 
    totalPrice, 
    discount,
    finalPrice 
  } from '$lib/stores/cart';
</script>

<h2>Shopping Cart ({$itemCount} items)</h2>

{#each $cartItems as item}
  <div>
    {item.name} - €{item.price} x {item.quantity}
  </div>
{/each}

<div class="summary">
  <p>Subtotal: €{$totalPrice}</p>
  <p>Discount: -€{$discount.toFixed(2)}</p>
  <p>Shipping: €5</p>
  <p><strong>Total: €{$finalPrice.toFixed(2)}</strong></p>
</div>
```

**Derived con callback asincrono:**
```typescript
import { derived } from 'svelte/store';
import { userId } from './user';

// ✅ Derived asincrono - carica dati quando userId cambia
export const userData = derived(
  userId,
  ($userId, set) => {
    // Se non c'è userId, resetta
    if (!$userId) {
      set(null);
      return;
    }
    
    // Carica i dati
    fetch(`/api/users/${$userId}`)
      .then(res => res.json())
      .then(data => set(data))
      .catch(err => {
        console.error(err);
        set(null);
      });
  },
  null // Valore iniziale
);
```

---

#### 🔹 **Custom Stores** - Store Personalizzati

Puoi creare stores con metodi custom per logica specifica.

```typescript
// src/lib/stores/counter.ts
import { writable } from 'svelte/store';

function createCounter() {
  // Store interno
  const { subscribe, set, update } = writable(0);
  
  // ✅ Esponi solo subscribe + metodi custom
  return {
    subscribe, // Necessario per usare $counter
    increment: () => update(n => n + 1),
    decrement: () => update(n => n - 1),
    reset: () => set(0),
    setTo: (value) => set(value),
    double: () => update(n => n * 2)
  };
}

export const counter = createCounter();
```

```svelte
<script>
  import { counter } from '$lib/stores/counter';
</script>

<p>Count: {$counter}</p>

<!-- ✅ Usa i metodi custom -->
<button onclick={() => counter.increment()}>+1</button>
<button onclick={() => counter.decrement()}>-1</button>
<button onclick={() => counter.double()}>×2</button>
<button onclick={() => counter.reset()}>Reset</button>
```

**Custom Store - Todo List:**
```typescript
// src/lib/stores/todos.ts
import { writable } from 'svelte/store';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function createTodoStore() {
  const { subscribe, update } = writable<Todo[]>([]);
  
  return {
    subscribe,
    
    add: (text: string) => {
      update(todos => [
        ...todos,
        { id: Date.now(), text, done: false }
      ]);
    },
    
    remove: (id: number) => {
      update(todos => todos.filter(t => t.id !== id));
    },
    
    toggle: (id: number) => {
      update(todos => 
        todos.map(t => 
          t.id === id ? { ...t, done: !t.done } : t
        )
      );
    },
    
    clear: () => {
      update(() => []);
    },
    
    clearCompleted: () => {
      update(todos => todos.filter(t => !t.done));
    }
  };
}

export const todos = createTodoStore();
```

```svelte
<script>
  import { todos } from '$lib/stores/todos';
  
  let newTodo = '';
  
  function addTodo() {
    if (newTodo.trim()) {
      todos.add(newTodo);
      newTodo = '';
    }
  }
</script>

<input bind:value={newTodo} />
<button onclick={addTodo}>Add</button>

{#each $todos as todo}
  <div>
    <input 
      type="checkbox" 
      checked={todo.done}
      onchange={() => todos.toggle(todo.id)}
    />
    <span class:done={todo.done}>{todo.text}</span>
    <button onclick={() => todos.remove(todo.id)}>×</button>
  </div>
{/each}

<button onclick={() => todos.clearCompleted()}>
  Clear Completed
</button>
```

---

#### 🔹 **get** - Lettura Sincrona del Valore

A volte serve leggere il valore corrente di uno store **senza** fare subscribe.

```typescript
import { get } from 'svelte/store';
import { user } from '$lib/stores/user';

// ✅ Leggi il valore corrente una volta sola
const currentUser = get(user);
console.log(currentUser);

// ⚠️ Non è reattivo! Legge solo il valore al momento della chiamata
```

**Quando usare `get`:**
- ✅ In funzioni che non sono reattive
- ✅ Per logging/debugging
- ✅ In hooks o lifecycle methods

```typescript
import { get } from 'svelte/store';
import { cart, discount } from '$lib/stores/cart';

function checkout() {
  // Leggi i valori correnti per processare il pagamento
  const currentCart = get(cart);
  const currentDiscount = get(discount);
  
  processPayment(currentCart, currentDiscount);
}
```

---

#### 📊 Store con Persistence (localStorage)

Store che si salvano automaticamente in localStorage.

```typescript
// src/lib/stores/persistent.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export function persistent<T>(key: string, initialValue: T) {
  // Carica valore salvato (solo in browser)
  const stored = browser ? localStorage.getItem(key) : null;
  const data = stored ? JSON.parse(stored) : initialValue;
  
  // Crea store
  const store = writable<T>(data);
  
  // Salva in localStorage ad ogni cambiamento (solo in browser)
  if (browser) {
    store.subscribe(value => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }
  
  return store;
}

// Uso
export const theme = persistent('theme', 'light');
export const settings = persistent('settings', {
  notifications: true,
  language: 'en'
});
```

---

#### 🔄 Confronto: Runes vs Stores

| Caratteristica | `$state` (Runes) | Stores |
|----------------|------------------|--------|
| **Scope** | Locale al componente | Globale (condiviso) |
| **Uso** | Stato interno componente | Stato condiviso tra componenti |
| **Reattività** | Automatica | Automatica con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### 💡 L'Alias `$lib` - Importazioni Semplici

**`$lib`** è un **alias speciale** che punta sempre a `src/lib/`, indipendentemente da dove ti trovi nel progetto.

**Senza `$lib` (percorsi relativi complicati):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '../../../lib/components/Button.svelte';
import { formatDate } from '../../../lib/utils/date.js';
import { user } from '../../../lib/stores/user.js';

// 😵 Difficile da mantenere, facile sbagliare
```

**Con `$lib` (sempre uguale, ovunque sei):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '$lib/components/Button.svelte';
import { formatDate } from '$lib/utils/date';
import { user } from '$lib/stores/user';

// ✅ Sempre lo stesso path, facile da ricordare!
```

**Struttura tipica di `$lib`:**
```
src/lib/
├── components/               # Componenti riutilizzabili
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── Modal.svelte
│   └── forms/
│       ├── Input.svelte
│       └── Select.svelte
│
├── server/                   # ⚠️ Codice SOLO server (non esposto al client)
│   ├── database.ts          # DB connection
│   ├── auth.ts              # Auth logic
│   └── email.ts             # Email service
│
├── stores/                   # Svelte stores globali
│   ├── user.ts
│   ├── cart.ts
│   └── theme.ts
│
├── utils/                    # Utility functions
│   ├── date.ts
│   ├── format.ts
│   └── validators.ts
│
├── types/                    # TypeScript types condivisi
│   └── index.ts
│
└── index.ts                  # Esporta componenti pubblici
```

**Esempi pratici:**

```typescript
// src/lib/components/Button.svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button class={variant} {disabled}>
  <slot />
</button>

// src/lib/index.ts - Esporta per uso esterno
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';

// Ora puoi importare così:
// import { Button, Card } from '$lib';
```

```typescript
// src/lib/stores/user.ts
import { writable } from 'svelte/store';

export const user = writable(null);
export const isLoggedIn = derived(user, $user => $user !== null);

// Usa ovunque con:
// import { user, isLoggedIn } from '$lib/stores/user';
```

```typescript
// src/lib/utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('it-IT').format(date);
}

// Usa con:
// import { formatDate } from '$lib/utils/date';
```

**⚠️ IMPORTANTE - `$lib/server`:**

Il codice in `src/lib/server/` è **accessibile SOLO dal server**. Vite lo esclude automaticamente dal bundle client.

```typescript
// ✅ OK - Importa in +page.server.ts
import { db } from '$lib/server/database';

// ❌ ERRORE - Non puoi importare in +page.svelte
import { db } from '$lib/server/database'; // Build error!
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database'; // ✅ Solo qui!

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot /> <!-- Pagina child renderizzata qui -->
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

## 🏪 Stores di SvelteKit

### 💡 Il Simbolo `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 - Auto-subscription

In Svelte, il simbolo **`# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

** davanti a una variabile indica che è uno **store** e vogliamo:
1. **Auto-subscribe** → Svelte si iscrive automaticamente allo store
2. **Auto-unsubscribe** → Svelte rimuove l'iscrizione quando il componente viene distrutto
3. **Reattività automatica** → Il DOM si aggiorna quando lo store cambia

**Senza `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (manuale):**
```svelte
<script>
  import { page } from '$app/stores';
  
  let currentPath;
  
  // Devi fare subscribe manualmente
  const unsubscribe = page.subscribe(value => {
    currentPath = value.url.pathname;
  });
  
  // E ricordarti di fare unsubscribe
  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1>{currentPath}</h1>
```

**Con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (automatico e reattivo):**
```svelte
<script>
  import { page } from '$app/stores';
  
  // Il $ fa tutto automaticamente!
  // - Subscribe all'inizio
  // - Aggiorna quando cambia
  // - Unsubscribe quando componente viene distrutto
</script>

<h1>{$page.url.pathname}</h1>
```

### $app/stores

```svelte
<script>
  import { page, navigating, updated } from '$app/stores';
  
  // ✅ $page - Informazioni sulla pagina corrente
  // $page.url - URL corrente (oggetto URL)
  // $page.params - Parametri route dinamici
  // $page.route.id - Route ID (es: "/blog/[slug]")
  // $page.status - Status code HTTP
  // $page.error - Oggetto errore se presente
  // $page.data - Dati dalle load functions
  // $page.form - Risultato form action
  // $page.state - Navigation state
  
  // ✅ $navigating - Stato navigazione (null se non stai navigando)
  // $navigating.from - Pagina di provenienza
  // $navigating.to - Pagina di destinazione
  // $navigating.type - Tipo: 'link', 'popstate', 'goto'
  // $navigating.willUnload - True se pagina verrà scaricata
  // $navigating.delta - +1 forward, -1 backward
  // $navigating.complete - Promise che si risolve quando navigazione completa
  
  // ✅ $updated - True se nuova versione app disponibile
</script>

<!-- Esempi pratici -->

<!-- 1. Mostra URL corrente -->
<h1>Current path: {$page.url.pathname}</h1>
<p>Full URL: {$page.url.href}</p>
<p>Query params: {$page.url.searchParams.get('q')}</p>

<!-- 2. Accedi ai parametri dinamici -->
{#if $page.params.slug}
  <p>Stai visualizzando: {$page.params.slug}</p>
{/if}

<!-- 3. Loading spinner durante navigazione -->
{#if $navigating}
  <div class="loading-bar">
    Navigating to {$navigating.to.url.pathname}...
  </div>
{/if}

<!-- 4. Notifica aggiornamento app -->
{#if $updated}
  <div class="update-banner">
    <p>New version available!</p>
    <button on:click={() => location.reload()}>
      Update now
    </button>
  </div>
{/if}

<!-- 5. Evidenzia link attivo -->
<nav>
  <a 
    href="/home" 
    class:active={$page.url.pathname === '/home'}
  >
    Home
  </a>
  <a 
    href="/about" 
    class:active={$page.url.pathname === '/about'}
  >
    About
  </a>
</nav>

<!-- 6. Mostra dati dalla load function -->
<p>User: {$page.data.user?.name}</p>

<!-- 7. Mostra risultato form -->
{#if $page.form?.error}
  <p class="error">{$page.form.error}</p>
{/if}
```

### Esempi Avanzati con Stores

**Progress bar durante navigazione:**
```svelte
<script>
  import { navigating } from '$app/stores';
  import { tweened } from 'svelte/motion';
  
  const progress = tweened(0);
  
  $: if ($navigating) {
    progress.set(0.3); // Inizia al 30%
    $navigating.complete.then(() => {
      progress.set(1); // Completa al 100%
      setTimeout(() => progress.set(0), 500); // Reset
    });
  }
</script>

{#if $progress > 0}
  <div class="progress-bar" style="width: {$progress * 100}%"></div>
{/if}
```

**Breadcrumb dinamico:**
```svelte
<script>
  import { page } from '$app/stores';
  
  $: segments = $page.url.pathname.split('/').filter(Boolean);
</script>

<nav class="breadcrumb">
  <a href="/">Home</a>
  {#each segments as segment, i}
    / 
    <a href="/{segments.slice(0, i + 1).join('/')}">
      {segment}
    </a>
  {/each}
</nav>
```

---

## 🪝 Hooks

### Server Hooks (src/hooks.server.ts)

```typescript
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

// handle - Intercetta ogni richiesta
export const handle: Handle = async ({ event, resolve }) => {
  // Autenticazione
  const session = event.cookies.get('session');
  event.locals.user = await getUser(session);
  
  // Resolve
  const response = await resolve(event);
  
  // Modifica response
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
};

// handleFetch - Modifica fetch requests
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  if (request.url.startsWith('https://api.example.com/')) {
    request.headers.set('Authorization', `Bearer ${API_KEY}`);
  }
  
  return fetch(request);
};

// handleError - Gestione errori
export const handleError: HandleServerError = async ({ error, event }) => {
  console.error(error);
  
  return {
    message: 'Ops! Qualcosa è andato storto'
  };
};
```

### Sequence Multiple Hooks

```typescript
import { sequence } from '@sveltejs/kit/hooks';

const auth = async ({ event, resolve }) => {
  // Auth logic
  return resolve(event);
};

const logging = async ({ event, resolve }) => {
  console.log('Request:', event.url.pathname);
  return resolve(event);
};

export const handle = sequence(auth, logging);
```

---

## 🎯 State Management - Svelte 5 Runes

Le **Runes** sono il nuovo sistema di reattività di Svelte 5. Ogni rune inizia con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### 💡 L'Alias `$lib` - Importazioni Semplici

**`$lib`** è un **alias speciale** che punta sempre a `src/lib/`, indipendentemente da dove ti trovi nel progetto.

**Senza `$lib` (percorsi relativi complicati):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '../../../lib/components/Button.svelte';
import { formatDate } from '../../../lib/utils/date.js';
import { user } from '../../../lib/stores/user.js';

// 😵 Difficile da mantenere, facile sbagliare
```

**Con `$lib` (sempre uguale, ovunque sei):**
```typescript
// src/routes/blog/[slug]/+page.svelte
import Button from '$lib/components/Button.svelte';
import { formatDate } from '$lib/utils/date';
import { user } from '$lib/stores/user';

// ✅ Sempre lo stesso path, facile da ricordare!
```

**Struttura tipica di `$lib`:**
```
src/lib/
├── components/               # Componenti riutilizzabili
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── Modal.svelte
│   └── forms/
│       ├── Input.svelte
│       └── Select.svelte
│
├── server/                   # ⚠️ Codice SOLO server (non esposto al client)
│   ├── database.ts          # DB connection
│   ├── auth.ts              # Auth logic
│   └── email.ts             # Email service
│
├── stores/                   # Svelte stores globali
│   ├── user.ts
│   ├── cart.ts
│   └── theme.ts
│
├── utils/                    # Utility functions
│   ├── date.ts
│   ├── format.ts
│   └── validators.ts
│
├── types/                    # TypeScript types condivisi
│   └── index.ts
│
└── index.ts                  # Esporta componenti pubblici
```

**Esempi pratici:**

```typescript
// src/lib/components/Button.svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button class={variant} {disabled}>
  <slot />
</button>

// src/lib/index.ts - Esporta per uso esterno
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';

// Ora puoi importare così:
// import { Button, Card } from '$lib';
```

```typescript
// src/lib/stores/user.ts
import { writable } from 'svelte/store';

export const user = writable(null);
export const isLoggedIn = derived(user, $user => $user !== null);

// Usa ovunque con:
// import { user, isLoggedIn } from '$lib/stores/user';
```

```typescript
// src/lib/utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('it-IT').format(date);
}

// Usa con:
// import { formatDate } from '$lib/utils/date';
```

**⚠️ IMPORTANTE - `$lib/server`:**

Il codice in `src/lib/server/` è **accessibile SOLO dal server**. Vite lo esclude automaticamente dal bundle client.

```typescript
// ✅ OK - Importa in +page.server.ts
import { db } from '$lib/server/database';

// ❌ ERRORE - Non puoi importare in +page.svelte
import { db } from '$lib/server/database'; // Build error!
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database'; // ✅ Solo qui!

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot /> <!-- Pagina child renderizzata qui -->
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

## 🏪 Stores di SvelteKit

### 💡 Il Simbolo `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 - Auto-subscription

In Svelte, il simbolo **`# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

** davanti a una variabile indica che è uno **store** e vogliamo:
1. **Auto-subscribe** → Svelte si iscrive automaticamente allo store
2. **Auto-unsubscribe** → Svelte rimuove l'iscrizione quando il componente viene distrutto
3. **Reattività automatica** → Il DOM si aggiorna quando lo store cambia

**Senza `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (manuale):**
```svelte
<script>
  import { page } from '$app/stores';
  
  let currentPath;
  
  // Devi fare subscribe manualmente
  const unsubscribe = page.subscribe(value => {
    currentPath = value.url.pathname;
  });
  
  // E ricordarti di fare unsubscribe
  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1>{currentPath}</h1>
```

**Con `# 📘 Guida Completa SvelteKit - Tutto in Uno

> **Guida completa con esempi commentati, best practices e risorse**

## 📑 Indice
1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Comandi CLI](#comandi-cli)
4. [Struttura del Progetto](#struttura-del-progetto)
5. [Routing](#routing)
6. [Load Functions](#load-functions)
7. [Form Actions](#form-actions)
8. [Progressive Enhancement](#progressive-enhancement)
9. [Stores di SvelteKit](#stores-di-sveltekit)
10. [Hooks](#hooks)
11. [State Management](#state-management)
12. [Gestione Errori](#gestione-errori)
13. [Adapters e Deployment](#adapters-e-deployment)
14. [Librerie di Animazione](#librerie-di-animazione)
15. [Librerie UI Components](#librerie-ui-components)
16. [Best Practices](#best-practices)
17. [Risorse Utili](#risorse-utili)

---

## 🎯 Introduzione

**SvelteKit** è il framework ufficiale per costruire applicazioni web con Svelte. È progettato per essere:

- **Veloce**: SSR e SSG per prestazioni ottimali
- **Flessibile**: Supporta sia SPA che app multi-page
- **Semplice**: Routing intuitivo basato su filesystem
- **Moderno**: Web standards, progressive enhancement, TypeScript

### Caratteristiche Principali

- ✅ **Server-Side Rendering (SSR)** - Rendering lato server per SEO e performance
- ✅ **Static Site Generation (SSG)** - Prerendering di pagine statiche
- ✅ **Routing automatico** - Basato sulla struttura delle cartelle
- ✅ **Code-splitting** - Caricamento ottimizzato delle risorse
- ✅ **API endpoints** - Creazione di API direttamente nel progetto
- ✅ **Hot Module Replacement** - Aggiornamento istantaneo durante lo sviluppo
- ✅ **TypeScript support** - Type safety integrato
- ✅ **Progressive Enhancement** - Funziona anche senza JavaScript

---

## 🚀 Installazione e Setup

### Creare un Nuovo Progetto

```bash
# Con npm (Node Package Manager)
npx sv create my-app

# Con pnpm (più veloce, usa hard links)
pnpx sv create my-app

# Con Bun (JavaScript runtime ultra-veloce)
bunx sv create my-app

# Con Yarn
yarn dlx sv create my-app

# Con Deno (runtime sicuro per TypeScript)
deno run npm:sv create my-app
```

**Durante la creazione ti verrà chiesto:**
- Quale template vuoi usare (SvelteKit demo app, Skeleton project, Library project)
- Se vuoi TypeScript
- Quali strumenti aggiuntivi installare (ESLint, Prettier, Playwright, Vitest, etc.)

### Avviare il Progetto

```bash
# Entra nella cartella del progetto
cd my-app

# Installa le dipendenze (se non l'hai fatto durante la creazione)
npm install

# Avvia il dev server (di default su http://localhost:5173)
npm run dev

# Avvia con porta specifica
npm run dev -- --port 3000

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview
```

---

## 🛠️ Comandi CLI

### `sv create` - Crea Nuovo Progetto

Crea un nuovo progetto SvelteKit da zero.

```bash
npx sv create my-app
```

**Opzioni disponibili:**
```bash
# Specifica il percorso del progetto
npx sv create my-app -C /path/to/directory

# Ignora il controllo git
npx sv create my-app --no-git-check

# Specifica il package manager da usare
npx sv create my-app --install npm
npx sv create my-app --install pnpm
npx sv create my-app --install yarn

# Non installare le dipendenze (le installi dopo manualmente)
npx sv create my-app --no-install
```

---

### `sv add` - Aggiungi Funzionalità

Aggiunge integrazioni e strumenti al progetto esistente.

```bash
# Sintassi base
npx sv add [add-on]

# Aggiungi multiple features contemporaneamente
npx sv add tailwindcss prettier eslint
```

**Add-ons Ufficiali Disponibili:**

```bash
# 🎨 Styling
npx sv add tailwindcss          # Tailwind CSS framework

# 🧹 Code Quality
npx sv add eslint               # Linting per JavaScript/TypeScript
npx sv add prettier             # Formattazione codice

# 🧪 Testing
npx sv add playwright           # E2E testing
npx sv add vitest               # Unit testing veloce

# 📚 Development Tools
npx sv add storybook            # Component development environment

# 🗄️ Database & ORM
npx sv add drizzle              # Drizzle ORM (TypeScript-first)

# 🔐 Autenticazione
npx sv add lucia                # Lucia auth library

# 📝 Content
npx sv add mdsvex               # Markdown in Svelte components

# 🌍 Internazionalizzazione
npx sv add paraglide            # i18n solution

# 🤖 AI Integration
npx sv add mcp                  # Model Context Protocol

# 🚀 Adapters
npx sv add sveltekit-adapter    # Adapter specifici per deployment
```

**Esempio pratico - Setup completo:**
```bash
# Crea progetto con tutto il necessario
npx sv create my-app
cd my-app

# Aggiungi styling, linting, testing
npx sv add tailwindcss eslint prettier playwright vitest

# Ora hai un setup completo e professionale!
```

---

### `sv check` - Controllo Errori

Verifica errori TypeScript e Svelte nel progetto.

```bash
# Controlla tutto il progetto
npx sv check

# Controlla in modalità watch (controlla ad ogni modifica)
npx sv check --watch
```

**Richiede il package `svelte-check`:**
```bash
# Installa svelte-check come dev dependency
npm install -D svelte-check

# Aggiungi script al package.json
{
  "scripts": {
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
```

---

### `sv migrate` - Migrazione Codice

Migra automaticamente il codebase a nuove versioni.

```bash
# Avvia il wizard di migrazione
npx sv migrate
```

**Migrazioni Disponibili:**

```bash
# 🆕 Migra da Svelte 4 a Svelte 5 (rune-based reactivity)
npx sv migrate svelte-5

# 🔄 Migra da $app/stores a $app/state (nuovo state management)
npx sv migrate app-state
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

---

### Script Package.json Standard

Ogni progetto SvelteKit ha questi script di base:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-check --watch",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 📁 Struttura del Progetto

```
my-app/
├── src/
│   ├── routes/                    # Routing filesystem-based
│   │   ├── +page.svelte           # Pagina principale
│   │   ├── +page.ts               # Load function universale
│   │   ├── +page.server.ts        # Load function server-only
│   │   ├── +layout.svelte         # Layout condiviso
│   │   ├── +layout.ts             # Layout load function
│   │   ├── +error.svelte          # Pagina di errore
│   │   └── +server.ts             # API endpoint
│   ├── lib/                       # Componenti e utilities
│   │   ├── components/
│   │   ├── server/                # Codice solo server
│   │   ├── stores/
│   │   └── index.ts
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   └── hooks.client.ts            # Hooks client-side
├── static/                        # File statici
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── package.json
└── tsconfig.json
```

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  return {
    message: await response.text()
  };
};
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.getUser(locals.userId);
  
  return {
    user,
    secretData: process.env.SECRET_API_KEY
  };
};
```

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <slot />
</main>

<footer>© 2024</footer>
```

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET /api/posts
export const GET: RequestHandler = async () => {
  const posts = await fetchPostsFromDB();
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const newPost = await createPost(data);
  return json(newPost, { status: 201 });
};
```

---

## 🗺️ Routing

### Routing Base

```
src/routes/
├── +page.svelte              → /
├── about/
│   └── +page.svelte          → /about
├── blog/
│   ├── +page.svelte          → /blog
│   └── [slug]/               # [slug] = parametro dinamico
│       └── +page.svelte      → /blog/:slug
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### ⚙️ Convenzioni Speciali delle Cartelle

#### 🔹 **[param]** - Parametri Dinamici (Singolo Segmento)

Le **parentesi quadre** `[nome]` indicano che quella parte dell'URL è un **parametro dinamico**.

```
src/routes/blog/[slug]/+page.svelte
```

**Matcha:**
- `/blog/hello-world` → `params.slug = "hello-world"`
- `/blog/my-post` → `params.slug = "my-post"`
- `/blog/123` → `params.slug = "123"`

**NON matcha:**
- `/blog` (manca il parametro)
- `/blog/hello/world` (troppi segmenti)

**Esempio completo:**
```typescript
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  // params.slug contiene il valore dall'URL
  // Se l'URL è /blog/my-article → params.slug = "my-article"
  
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, 'Post not found');
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>URL slug: {data.post.slug}</p>
```

**Altri esempi pratici:**
```
[id]/+page.svelte           → /123, /456, /abc
users/[userId]/+page.svelte → /users/1, /users/alex
products/[sku]/+page.svelte → /products/ABC123
```

#### 🔹 **[[param]]** - Parametri Opzionali (Doppia Parentesi)

Le **doppie parentesi quadre** `[[nome]]` indicano che il parametro è **opzionale**.

```
src/routes/[[lang]]/about/+page.svelte
```

**Matcha:**
- `/about` → `params.lang = undefined`
- `/en/about` → `params.lang = "en"`
- `/it/about` → `params.lang = "it"`
- `/fr/about` → `params.lang = "fr"`

**Esempio completo:**
```typescript
// src/routes/[[lang]]/products/+page.ts
export const load = async ({ params }) => {
  // Se non c'è lang nell'URL, usa 'en' come default
  const language = params.lang || 'en';
  
  const products = await fetchProducts(language);
  
  return {
    language,
    products
  };
};
```

```svelte
<!-- src/routes/[[lang]]/products/+page.svelte -->
<script>
  export let data;
</script>

<p>Lingua corrente: {data.language}</p>

{#each data.products as product}
  <div>{product.name}</div>
{/each}
```

#### 🔹 **[...rest]** - Rest Parameters (Cattura Tutto)

I **tre puntini** `[...nome]` catturano **tutti i segmenti rimanenti** dell'URL.

```
src/routes/docs/[...path]/+page.svelte
```

**Matcha:**
- `/docs/intro` → `params.path = "intro"`
- `/docs/getting-started/installation` → `params.path = "getting-started/installation"`
- `/docs/a/b/c/d/e/f` → `params.path = "a/b/c/d/e/f"`

**NON matcha:**
- `/docs` (serve almeno un segmento)

**Esempio completo - Sistema di documentazione:**
```typescript
// src/routes/docs/[...path]/+page.ts
export const load = async ({ params }) => {
  // params.path contiene tutto il percorso dopo /docs/
  const pathSegments = params.path.split('/');
  
  // Carica il documento corrispondente
  const docContent = await fetchDoc(params.path);
  
  return {
    path: params.path,
    segments: pathSegments,
    content: docContent
  };
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script>
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav>
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">{segment}</a>
  {/each}
</nav>

<article>
  {@html data.content}
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

Combinazione: parametro rest **opzionale**.

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

#### 🔹 **(group)** - Route Groups (Parentesi Tonde)

Le **parentesi tonde** `(nome)` creano un **gruppo di route** che:
- ❌ **NON influenza l'URL** (non appare nell'URL finale)
- ✅ **Permette layout condivisi** tra route specifiche
- ✅ **Organizza il codice** senza cambiare routing

```
src/routes/
├── (marketing)/              # ← Gruppo, NON appare nell'URL
│   ├── +layout.svelte        # Layout solo per questo gruppo
│   ├── about/
│   │   └── +page.svelte      → /about (NON /marketing/about)
│   └── contact/
│       └── +page.svelte      → /contact (NON /marketing/contact)
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route del gruppo
│   ├── +layout.svelte        # Layout app autenticata
│   ├── dashboard/
│   │   └── +page.svelte      → /dashboard
│   └── settings/
│       └── +page.svelte      → /settings
│
└── login/
    └── +page.svelte          → /login (fuori dai gruppi)
```

**Esempio pratico - Gruppo con autenticazione:**
```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login se non autenticato
    throw redirect(303, '/login');
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script>
  export let data;
</script>

<!-- Questo layout viene usato solo dalle pagine in (app)/ -->
<div class="app-container">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <p>Logged in as: {data.user.name}</p>
  </nav>
  
  <main>
    <slot /> <!-- Pagina child qui -->
  </main>
</div>
```

**Quando usare i Route Groups:**
- ✅ Separare sezioni pubbliche vs autenticate
- ✅ Diversi layout per admin vs user
- ✅ Marketing pages vs app pages
- ✅ Organizzazione logica senza influenzare URL

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" o "resettare" i layout ereditati.

```
src/routes/
├── +layout.svelte            # Layout root (A)
├── admin/
│   ├── +layout.svelte        # Layout admin (B)
│   ├── dashboard/
│   │   └── +page.svelte      # Usa layout A + B
│   └── login/
│       └── +page@.svelte     # @ = usa SOLO layout A (salta B)
```

**Sintassi:**
- `+page@.svelte` → Reset al root layout (ignora tutti gli altri)
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/+layout.svelte -->
<div class="admin-layout">
  <nav>Admin Navigation</nav>
  <slot />
</div>

<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout sopra -->
<div class="centered-login">
  <h1>Admin Login</h1>
  <form>...</form>
</div>
```

---

## 📥 Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent }) => {
  // fetch - usa questo invece di fetch nativo
  // params - parametri URL dinamici
  // url - oggetto URL completo
  // parent - await parent() per accedere ai dati del layout padre
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Accedi al database (solo server!)
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa secrets (MAI esporre al client!)
  const apiKey = process.env.SECRET_API_KEY;
  
  return {
    user: {
      id: user.id,
      name: user.name
      // NON includere password!
    }
  };
};
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo specifiche
invalidate('/api/posts');
invalidate('custom:posts');
```

---

## 📝 Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script>
  export let form; // Risultati della form action
</script>

<form method="POST">
  <input 
    type="email" 
    name="email" 
    value={form?.email ?? ''} 
    required 
  />
  
  <input 
    type="password" 
    name="password" 
    required 
  />
  
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
```

### Named Actions

```typescript
export const actions: Actions = {
  create: async ({ request }) => {
    // Crea todo
  },
  
  delete: async ({ request }) => {
    // Elimina todo
  }
};
```

```svelte
<!-- Specifica l'azione con ?/ -->
<form method="POST" action="?/create">
  <input name="text" />
  <button>Create</button>
</form>

<form method="POST" action="?/delete">
  <input type="hidden" name="id" value={todo.id} />
  <button>Delete</button>
</form>
```

---

## ⚡ Progressive Enhancement

```svelte
<script>
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona senza JavaScript -->
<form 
  method="POST"
  use:enhance={() => {
    loading = true;
    
    return async ({ update, result }) => {
      await update();
      loading = false;
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

---

 (automatico e reattivo):**
```svelte
<script>
  import { page } from '$app/stores';
  
  // Il $ fa tutto automaticamente!
  // - Subscribe all'inizio
  // - Aggiorna quando cambia
  // - Unsubscribe quando componente viene distrutto
</script>

<h1>{$page.url.pathname}</h1>
```

### $app/stores

```svelte
<script>
  import { page, navigating, updated } from '$app/stores';
  
  // ✅ $page - Informazioni sulla pagina corrente
  // $page.url - URL corrente (oggetto URL)
  // $page.params - Parametri route dinamici
  // $page.route.id - Route ID (es: "/blog/[slug]")
  // $page.status - Status code HTTP
  // $page.error - Oggetto errore se presente
  // $page.data - Dati dalle load functions
  // $page.form - Risultato form action
  // $page.state - Navigation state
  
  // ✅ $navigating - Stato navigazione (null se non stai navigando)
  // $navigating.from - Pagina di provenienza
  // $navigating.to - Pagina di destinazione
  // $navigating.type - Tipo: 'link', 'popstate', 'goto'
  // $navigating.willUnload - True se pagina verrà scaricata
  // $navigating.delta - +1 forward, -1 backward
  // $navigating.complete - Promise che si risolve quando navigazione completa
  
  // ✅ $updated - True se nuova versione app disponibile
</script>

<!-- Esempi pratici -->

<!-- 1. Mostra URL corrente -->
<h1>Current path: {$page.url.pathname}</h1>
<p>Full URL: {$page.url.href}</p>
<p>Query params: {$page.url.searchParams.get('q')}</p>

<!-- 2. Accedi ai parametri dinamici -->
{#if $page.params.slug}
  <p>Stai visualizzando: {$page.params.slug}</p>
{/if}

<!-- 3. Loading spinner durante navigazione -->
{#if $navigating}
  <div class="loading-bar">
    Navigating to {$navigating.to.url.pathname}...
  </div>
{/if}

<!-- 4. Notifica aggiornamento app -->
{#if $updated}
  <div class="update-banner">
    <p>New version available!</p>
    <button on:click={() => location.reload()}>
      Update now
    </button>
  </div>
{/if}

<!-- 5. Evidenzia link attivo -->
<nav>
  <a 
    href="/home" 
    class:active={$page.url.pathname === '/home'}
  >
    Home
  </a>
  <a 
    href="/about" 
    class:active={$page.url.pathname === '/about'}
  >
    About
  </a>
</nav>

<!-- 6. Mostra dati dalla load function -->
<p>User: {$page.data.user?.name}</p>

<!-- 7. Mostra risultato form -->
{#if $page.form?.error}
  <p class="error">{$page.form.error}</p>
{/if}
```

### Esempi Avanzati con Stores

**Progress bar durante navigazione:**
```svelte
<script>
  import { navigating } from '$app/stores';
  import { tweened } from 'svelte/motion';
  
  const progress = tweened(0);
  
  $: if ($navigating) {
    progress.set(0.3); // Inizia al 30%
    $navigating.complete.then(() => {
      progress.set(1); // Completa al 100%
      setTimeout(() => progress.set(0), 500); // Reset
    });
  }
</script>

{#if $progress > 0}
  <div class="progress-bar" style="width: {$progress * 100}%"></div>
{/if}
```

**Breadcrumb dinamico:**
```svelte
<script>
  import { page } from '$app/stores';
  
  $: segments = $page.url.pathname.split('/').filter(Boolean);
</script>

<nav class="breadcrumb">
  <a href="/">Home</a>
  {#each segments as segment, i}
    / 
    <a href="/{segments.slice(0, i + 1).join('/')}">
      {segment}
    </a>
  {/each}
</nav>
```

---

## 🪝 Hooks

### Server Hooks (src/hooks.server.ts)

```typescript
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

// handle - Intercetta ogni richiesta
export const handle: Handle = async ({ event, resolve }) => {
  // Autenticazione
  const session = event.cookies.get('session');
  event.locals.user = await getUser(session);
  
  // Resolve
  const response = await resolve(event);
  
  // Modifica response
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
};

// handleFetch - Modifica fetch requests
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  if (request.url.startsWith('https://api.example.com/')) {
    request.headers.set('Authorization', `Bearer ${API_KEY}`);
  }
  
  return fetch(request);
};

// handleError - Gestione errori
export const handleError: HandleServerError = async ({ error, event }) => {
  console.error(error);
  
  return {
    message: 'Ops! Qualcosa è andato storto'
  };
};
```

### Sequence Multiple Hooks

```typescript
import { sequence } from '@sveltejs/kit/hooks';

const auth = async ({ event, resolve }) => {
  // Auth logic
  return resolve(event);
};

const logging = async ({ event, resolve }) => {
  console.log('Request:', event.url.pathname);
  return resolve(event);
};

export const handle = sequence(auth, logging);
```

---

 e ha uno scopo specifico.

### 🔹 `$state` - Stato Reattivo Mutabile

**`$state`** dichiara che una variabile **cambierà nel tempo** e Svelte deve monitorarla per aggiornare il DOM.

```svelte
<script>
  // ✅ Dichiara che 'count' è reattivo e può cambiare
  let count = $state(0);
  
  // ✅ Oggetti e array sono anche reattivi (deep reactivity)
  let user = $state({
    name: 'Mario',
    age: 25
  });
  
  let items = $state(['Apple', 'Banana']);
  
  function increment() {
    count++; // Svelte rileva il cambiamento e aggiorna il DOM
  }
  
  function updateUser() {
    user.age++; // Anche le proprietà nested sono reattive!
  }
  
  function addItem() {
    items.push('Orange'); // Array methods funzionano!
  }
</script>

<button onclick={increment}>
  Count: {count}
</button>

<button onclick={updateUser}>
  {user.name} is {user.age} years old
</button>

<button onclick={addItem}>
  Add Item (Total: {items.length})
</button>

<ul>
  {#each items as item}
    <li>{item}</li>
  {/each}
</ul>
```

**⚠️ Nota importante:**
```svelte
<script>
  // ❌ SBAGLIATO - Non reattivo (normale variabile JavaScript)
  let count = 0;
  
  // ✅ GIUSTO - Reattivo con $state
  let count = $state(0);
</script>
```

---

### 🔹 `$derived` - Valori Calcolati Automaticamente

**`$derived`** crea una variabile che **si ricalcola automaticamente** quando le sue dipendenze cambiano.

```svelte
<script>
  let count = $state(0);
  
  // ✅ doubled si aggiorna AUTOMATICAMENTE quando count cambia
  let doubled = $derived(count * 2);
  
  // ✅ Può dipendere da più variabili
  let price = $state(100);
  let quantity = $state(2);
  let total = $derived(price * quantity);
  
  // ✅ Può contenere logica complessa
  let discount = $derived(
    total > 500 ? total * 0.1 : 0
  );
  
  let finalPrice = $derived(total - discount);
  
  // ✅ Può essere usato per condizioni
  let isExpensive = $derived(finalPrice > 200);
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>

<button onclick={() => count++}>Increment</button>

<hr>

<input type="number" bind:value={price} />
<input type="number" bind:value={quantity} />

<p>Total: €{total}</p>
<p>Discount: €{discount}</p>
<p>Final Price: €{finalPrice}</p>

{#if isExpensive}
  <p class="warning">⚠️ This is expensive!</p>
{/if}
```

**Differenza tra `$state` e `$derived`:**
```svelte
<script>
  let x = $state(5);
  
  // ❌ SBAGLIATO - Non si aggiorna quando x cambia
  let y = x * 2; // Calcolato una volta sola
  
  // ✅ GIUSTO - Si aggiorna automaticamente
  let y = $derived(x * 2);
</script>
```

---

### 🔹 `$effect` - Esegui Codice Quando Cambia Qualcosa

**`$effect`** esegue del codice **ogni volta che le sue dipendenze cambiano**.

```svelte
<script>
  let count = $state(0);
  let name = $state('Mario');
  
  // ✅ Si esegue ogni volta che 'count' cambia
  $effect(() => {
    console.log(`Count è ora: ${count}`);
    
    // Esempio: Salva in localStorage
    localStorage.setItem('count', count.toString());
  });
  
  // ✅ Si esegue quando 'count' O 'name' cambiano
  $effect(() => {
    document.title = `${name} - Count: ${count}`;
  });
  
  // ✅ Cleanup function (eseguita prima del prossimo effect)
  $effect(() => {
    console.log('Setting up timer...');
    
    const interval = setInterval(() => {
      console.log('Tick!');
    }, 1000);
    
    // 🧹 Cleanup - eseguito quando:
    // - Il componente viene distrutto
    // - Prima che l'effect venga ri-eseguito
    return () => {
      console.log('Cleaning up timer...');
      clearInterval(interval);
    };
  });
  
  // ✅ Effect con dipendenze specifiche
  $effect(() => {
    if (count > 10) {
      alert('Count is over 10!');
    }
  });
</script>

<input bind:value={name} />
<button onclick={() => count++}>
  Count: {count}
</button>
```

**Casi d'uso comuni per `$effect`:**
- 💾 Salvare dati in localStorage/sessionStorage
- 📡 Chiamate API quando cambia un filtro
- 📊 Aggiornare grafici/librerie esterne
- 🔔 Notifiche o analytics
- ⏱️ Timer e interval

---

### 🔹 `$props` - Passare Dati da Padre a Figlio

**`$props`** definisce le **proprietà che un componente può ricevere** dal componente padre.

```svelte
<!-- Child.svelte -->
<script>
  // ✅ Dichiara le props che questo componente accetta
  let { 
    name,           // Richiesta (obbligatoria)
    age = 18,       // Opzionale con default
    premium = false // Opzionale con default
  } = $props();
  
  // ✅ Le props sono reattive!
  // Quando il padre cambia 'name', si aggiorna automaticamente qui
</script>

<div class="user-card">
  <h2>{name}</h2>
  <p>Age: {age}</p>
  {#if premium}
    <span class="badge">⭐ Premium</span>
  {/if}
</div>

<style>
  .badge { color: gold; }
</style>
```

**Uso dal componente padre:**
```svelte
<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';
  
  let userName = $state('Mario');
  let userAge = $state(25);
</script>

<!-- ✅ Passa i dati al componente figlio -->
<Child name={userName} age={userAge} premium={true} />

<button onclick={() => userName = 'Luigi'}>
  Change Name
</button>
```

**Props con TypeScript:**
```svelte
<!-- Child.svelte -->
<script lang="ts">
  interface Props {
    name: string;
    age?: number;
    premium?: boolean;
    onUpdate?: (value: string) => void;
  }
  
  let { 
    name, 
    age = 18, 
    premium = false,
    onUpdate
  }: Props = $props();
</script>
```

---

### 🔹 `$bindable` - Collegamento Bidirezionale Padre ↔ Figlio

**`$bindable`** crea un **collegamento costante** tra una variabile del padre e del figlio. Quando una cambia, cambia anche l'altra!

```svelte
<!-- Input.svelte (componente figlio) -->
<script>
  // ✅ Questa prop può essere modificata dal figlio
  // E il padre vedrà automaticamente i cambiamenti!
  let { value = $bindable('') } = $props();
</script>

<input 
  type="text" 
  bind:value={value}
  placeholder="Type here..."
/>
```

**Uso dal componente padre:**
```svelte
<!-- Parent.svelte -->
<script>
  import Input from './Input.svelte';
  
  let text = $state('');
  
  $effect(() => {
    console.log('Text changed to:', text);
  });
</script>

<!-- ✅ Usa bind: per collegamento bidirezionale -->
<Input bind:value={text} />

<p>You typed: {text}</p>
<p>Length: {text.length}</p>

<button onclick={() => text = ''}>Clear</button>
```

**Come funziona:**
1. L'utente digita nell'input del componente figlio
2. `value` nel figlio cambia
3. `text` nel padre cambia AUTOMATICAMENTE ✨
4. Il `<p>You typed: {text}</p>` si aggiorna

**Esempio avanzato - Counter personalizzato:**
```svelte
<!-- Counter.svelte -->
<script>
  let { count = $bindable(0) } = $props();
</script>

<div class="counter">
  <button onclick={() => count--}>-</button>
  <span>{count}</span>
  <button onclick={() => count++}>+</button>
</div>
```

```svelte
<!-- App.svelte -->
<script>
  import Counter from './Counter.svelte';
  
  let myCount = $state(0);
  
  // ✅ myCount si aggiorna quando clicchi i bottoni nel Counter!
  $effect(() => {
    if (myCount >= 10) {
      alert('You reached 10!');
    }
  });
</script>

<Counter bind:count={myCount} />
<p>Main count: {myCount}</p>
```

---

### 🔹 `$inspect` - Debug: Vedi Quando Una Variabile Cambia

**`$inspect`** è uno strumento di **debugging** che logga automaticamente quando una variabile cambia.

```svelte
<script>
  let count = $state(0);
  let user = $state({ name: 'Mario', age: 25 });
  
  // ✅ Logga nella console ogni volta che count cambia
  $inspect(count);
  
  // ✅ Puoi ispezionare più variabili insieme
  $inspect(count, user);
  
  // ✅ Con un label per identificare facilmente
  $inspect('User object:', user);
  
  // ✅ Ispeziona valori derivati
  let doubled = $derived(count * 2);
  $inspect('Doubled value:', doubled);
</script>

<button onclick={() => count++}>
  Increment (check console!)
</button>

<button onclick={() => user.age++}>
  Birthday
</button>
```

**Output nella console:**
```
count: 0
count: 1
count: 2
User object: { name: 'Mario', age: 25 }
User object: { name: 'Mario', age: 26 }
Doubled value: 4
```

**Quando usare `$inspect`:**
- 🐛 Debug di problemi di reattività
- 🔍 Vedere quando e come cambiano i valori
- 📊 Monitorare il flusso dei dati
- ✅ Verificare che gli effect si attivino correttamente

---

### 📊 Riepilogo Completo delle Runes

| Rune | Scopo | Esempio |
|------|-------|---------|
| `$state` | Variabile reattiva che può cambiare | `let count = $state(0)` |
| `$derived` | Valore calcolato automaticamente | `let doubled = $derived(count * 2)` |
| `$effect` | Esegui codice quando qualcosa cambia | `$effect(() => console.log(count))` |
| `$props` | Ricevi dati dal componente padre | `let { name } = $props()` |
| `$bindable` | Collegamento bidirezionale padre↔figlio | `let { value = $bindable() } = $props()` |
| `$inspect` | Debug: vedi quando una variabile cambia | `$inspect(count)` |

### Esempio Completo - Tutto Insieme

```svelte
<!-- TodoItem.svelte -->
<script>
  // Props dal padre
  let { 
    todo,
    onDelete = $bindable() 
  } = $props();
  
  // State locale
  let isEditing = $state(false);
  let editText = $state(todo.text);
  
  // Derived
  let isCompleted = $derived(todo.done);
  let textLength = $derived(editText.length);
  
  // Effect
  $effect(() => {
    console.log(`Todo "${todo.text}" is ${isCompleted ? 'done' : 'pending'}`);
  });
  
  // Debug
  $inspect('Todo state:', todo);
</script>

<div class="todo" class:completed={isCompleted}>
  {#if isEditing}
    <input bind:value={editText} />
    <span>({textLength} chars)</span>
    <button onclick={() => isEditing = false}>Save</button>
  {:else}
    <span>{todo.text}</span>
    <button onclick={() => isEditing = true}>Edit</button>
  {/if}
  
  <button onclick={onDelete}>Delete</button>
</div>
```

 |
| **Persistence** | No (solo in memoria) | Possibile (localStorage) |
| **Performance** | Più veloce | Leggera overhead |
| **Quando usare** | Stato privato | Stato condiviso, temi, auth, cart |

**Esempio - Quando usare cosa:**
```svelte
<script>
  // ✅ $state per stato locale del componente
  let isOpen = $state(false);
  let searchQuery = $state('');
  
  // ✅ Store per stato condiviso globalmente
  import { user, theme, cart } from '$lib/stores';
</script>
```

---

#### 📚 Pattern Comuni con Stores

**1. Store per Autenticazione:**
```typescript
// src/lib/stores/auth.ts
import { writable, derived } from 'svelte/store';

export const user = writable(null);
export const token = writable(null);

export const isAuthenticated = derived(
  user,
  $user => $user !== null
);

export const isAdmin = derived(
  user,
  $user => $user?.role === 'admin'
);

// Metodi helper
export function login(userData, authToken) {
  user.set(userData);
  token.set(authToken);
}

export function logout() {
  user.set(null);
  token.set(null);
}
```

**2. Store per Tema Dark/Light:**
```typescript
// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const theme = writable(
  browser 
    ? localStorage.getItem('theme') || 'light'
    : 'light'
);

theme.subscribe(value => {
  if (browser) {
    localStorage.setItem('theme', value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  }
});

export function toggleTheme() {
  theme.update(current => current === 'light' ? 'dark' : 'light');
}
```

**3. Store per Notifiche:**
```typescript
// src/lib/stores/notifications.ts
import { writable } from 'svelte/store';

export const notifications = writable([]);

export function addNotification(message, type = 'info') {
  const id = Date.now();
  
  notifications.update(n => [
    ...n,
    { id, message, type }
  ]);
  
  // Auto-remove dopo 5 secondi
  setTimeout(() => {
    notifications.update(n => n.filter(notif => notif.id !== id));
  }, 5000);
}
```

---

## ❌ Gestione Errori

### Error Page Custom

```svelte
<!-- src/routes/+error.svelte -->
<script>
  import { page } from '$app/stores';
</script>

<h1>Oops! {$page.status}</h1>
<p>{$page.error?.message}</p>
```

### Throw Error in Load

```typescript
import { error } from '@sveltejs/kit';

export const load = async () => {
  throw error(404, 'Not found');
  throw error(500, { message: 'Server error' });
};
```

---

## 🚀 Adapters e Deployment

### Adapter Auto (Default)

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';

export default {
  kit: {
    adapter: adapter()
  }
};
```

### Adapter Vercel

```bash
npm install @sveltejs/adapter-vercel
```

```javascript
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter()
  }
};
```

### Adapter Node

```bash
npm install @sveltejs/adapter-node
```

```javascript
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter({
      out: 'build'
    })
  }
};
```

### Adapter Static (SSG)

```bash
npm install @sveltejs/adapter-static
```

```javascript
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    })
  }
};
```

---

## 🎨 Librerie di Animazione

### GSAP (GreenSock)

```bash
npm install gsap
```

**Sito:** https://gsap.com

```svelte
<script>
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  
  let element;
  
  onMount(() => {
    gsap.from(element, {
      x: -300,
      opacity: 0,
      duration: 1
    });
  });
</script>

<div bind:this={element}>Animato con GSAP</div>
```

### Motion One

```bash
npm install motion
```

**Sito:** https://motion.dev

### Svelte Motion

**Sito:** https://svelte-motion.gradientdescent.de

### Animazioni Native Svelte

```svelte
<script>
  import { fade, fly, slide } from 'svelte/transition';
  import { tweened, spring } from 'svelte/motion';
  
  let visible = true;
</script>

{#if visible}
  <div transition:fade>Fade</div>
  <div in:fly={{ y: 200 }}>Fly in</div>
{/if}
```

### Anime.js

**Sito:** https://animejs.com

---

## 🎨 Librerie UI Components

### shadcn-svelte

```bash
npx shadcn-svelte@latest init
npx shadcn-svelte@latest add button
```

**Sito:** https://www.shadcn-svelte.com

### Skeleton

```bash
npm create skeleton-app@latest my-app
```

**Sito:** https://www.skeleton.dev

### Flowbite Svelte

```bash
npm install flowbite-svelte flowbite
```

**Sito:** https://flowbite-svelte.com

### Svelte Material UI

```bash
npm install @smui/button @smui/card
```

**Sito:** https://sveltematerialui.com

### Melt UI

```bash
npm install @melt-ui/svelte
```

**Sito:** https://melt-ui.com

### Bits UI

```bash
npm install bits-ui
```

**Sito:** https://bits-ui.com

### Carbon Components Svelte

```bash
npm install carbon-components-svelte
```

**Sito:** https://carbon-components-svelte.onrender.com

### SvelteUI

```bash
npm install @svelteuidev/core
```

**Sito:** https://www.svelteui.org

### Svelte UX

```bash
npm install svelte-ux
```

**Sito:** https://svelte-ux.techniq.dev

---

## ✅ Best Practices

### Struttura Progetto

1. Usa `$lib` per componenti riutilizzabili
2. Mantieni logica server in `.server.ts`
3. Usa TypeScript per type safety
4. Organizza routes in modo logico

### Performance

1. Usa `prerender` quando possibile
2. Implementa lazy loading
3. Ottimizza immagini e assets
4. Usa `{@const}` per evitare ricalcoli

### Security

1. Non esporre API keys nel client
2. Valida input su server
3. Usa CSRF protection
4. Implementa rate limiting

### Testing

```bash
# Playwright
npx sv add playwright
npm run test

# Vitest
npx sv add vitest
npm run test:unit
```

---

## 🌐 Environment Variables

```typescript
// .env
PUBLIC_API_URL=https://api.example.com
SECRET_KEY=supersecret

// Accesso
import { PUBLIC_API_URL } from '$env/static/public';
import { SECRET_KEY } from '$env/static/private';
```

---

## 📚 Risorse Utili

### Documentazione
- **SvelteKit Docs:** https://svelte.dev/docs/kit
- **Svelte Docs:** https://svelte.dev/docs
- **Tutorial:** https://svelte.dev/tutorial

### Community
- **Discord:** https://svelte.dev/chat
- **GitHub:** https://github.com/sveltejs/kit
- **Svelte Society:** https://www.sveltesociety.dev

### Deployment
- **Vercel:** https://vercel.com
- **Netlify:** https://netlify.com
- **Cloudflare Pages:** https://pages.cloudflare.com

### Packages
- **Svelte Society Packages:** https://www.sveltesociety.dev/packages
- **npm:** https://www.npmjs.com/search?q=svelte

---

**Buon coding con SvelteKit! 🚀**