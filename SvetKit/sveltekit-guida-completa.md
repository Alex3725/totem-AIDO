# 📘 Guida Completa SvelteKit - Tutto in Uno (Edizione Migliorata)

> **Guida completa con esempi commentati, best practices, curiosità e risorse**

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
14. [API Routes e REST](#api-routes)
15. [Streaming e Loading States](#streaming)
16. [Librerie di Animazione](#librerie-di-animazione)
17. [Librerie UI Components](#librerie-ui-components)
18. [Best Practices](#best-practices)
19. [Performance Tips](#performance-tips)
20. [Risorse Utili](#risorse-utili)

---

## Introduzione

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

### Filosofia di SvelteKit

**"Less is more"** - SvelteKit compila il tuo codice in JavaScript vanilla, senza un runtime pesante. Questo significa:
- 📦 Bundle sizes più piccoli
- ⚡ Performance superiori
- 🧹 Codice più pulito e leggibile

---

## Installazione e Setup

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
- Se vuoi TypeScript (**raccomandato!**)
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

# Avvia con host specifico (per testare su dispositivi mobili)
npm run dev -- --host 0.0.0.0

# Avvia e apri automaticamente il browser
npm run dev -- --open
```

### Build per Produzione

```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build (testa prima del deploy)
npm run preview

# Preview con porta custom
npm run preview -- --port 4173
```

### Curiosità: Vite sotto il Cofano

SvelteKit usa **Vite** come build tool, che è:
- ⚡ Incredibilmente veloce (usa esbuild)
- 🔥 Hot Module Replacement istantaneo
- 🎯 Zero-config per la maggior parte dei casi

---

## Comandi CLI

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
npx sv create my-app --install bun

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

# Output diagnostico dettagliato
npx sv check --diagnostic-sources js,svelte
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

# 📦 Migra da SvelteKit 1.x a 2.x
npx sv migrate sveltekit-2
```

**Cosa fa la migrazione:**
- ✅ Aggiorna le dipendenze
- ✅ Modifica il codice automaticamente quando possibile
- ✅ Segnala cambiamenti manuali necessari
- ✅ Crea backup del codice originale

### 💡 Curiosità: Codemod Automatici

SvelteKit usa **codemod** (trasformazioni automatiche del codice) per migrare il tuo progetto. È come avere un assistente che riscrive il codice per te!

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

## Struttura del Progetto

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
│   │   ├── components/            # Componenti riutilizzabili
│   │   ├── server/                # Codice solo server
│   │   ├── stores/                # Stores globali
│   │   ├── utils/                 # Utility functions
│   │   └── index.ts               # Export pubblici
│   ├── params/                    # Custom route matchers
│   ├── app.html                   # Template HTML
│   ├── app.css                    # Stili globali
│   ├── hooks.server.ts            # Hooks server-side
│   ├── hooks.client.ts            # Hooks client-side
│   ├── service-worker.ts          # Service Worker (PWA)
│   └── ambient.d.ts               # TypeScript types
├── static/                        # File statici (favicon, robots.txt)
├── tests/                         # Test files
├── svelte.config.js               # Configurazione SvelteKit
├── vite.config.js                 # Configurazione Vite
├── playwright.config.ts           # Configurazione Playwright
├── vitest.config.ts               # Configurazione Vitest
├── package.json
└── tsconfig.json
```

### Convenzioni di Naming

- **+** = File speciali di SvelteKit (routing, load functions)
- **$** = Alias di import (`$lib`, `$app`)
- **(group)** = Route groups (non influenzano URL)
- **[param]** = Parametri dinamici

---

### File Speciali

#### **+page.svelte** - Definisce una pagina (route)

```svelte
<!-- src/routes/about/+page.svelte -->
<script lang="ts">
  // Riceve i dati dalla load function
  export let data;
</script>

<h1>About Us</h1>
<p>{data.message}</p>

<style>
  /* Stili scoped al componente */
  h1 {
    color: var(--primary-color);
  }
</style>
```

#### **+page.ts** - Load function universale

```typescript
// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent, depends }) => {
  // Questa funzione gira su SERVER e CLIENT
  const response = await fetch('/api/data');
  
  // depends() permette invalidazione custom
  depends('app:data');
  
  return {
    message: await response.text()
  };
};

// Opzioni di rendering
export const prerender = true;  // Prerender questa pagina
export const ssr = true;         // Server-side rendering
export const csr = true;         // Client-side rendering
```

#### **+page.server.ts** - Load function server-only

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals, cookies, request }) => {
  // Gira SOLO sul server - può usare secrets, db, etc.
  const user = await db.users.findOne({ id: locals.userId });
  
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
      // ⚠️ NON includere password o dati sensibili!
    }
  };
};
```

#### Differenza: +page.ts vs +page.server.ts

| Caratteristica | +page.ts | +page.server.ts |
|---------------|----------|-----------------|
| Dove gira | Server + Client | Solo Server |
| Accesso DB | ❌ | ✅ |
| Secrets/ENV | ❌ | ✅ |
| Fetch API | ✅ | ✅ |
| Performance | Più veloce (client-side) | Più sicuro |

**Regola pratica:** Usa `.server.ts` quando hai bisogno di database, secrets o autenticazione.

---

#### **+layout.svelte** - Layout condiviso

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/blog">Blog</a>
</nav>

<main>
  <slot />
</main>

<footer>
  <p>© 2024 My App</p>
</footer>

<style>
  nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--nav-bg);
  }
  
  main {
    min-height: calc(100vh - 120px);
    padding: 2rem;
  }
</style>
```

#### Layout Nesting (Layouts Annidati)

I layout si annidano automaticamente:

```
routes/
├── +layout.svelte           ← Layout root (tutti)
└── dashboard/
    ├── +layout.svelte       ← Layout dashboard (solo /dashboard/*)
    └── settings/
        └── +page.svelte     → Usa ENTRAMBI i layout
```

---

#### **+server.ts** - API endpoint

```typescript
// src/routes/api/posts/+server.ts
import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/database';

// GET /api/posts
export const GET: RequestHandler = async ({ url }) => {
  const limit = Number(url.searchParams.get('limit')) || 10;
  const posts = await db.posts.findMany({ limit });
  
  return json(posts);
};

// POST /api/posts
export const POST: RequestHandler = async ({ request, locals }) => {
  // Controlla autenticazione
  if (!locals.user) {
    throw error(401, 'Unauthorized');
  }
  
  const data = await request.json();
  
  // Validazione
  if (!data.title || !data.content) {
    throw error(400, 'Missing required fields');
  }
  
  const newPost = await db.posts.create({
    data: {
      ...data,
      authorId: locals.user.id
    }
  });
  
  return json(newPost, { status: 201 });
};

// PUT /api/posts
export const PUT: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const updated = await db.posts.update(data);
  return json(updated);
};

// DELETE /api/posts
export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json();
  await db.posts.delete(id);
  return json({ success: true });
};

// PATCH /api/posts (aggiornamento parziale)
export const PATCH: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const updated = await db.posts.patch(data);
  return json(updated);
};
```

#### REST API Best Practices

```typescript
// Usa status codes appropriati
return json(data, { status: 201 });  // Created
return json(data, { status: 204 });  // No Content

// Imposta headers custom
return json(data, {
  headers: {
    'Cache-Control': 'max-age=3600',
    'X-Custom-Header': 'value'
  }
});

// Rate limiting con hooks
```

---

## Routing

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
├── products/
│   ├── [id]/
│   │   ├── +page.svelte      → /products/123
│   │   └── edit/
│   │       └── +page.svelte  → /products/123/edit
└── api/
    └── posts/
        └── +server.ts        → /api/posts
```

### Convenzioni Speciali delle Cartelle

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
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (!response.ok) {
    throw error(404, {
      message: 'Post not found',
      slug: params.slug
    });
  }
  
  return {
    post: await response.json()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<article>
  <h1>{data.post.title}</h1>
  <p class="meta">Published: {data.post.date}</p>
  <div class="content">
    {@html data.post.content}
  </div>
</article>
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

**Esempio completo con i18n:**
```typescript
// src/routes/[[lang]]/+layout.server.ts
import type { LayoutServerLoad } from './$types';

const SUPPORTED_LANGS = ['en', 'it', 'fr', 'de'];
const DEFAULT_LANG = 'en';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
  let lang = params.lang || cookies.get('preferred-lang') || DEFAULT_LANG;
  
  // Valida la lingua
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = DEFAULT_LANG;
  }
  
  // Carica le traduzioni
  const translations = await import(`$lib/i18n/${lang}.json`);
  
  return {
    lang,
    t: translations.default
  };
};
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
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const pathSegments = params.path.split('/');
  
  try {
    // Carica il documento markdown
    const doc = await import(`../../../docs/${params.path}.md`);
    
    return {
      path: params.path,
      segments: pathSegments,
      content: doc.default,
      metadata: doc.metadata
    };
  } catch {
    throw error(404, `Document '${params.path}' not found`);
  }
};
```

```svelte
<!-- src/routes/docs/[...path]/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<!-- Breadcrumb navigation -->
<nav class="breadcrumb">
  <a href="/docs">Docs</a>
  {#each data.segments as segment, i}
    / <a href="/docs/{data.segments.slice(0, i + 1).join('/')}">
      {segment}
    </a>
  {/each}
</nav>

<article>
  <svelte:component this={data.content} />
</article>
```

#### 🔹 **[[...rest]]** - Rest Parameters Opzionali

```
src/routes/docs/[[...path]]/+page.svelte
```

**Matcha:**
- `/docs` → `params.path = undefined`
- `/docs/intro` → `params.path = "intro"`
- `/docs/a/b/c` → `params.path = "a/b/c"`

Perfetto per homepage + routing catch-all.

---

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
│       └── +page.svelte      → /contact
│
├── (app)/                    # ← Altro gruppo
│   ├── +layout.server.ts     # Auth check per tutte le route
│   ├── +layout.svelte        
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

export const load: LayoutServerLoad = async ({ locals, url }) => {
  // Controlla autenticazione per TUTTE le route in (app)/
  if (!locals.user) {
    // Redirect a login, salvando la destinazione originale
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
  
  return {
    user: locals.user
  };
};
```

```svelte
<!-- src/routes/(app)/+layout.svelte -->
<script lang="ts">
  export let data;
</script>

<div class="app-container">
  <aside class="sidebar">
    <nav>
      <a href="/dashboard">📊 Dashboard</a>
      <a href="/projects">📁 Projects</a>
      <a href="/settings">⚙️ Settings</a>
    </nav>
    <div class="user-info">
      <img src={data.user.avatar} alt={data.user.name} />
      <p>{data.user.name}</p>
    </div>
  </aside>
  
  <main>
    <slot />
  </main>
</div>
```

---

#### 🔹 **@** - Breaking Out of Layouts

Il simbolo **@** permette di "rompere" l'ereditarietà dei layout.

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
- `+page@.svelte` → Reset al root layout
- `+page@admin.svelte` → Reset al layout della cartella "admin"
- `+page@(group).svelte` → Reset al layout del gruppo specifico

**Esempio pratico:**
```svelte
<!-- src/routes/admin/login/+page@.svelte -->
<!-- Questo @ fa sì che NON usi l'admin layout -->
<div class="fullscreen-login">
  <div class="login-card">
    <h1>Admin Login</h1>
    <form method="POST">
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button>Login</button>
    </form>
  </div>
</div>

<style>
  .fullscreen-login {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
</style>
```

---

### Custom Route Matchers (Param Matching)

Valida i parametri prima che la route venga matchata.

```typescript
// src/params/integer.ts
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  return /^\d+$/.test(param);
};
```

**Uso:**
```
src/routes/products/[id=integer]/+page.svelte
```

Ora `/products/123` matcha, ma `/products/abc` **NON** matcha (404).

**Altri esempi:**
```typescript
// src/params/slug.ts
export const match = (param) => {
  return /^[a-z0-9-]+$/.test(param);
};

// src/params/uuid.ts
export const match = (param) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(param);
};
```

---

### Advanced Routing Patterns

#### Pattern 1: Multi-language con Optional Params
```
routes/
└── [[lang]]/
    ├── +layout.server.ts
    ├── +page.svelte              → / or /en or /it
    ├── about/
    │   └── +page.svelte          → /about or /en/about
    └── blog/
        └── [slug]/
            └── +page.svelte      → /blog/post or /it/blog/post
```

#### Pattern 2: Admin + Auth con Route Groups
```
routes/
├── (auth)/
│   ├── +layout.svelte            # Layout semplice (no navbar)
│   ├── login/
│   │   └── +page.svelte          → /login
│   └── register/
│       └── +page.svelte          → /register
│
└── (protected)/
    ├── +layout.server.ts         # Auth check
    ├── +layout.svelte
    ├── dashboard/
    │   └── +page.svelte          → /dashboard
    └── (admin)/
        ├── +layout.server.ts     # Admin check
        └── users/
            └── +page.svelte      → /users (solo admin)
```

---

## Load Functions

### Universal Load (+page.ts)

```typescript
// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, url, parent, depends }) => {
  // ✅ fetch - usa questo invece di fetch nativo (gestisce cookies automaticamente)
  // ✅ params - parametri URL dinamici
  // ✅ url - oggetto URL completo
  // ✅ parent - await parent() per accedere ai dati del layout padre
  // ✅ depends - marca dipendenze custom per invalidazione
  
  const response = await fetch('/api/posts');
  const posts = await response.json();
  
  // Marca questa load come dipendente da 'posts'
  depends('app:posts');
  
  return { posts };
};

// Opzioni della pagina
export const prerender = true;  // Prerender questa pagina (SSG)
export const ssr = true;         // Server-side rendering (default: true)
export const csr = true;         // Client-side rendering (default: true)
export const trailingSlash = 'always'; // 'always' | 'never' | 'ignore'
```

### Server-Only Load (+page.server.ts)

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, cookies, request, url }) => {
  // 🔒 Gira SOLO sul server - può usare secrets, db, etc.
  
  // Controlla autenticazione
  if (!locals.user) {
    throw error(401, 'Unauthorized');
  }
  
  // Accedi al database
  const user = await db.users.findOne({ id: locals.userId });
  
  // Usa environment variables (server-only)
  const apiKey = process.env.SECRET_API_KEY;
  
  // Accedi ai cookies
  const theme = cookies.get('theme') || 'light';
  
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
      // ⚠️ NON includere password o token sensibili!
    },
    theme
  };
};
```

### Parent Data (Accesso ai dati del layout padre)

```typescript
// src/routes/+layout.server.ts
export const load = async ({ locals }) => {
  return {
    user: locals.user,
    theme: 'dark'
  };
};

// src/routes/dashboard/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  // Accedi ai dati del layout padre
  const { user, theme } = await parent();
  
  console.log('User from parent:', user);
  console.log('Theme from parent:', theme);
  
  return {
    // I tuoi dati qui
    dashboardData: 'xyz'
  };
};
```

### Streaming e Promise Unwrapping

```typescript
// src/routes/+page.server.ts
export const load = async () => {
  // ✨ SvelteKit "unwrappa" automaticamente le Promise!
  return {
    // Questa Promise viene risolta automaticamente
    posts: fetchPosts(),
    
    // Puoi anche mixare dati sincroni e asincroni
    user: { name: 'Mario' },
    stats: fetchStats(),
    
    // Streaming: i dati arrivano appena disponibili
    slowData: fetchSlowData() // Arriva dopo
  };
};
```

```svelte
<!-- +page.svelte -->
<script>
  export let data;
</script>

<!-- I dati sono già unwrappati! -->
<h1>Welcome {data.user.name}</h1>

{#await data.slowData}
  <p>Loading slow data...</p>
{:then slowData}
  <p>Slow data: {slowData}</p>
{/await}
```

### Invalidazione

```typescript
import { invalidate, invalidateAll } from '$app/navigation';

// Invalida tutte le load functions
invalidateAll();

// Invalida solo load functions che dipendono da questo URL
invalidate('/api/posts');

// Invalida usando depends()
invalidate('app:posts');

// Esempio pratico
function refreshPosts() {
  invalidate('app:posts');
}
```

---

## Form Actions

### Action Base

```typescript
// src/routes/login/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  // Redirect se già loggato
  if (locals.user) {
    throw redirect(303, '/dashboard');
  }
  
  return {};
};

export const actions: Actions = {
  // Azione default
  default: async ({ request, cookies, locals }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    // Validazione
    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required',
        email, // Ritorna il valore per ripopolare il form
        missing: true
      });
    }
    
    if (!email.includes('@')) {
      return fail(400, {
        error: 'Invalid email format',
        email,
        invalid: true
      });
    }
    
    // Autentica
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Invalid credentials',
        email,
        incorrect: true
      });
    }
    
    // Setta cookie
    cookies.set('session', user.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 giorni
    });
    
    // Redirect
    throw redirect(303, '/dashboard');
  }
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  export let form; // Risultati della form action
</script>

<h1>Login</h1>

<form method="POST">
  <label>
    Email
    <input 
      type="email" 
      name="email" 
      value={form?.email ?? ''} 
      required 
      aria-invalid={form?.invalid || form?.incorrect || undefined}
    />
  </label>
  
  <label>
    Password
    <input 
      type="password" 
      name="password" 
      required 
      aria-invalid={form?.incorrect || undefined}
    />
  </label>
  
  {#if form?.error}
    <p class="error" role="alert">{form.error}</p>
  {/if}
  
  <button type="submit">Login</button>
</form>

<style>
  .error {
    color: red;
    margin-top: 0.5rem;
  }
  
  input[aria-invalid="true"] {
    border-color: red;
  }
</style>
```

### Named Actions

```typescript
// src/routes/todos/+page.server.ts
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();
    const text = data.get('text')?.toString();
    
    if (!text || text.length < 3) {
      return fail(400, {
        error: 'Todo must be at least 3 characters',
        text
      });
    }
    
    await db.todos.create({
      text,
      userId: locals.user.id,
      completed: false
    });
    
    return { success: true };
  },
  
  toggle: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id')?.toString();
    
    if (!id) {
      return fail(400, { error: 'Missing todo ID' });
    }
    
    await db.todos.toggle(id);
    
    return { success: true };
  },
  
  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const id = data.get('id')?.toString();
    
    // Verifica proprietà
    const todo = await db.todos.findOne(id);
    if (todo.userId !== locals.user.id) {
      return fail(403, { error: 'Not authorized' });
    }
    
    await db.todos.delete(id);
    
    return { success: true };
  }
};
```

```svelte
<!-- src/routes/todos/+page.svelte -->
<script lang="ts">
  export let data;
  export let form;
</script>

<!-- Crea todo con azione 'create' -->
<form method="POST" action="?/create">
  <input 
    name="text" 
    placeholder="New todo..." 
    value={form?.text ?? ''}
  />
  {#if form?.error}
    <span class="error">{form.error}</span>
  {/if}
  <button>Add</button>
</form>

<!-- Lista todos -->
{#each data.todos as todo}
  <div class="todo">
    <!-- Toggle completamento -->
    <form method="POST" action="?/toggle">
      <input type="hidden" name="id" value={todo.id} />
      <button type="submit">
        {todo.completed ? '✓' : '○'}
      </button>
    </form>
    
    <span class:completed={todo.completed}>
      {todo.text}
    </span>
    
    <!-- Elimina -->
    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={todo.id} />
      <button type="submit">🗑️</button>
    </form>
  </div>
{/each}
```

---

## Progressive Enhancement

### Basic Enhancement

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  
  let loading = false;
</script>

<!-- Funziona ANCHE senza JavaScript! -->
<form 
  method="POST"
  use:enhance={() => {
    // Chiamato prima dell'invio
    loading = true;
    
    return async ({ update, result }) => {
      // Chiamato dopo la risposta
      await update();
      loading = false;
      
      if (result.type === 'success') {
        // Form submitted successfully
      }
    };
  }}
>
  <input name="email" />
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

### Advanced Enhancement con Optimistic UI

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  
  export let data;
  
  let optimisticTodos = data.todos;
  
  function addOptimistic(formData: FormData) {
    const text = formData.get('text')?.toString();
    if (text) {
      optimisticTodos = [
        ...optimisticTodos,
        { id: 'temp-' + Date.now(), text, completed: false }
      ];
    }
  }
  
  function removeOptimistic(id: string) {
    optimisticTodos = optimisticTodos.filter(t => t.id !== id);
  }
</script>

<form 
  method="POST" 
  action="?/create"
  use:enhance={({ formData }) => {
    // Aggiungi immediatamente (optimistic)
    addOptimistic(formData);
    
    return async ({ result }) => {
      if (result.type === 'success') {
        // Ricarica i dati reali
        await invalidateAll();
      } else {
        // Rollback in caso di errore
        optimisticTodos = data.todos;
      }
    };
  }}
>
  <input name="text" />
  <button>Add</button>
</form>

{#each optimisticTodos as todo}
  <div class:optimistic={todo.id.startsWith('temp-')}>
    {todo.text}
  </div>
{/each}

<style>
  .optimistic {
    opacity: 0.5;
  }
</style>
```

### Progressive Enhancement Best Practices

1. **Sempre usa `method="POST"`** per form actions
2. **`use:enhance`** è opzionale - il form funziona comunque!
3. **Usa `loading` state** per UX migliore
4. **Implementa optimistic UI** per apps real-time
5. **Gestisci errori** sia lato client che server

---

## Stores di SvelteKit

### $app/stores - Stores Built-in

```svelte
<script lang="ts">
  import { page, navigating, updated } from '$app/stores';
  
  // ✅ $page - Informazioni sulla pagina corrente
  // $page.url - URL corrente (oggetto URL)
  // $page.params - Parametri route dinamici
  // $page.route.id - Route ID (es: "/blog/[slug]")
  // $page.status - Status code HTTP
  // $page.error - Oggetto errore se presente
  // $page.data - Dati dalle load functions
  // $page.form - Risultato form action
  // $page.state - Navigation state (shallow routing)
  
  // ✅ $navigating - Stato navigazione (null se non stai navigando)
  // $navigating.from - Pagina di provenienza
  // $navigating.to - Pagina di destinazione
  // $navigating.type - Tipo: 'link', 'popstate', 'goto', 'form'
  // $navigating.willUnload - True se pagina verrà scaricata
  // $navigating.delta - +1 forward, -1 backward
  // $navigating.complete - Promise che si risolve quando navigazione completa
  
  // ✅ $updated - True se nuova versione app disponibile
</script>

<!-- Esempi pratici -->

<!-- 1. Mostra URL corrente -->
<h1>Current path: {$page.url.pathname}</h1>
<p>Query param 'q': {$page.url.searchParams.get('q')}</p>

<!-- 2. Accedi ai parametri dinamici -->
{#if $page.params.slug}
  <p>Post: {$page.params.slug}</p>
{/if}

<!-- 3. Loading spinner durante navigazione -->
{#if $navigating}
  <div class="progress-bar">
    Navigating to {$navigating.to.url.pathname}...
  </div>
{/if}

<!-- 4. Notifica aggiornamento app -->
{#if $updated}
  <div class="update-toast">
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
    aria-current={$page.url.pathname === '/home' ? 'page' : undefined}
  >
    Home
  </a>
  <a 
    href="/about" 
    class:active={$page.url.pathname.startsWith('/about')}
  >
    About
  </a>
</nav>
```

### Progress Bar Avanzato

```svelte
<script lang="ts">
  import { navigating } from '$app/stores';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut
  });
  
  $: if ($navigating) {
    progress.set(0.3); // Start
    
    // Incrementa lentamente fino al 90%
    const interval = setInterval(() => {
      if ($progress < 0.9) {
        progress.update(n => Math.min(n + 0.1, 0.9));
      }
    }, 500);
    
    // Completa quando la navigazione finisce
    $navigating.complete.then(() => {
      clearInterval(interval);
      progress.set(1);
      setTimeout(() => progress.set(0), 500);
    });
  }
</script>

{#if $progress > 0 && $progress < 1}
  <div class="progress-container">
    <div 
      class="progress-bar" 
      style="width: {$progress * 100}%"
    />
  </div>
{/if}

<style>
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(0,0,0,0.1);
    z-index: 9999;
  }
  
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.2s ease;
  }
</style>
```

---

## Hooks

### Server Hooks (src/hooks.server.ts)

```typescript
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// 🔐 Auth Hook
const authHook: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');
  
  if (session) {
    event.locals.user = await getUserFromSession(session);
  }
  
  return resolve(event);
};

// 📊 Logging Hook
const loggingHook: Handle = async ({ event, resolve }) => {
  const start = Date.now();
  
  const response = await resolve(event);
  
  const duration = Date.now() - start;
  console.log(`${event.request.method} ${event.url.pathname} - ${duration}ms`);
  
  return response;
};

// 🛡️ Security Headers Hook
const securityHook: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );
  
  return response;
};

// Combina tutti gli hooks in sequenza
export const handle = sequence(authHook, loggingHook, securityHook);

// handleFetch - Modifica fetch requests
export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
  // Aggiungi auth header alle chiamate API interne
  if (request.url.startsWith('https://api.myapp.com/')) {
    request.headers.set('Authorization', `Bearer ${event.locals.user?.token}`);
  }
  
  // Aggiungi custom headers
  request.headers.set('X-Custom-Header', 'value');
  
  return fetch(request);
};

// handleError - Gestione errori
export const handleError: HandleServerError = async ({ error, event, status, message }) => {
  const errorId = crypto.randomUUID();
  
  // Log error (usa un servizio di monitoring in produzione)
  console.error({
    errorId,
    status,
    message,
    error,
    url: event.url.pathname,
    user: event.locals.user?.id
  });
  
  // Non esporre dettagli sensibili al client
  return {
    message: status === 500 
      ? 'Internal server error' 
      : message,
    errorId
  };
};
```

### Client Hooks (src/hooks.client.ts)

```typescript
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event, status, message }) => {
  const errorId = crypto.randomUUID();
  
  // Log su servizio esterno (es: Sentry)
  console.error('Client error:', {
    errorId,
    error,
    url: event.url.pathname
  });
  
  return {
    message: 'Something went wrong',
    errorId
  };
};
```

### Hook Avanzati - Rate Limiting

```typescript
// src/hooks.server.ts
import { error } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const rateLimitHook: Handle = async ({ event, resolve }) => {
  const ip = event.getClientAddress();
  const now = Date.now();
  
  const limit = rateLimitMap.get(ip);
  
  if (limit) {
    if (now < limit.resetTime) {
      if (limit.count >= 100) {
        throw error(429, 'Too many requests');
      }
      limit.count++;
    } else {
      // Reset
      rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
  }
  
  return resolve(event);
};
```

---

## State Management (Svelte 5 Runes)

### 🔹 `$state` - Stato Reattivo

```svelte
<script lang="ts">
  // ✅ Variabile reattiva semplice
  let count = $state(0);
  
  // ✅ Oggetti - deep reactivity automatica!
  let user = $state({
    name: 'Mario',
    age: 25,
    settings: {
      theme: 'dark',
      notifications: true
    }
  });
  
  // ✅ Array - tutti i metodi funzionano!
  let todos = $state([
    { id: 1, text: 'Learn SvelteKit', done: false },
    { id: 2, text: 'Build app', done: false }
  ]);
  
  function increment() {
    count++; // Reattivo!
  }
  
  function updateNested() {
    user.settings.theme = 'light'; // Reattivo anche nested!
  }
  
  function addTodo() {
    todos.push({ 
      id: Date.now(), 
      text: 'New todo', 
      done: false 
    }); // Reattivo!
  }
  
  function toggleTodo(id: number) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.done = !todo.done; // Reattivo!
  }
</script>

<button onclick={increment}>Count: {count}</button>
<button onclick={updateNested}>Theme: {user.settings.theme}</button>
<button onclick={addTodo}>Add Todo</button>

{#each todos as todo}
  <div>
    <input 
      type="checkbox" 
      checked={todo.done}
      onchange={() => toggleTodo(todo.id)}
    />
    {todo.text}
  </div>
{/each}
```

### 🔹 `$derived` - Valori Calcolati

```svelte
<script lang="ts">
  let firstName = $state('Mario');
  let lastName = $state('Rossi');
  
  // ✅ Si ricalcola automaticamente quando firstName o lastName cambiano
  let fullName = $derived(`${firstName} ${lastName}`);
  
  let items = $state([
    { name: 'Apple', price: 1.5, quantity: 3 },
    { name: 'Banana', price: 0.8, quantity: 5 }
  ]);
  
  // ✅ Calcoli complessi
  let total = $derived(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  
  let hasDiscount = $derived(total > 10);
  let finalPrice = $derived(hasDiscount ? total * 0.9 : total);
  
  // ✅ Derived da altri derived
  let formattedPrice = $derived(`€${finalPrice.toFixed(2)}`);
</script>

<input bind:value={firstName} />
<input bind:value={lastName} />
<p>Full name: {fullName}</p>

<p>Total: €{total.toFixed(2)}</p>
{#if hasDiscount}
  <p class="discount">10% discount applied!</p>
{/if}
<p class="final">Final price: {formattedPrice}</p>
```

### 🔹 `$effect` - Side Effects

```svelte
<script lang="ts">
  let count = $state(0);
  let name = $state('Mario');
  
  // ✅ Eseguito ogni volta che 'count' cambia
  $effect(() => {
    console.log(`Count è ora: ${count}`);
    document.title = `Count: ${count}`;
  });
  
  // ✅ Effect con cleanup
  $effect(() => {
    const interval = setInterval(() => {
      count++;
    }, 1000);
    
    // 🧹 Cleanup - eseguito quando:
    // - Il componente viene distrutto
    // - Prima che l'effect venga ri-eseguito
    return () => {
      clearInterval(interval);
    };
  });
  
  // ✅ LocalStorage sync
  $effect(() => {
    localStorage.setItem('user-name', name);
  });
  
  // ✅ Effect condizionale
  $effect(() => {
    if (count >= 10) {
      alert('Hai raggiunto 10!');
    }
  });
</script>

<input bind:value={name} />
<p>Count: {count} (auto-incrementa)</p>
```

### 🔹 `$props` e `$bindable`

```svelte
<!-- Counter.svelte (componente figlio) -->
<script lang="ts">
  // Props normali
  let { 
    initialValue = 0,
    max = 100,
    step = 1
  } = $props();
  
  // Prop bindable (two-way binding)
  let { value = $bindable(initialValue) } = $props();
  
  function increment() {
    if (value < max) {
      value += step;
    }
  }
  
  function decrement() {
    if (value > 0) {
      value -= step;
    }
  }
</script>

<div class="counter">
  <button onclick={decrement} disabled={value <= 0}>-</button>
  <span>{value}</span>
  <button onclick={increment} disabled={value >= max}>+</button>
</div>
```

```svelte
<!-- Parent.svelte -->
<script lang="ts">
  import Counter from './Counter.svelte';
  
  let myCount = $state(5);
  
  // Effect per monitorare i cambiamenti
  $effect(() => {
    console.log('Count changed to:', myCount);
    
    if (myCount === 50) {
      alert('Metà strada!');
    }
  });
</script>

<Counter 
  bind:value={myCount} 
  max={100} 
  step={5}
/>

<p>Parent count: {myCount}</p>
<button onclick={() => myCount = 0}>Reset</button>
```

### 💡 $state vs Svelte Stores

| Caratteristica | $state (Runes) | Stores |
|---------------|----------------|--------|
| **Uso** | Componente-locale | Globale/condiviso |
| **Sintassi** | `let x = $state(0)` | `const x = writable(0)` |
| **Accesso** | Diretto: `x` | Con $: `$x` |
| **Performance** | Più veloce | Leggera overhead |
| **Persistence** | No (solo memoria) | Possibile (localStorage) |

**Quando usare cosa:**
- ✅ **$state** per stato locale del componente
- ✅ **Stores** per stato condiviso tra componenti

---

### Stores Globali (quando serve)

```typescript
// src/lib/stores/auth.ts
import { writable, derived } from 'svelte/store';
import type { User } from '$lib/types';

function createAuthStore() {
  const { subscribe, set, update } = writable<User | null>(null);
  
  return {
    subscribe,
    login: (user: User) => set(user),
    logout: () => set(null),
    updateProfile: (data: Partial<User>) => 
      update(u => u ? { ...u, ...data } : null)
  };
}

export const user = createAuthStore();
export const isAuthenticated = derived(user, $user => $user !== null);
export const isAdmin = derived(user, $user => $user?.role === 'admin');
```

```svelte
<!-- Uso negli altri componenti -->
<script lang="ts">
  import { user, isAuthenticated } from '$lib/stores/auth';
</script>

{#if $isAuthenticated}
  <p>Welcome {$user.name}!</p>
{:else}
  <a href="/login">Login</a>
{/if}
```

---

## ❌ Gestione Errori

### Error Page Custom

```svelte
<!-- src/routes/+error.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="error-container">
  <h1>{$page.status}</h1>
  
  {#if $page.status === 404}
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  {:else if $page.status === 500}
    <h2>Internal Server Error</h2>
    <p>Something went wrong on our end.</p>
  {:else}
    <h2>Error</h2>
    <p>{$page.error?.message}</p>
  {/if}
  
  <a href="/">Go home</a>
  
  {#if $page.error?.errorId}
    <p class="error-id">Error ID: {$page.error.errorId}</p>
  {/if}
</div>

<style>
  .error-container {
    min-height: 100vh;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 2rem;
  }
  
  h1 {
    font-size: 6rem;
    color: #666;
  }
  
  .error-id {
    font-size: 0.875rem;
    color: #999;
    margin-top: 2rem;
  }
</style>
```

### Throw Error in Load Functions

```typescript
// src/routes/blog/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/posts/${params.slug}`);
  
  if (response.status === 404) {
    throw error(404, {
      message: 'Post not found',
      slug: params.slug
    });
  }
  
  if (!response.ok) {
    throw error(response.status, 'Failed to load post');
  }
  
  return {
    post: await response.json()
  };
};
```

### Error Handling in Form Actions

```typescript
// src/routes/contact/+page.server.ts
import { fail, error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    
    // Validation error (400) - ritorna i dati al form
    if (!email?.includes('@')) {
      return fail(400, {
        error: 'Invalid email',
        email,
        field: 'email'
      });
    }
    
    try {
      await sendEmail(email);
      return { success: true };
    } catch (err) {
      // Server error (500) - mostra error page
      throw error(500, 'Failed to send email');
    }
  }
};
```

### Expected Errors vs Unexpected Errors

```typescript
// ✅ Expected error - usa fail()
if (!valid) {
  return fail(400, { message: 'Invalid input' });
}

// ❌ Unexpected error - usa throw error()
if (criticalSystemFailure) {
  throw error(500, 'System failure');
}
```

---

## Adapters e Deployment

### Adapter Auto (Default - Raccomandato)

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';

export default {
  kit: {
    adapter: adapter()
  }
};
```

Rileva automaticamente la piattaforma:
- Vercel → adapter-vercel
- Netlify → adapter-netlify
- Cloudflare Pages → adapter-cloudflare

### Adapter Vercel

```bash
npm install @sveltejs/adapter-vercel
```

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x',
      regions: ['iad1'], // Region specific
      split: false // Code splitting
    })
  }
};
```

**Deploy:**
```bash
# Automatic con Git push
git push

# O manualmente
vercel
```

### Adapter Node (Self-hosted)

```bash
npm install @sveltejs/adapter-node
```

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter({
      out: 'build',
      precompress: true,
      envPrefix: 'MY_'
    })
  }
};
```

**Deploy:**
```bash
npm run build
node build/index.js

# Con PM2
pm2 start build/index.js --name my-app

# Con Docker
FROM node:20-alpine
COPY . .
RUN npm ci && npm run build
CMD ["node", "build"]
```

### Adapter Static (SSG)

```bash
npm install @sveltejs/adapter-static
```

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // SPA fallback
      precompress: false,
      strict: true
    })
  }
};
```

**Nelle routes:**
```typescript
// src/routes/+page.ts
export const prerender = true; // Prerender questa pagina

// src/routes/+layout.ts
export const prerender = true; // Prerender tutto
```

### Adapter Cloudflare

```bash
npm install @sveltejs/adapter-cloudflare
```

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';

export default {
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  }
};
```

### Quale Adapter Scegliere?

| Adapter | Quando usarlo |
|---------|---------------|
| **Auto** | Default, lascia decidere alla piattaforma |
| **Vercel** | Deploy su Vercel, edge functions |
| **Node** | Self-hosted, VPS, Docker |
| **Static** | Blog, documentazione, siti statici |
| **Cloudflare** | Cloudflare Pages/Workers, edge computing |
| **Netlify** | Deploy su Netlify |

---

## 🌐 API Routes Avanzate

### RESTful API Completa

```typescript
// src/routes/api/users/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';

// GET /api/users
export const GET: RequestHandler = async ({ url, locals }) => {
  // Controlla autenticazione
  if (!locals.user) {
    throw error(401, 'Unauthorized');
  }
  
  // Query parameters
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 10;
  const search = url.searchParams.get('search') || '';
  
  const offset = (page - 1) * limit;
  
  const users = await db.users.findMany({
    where: search ? { name: { contains: search } } : {},
    take: limit,
    skip: offset
  });
  
  const total = await db.users.count();
  
  return json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }, {
    headers: {
      'Cache-Control': 'max-age=60' // Cache per 1 minuto
    }
  });
};

// POST /api/users
export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user?.isAdmin) {
    throw error(403, 'Forbidden');
  }
  
  const data = await request.json();
  
  // Validazione
  if (!data.email || !data.name) {
    throw error(400, 'Missing required fields');
  }
  
  // Check duplicati
  const existing = await db.users.findOne({ email: data.email });
  if (existing) {
    throw error(409, 'User already exists');
  }
  
  const user = await db.users.create({ data });
  
  return json(user, { status: 201 });
};
```

### CORS e Headers

```typescript
// src/routes/api/public/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export const OPTIONS: RequestHandler = async () => {
  return new Response(null, {
    headers: corsHeaders
  });
};

export const GET: RequestHandler = async () => {
  return json({ message: 'Public API' }, {
    headers: corsHeaders
  });
};
```

### Webhook Handler

```typescript
// src/routes/api/webhooks/stripe/+server.ts
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  if (!signature) {
    throw error(400, 'Missing signature');
  }
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    throw error(400, `Webhook Error: ${err.message}`);
  }
  
  // Gestisci eventi
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentSuccess(paymentIntent);
      break;
      
    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCreated(subscription);
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  return json({ received: true });
};
```

---

## ⚡ Streaming e Loading States

### Streaming con Promises

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    // Dati veloci - caricano subito
    user: await getUser(),
    
    // Dati lenti - streaming!
    stats: getStats(), // Promise non awaited
    notifications: getNotifications(), // Promise non awaited
    
    // Mix di entrambi
    quickData: { count: 42 },
    slowData: getSlowData() // Promise
  };
};
```

```svelte
<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<!-- User è già disponibile -->
<h1>Welcome {data.user.name}</h1>
<p>Quick data: {data.quickData.count}</p>

<!-- Stats in streaming -->
{#await data.stats}
  <div class="skeleton">Loading stats...</div>
{:then stats}
  <div class="stats">
    <div>Posts: {stats.posts}</div>
    <div>Views: {stats.views}</div>
  </div>
{:catch error}
  <p>Failed to load stats: {error.message}</p>
{/await}

<!-- Notifications in streaming -->
{#await data.notifications}
  <div class="skeleton">Loading notifications...</div>
{:then notifications}
  <ul>
    {#each notifications as notif}
      <li>{notif.message}</li>
    {/each}
  </ul>
{/await}
```

### Loading States con Skeleton UI

```svelte
<script lang="ts">
  export let data;
</script>

{#await data.posts}
  <!-- Skeleton loader -->
  <div class="posts">
    {#each Array(3) as _}
      <div class="post-skeleton">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>
    {/each}
  </div>
{:then posts}
  <!-- Real content -->
  <div class="posts">
    {#each posts as post}
      <article>{post.title}</article>
    {/each}
  </div>
{/await}

<style>
  .skeleton-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  .skeleton-line {
    height: 12px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  
  .skeleton-line.short {
    width: 60%;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>
```

---

## Librerie di Animazione

### GSAP (GreenSock)

```bash
npm install gsap
```

**Sito:** https://gsap.com

```svelte
<script lang="ts">
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { onMount } from 'svelte';
  
  gsap.registerPlugin(ScrollTrigger);
  
  let box: HTMLElement;
  let text: HTMLElement;
  
  onMount(() => {
    // Animazione base
    gsap.from(box, {
      x: -300,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    // Con ScrollTrigger
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      },
      y: 100,
      opacity: 0
    });
    
    // Timeline
    const tl = gsap.timeline();
    tl.to(box, { rotation: 360, duration: 2 })
      .to(box, { scale: 1.5, duration: 1 })
      .to(box, { x: 200, duration: 1 });
  });
</script>

<div bind:this={box} class="box">Animato con GSAP</div>
<div bind:this={text} class="text">Scroll per animare</div>
```

### Motion One

```bash
npm install motion
```

**Sito:** https://motion.dev

```svelte
<script lang="ts">
  import { animate, scroll } from 'motion';
  import { onMount } from 'svelte';
  
  let element: HTMLElement;
  
  onMount(() => {
    // Animazione semplice
    animate(
      element,
      { x: [0, 100, 0] },
      { duration: 2, repeat: Infinity }
    );
    
    // Scroll-linked animation
    scroll(
      animate(element, { opacity: [0, 1] }),
      { target: element }
    );
  });
</script>

<div bind:this={element}>Animazione fluida</div>
```

### Svelte Motion (Built-in)

```svelte
<script lang="ts">
  import { tweened, spring } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fade, fly, slide, scale } from 'svelte/transition';
  
  let visible = true;
  
  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut
  });
  
  const coords = spring({ x: 50, y: 50 }, {
    stiffness: 0.1,
    damping: 0.25
  });
</script>

{#if visible}
  <div transition:fade>Fade</div>
  <div in:fly={{ y: 200, duration: 300 }}>Fly in</div>
  <div transition:slide>Slide</div>
  <div transition:scale>Scale</div>
{/if}

<button onclick={() => progress.set(1)}>
  Progress: {$progress.toFixed(2)}
</button>
```

### Anime.js

```bash
npm install animejs
```

**Sito:** https://animejs.com

```svelte
<script lang="ts">
  import anime from 'animejs';
  import { onMount } from 'svelte';
  
  onMount(() => {
    anime({
      targets: '.box',
      translateX: 250,
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 800
    });
  });
</script>
```

---

## Librerie UI Components

### shadcn-svelte ⭐ (Raccomandato)

```bash
npx shadcn-svelte@latest init
npx shadcn-svelte@latest add button card dialog
```

**Sito:** https://www.shadcn-svelte.com

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
</script>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Click me</Button>
  </CardContent>
</Card>
```

### Skeleton UI

```bash
npm create skeleton-app@latest my-app
```

**Sito:** https://www.skeleton.dev

```svelte
<script>
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>My App</AppBar>
  </svelte:fragment>
  
  <slot />
</AppShell>
```

### Flowbite Svelte

```bash
npm install flowbite-svelte flowbite
```

**Sito:** https://flowbite-svelte.com

### Melt UI (Headless)

```bash
npm install @melt-ui/svelte
```

**Sito:** https://melt-ui.com

Perfetto per creare componenti custom con accessibilità integrata.

### Bits UI (Headless)

```bash
npm install bits-ui
```

**Sito:** https://bits-ui.com

### Carbon Components Svelte

```bash
npm install carbon-components-svelte
```

**Sito:** https://carbon-components-svelte.onrender.com

Design system IBM Carbon.

---

## Best Practices

### 1. Struttura Progetto

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/          # UI components riutilizzabili
│   │   ├── forms/       # Form components
│   │   └── layout/      # Layout components
│   ├── server/          # Codice solo server (DB, auth)
│   │   ├── database.ts
│   │   ├── auth.ts
│   │   └── email.ts
│   ├── stores/          # Global stores
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── config/          # Configurazioni
├── routes/
│   ├── (app)/           # Protected routes
│   ├── (auth)/          # Auth routes
│   └── api/             # API endpoints
└── params/              # Custom matchers
```

### 2. TypeScript Best Practices

```typescript
// ✅ Usa i tipi generati
import type { PageData, ActionData } from './$types';

// ✅ Definisci types riutilizzabili
export interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Usa const assertions
export const ROLES = ['admin', 'user'] as const;
export type Role = typeof ROLES[number];
```

### 3. Performance Tips

```typescript
// ✅ Prerender pagine statiche
export const prerender = true;

// ✅ Code splitting con dynamic imports
const HeavyComponent = lazy(() => import('$lib/components/Heavy.svelte'));

// ✅ Lazy load immagini
<img loading="lazy" src={url} alt={alt} />

// ✅ Usa {#key} per re-render controllato
{#key userId}
  <UserProfile {userId} />
{/key}
```

### 4. Security

```typescript
// ✅ Valida sempre l'input
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// ✅ Usa CSRF protection (automatico con form actions)
// ✅ Sanitizza HTML
import DOMPurify from 'isomorphic-dompurify';
const clean = DOMPurify.sanitize(dirty);

// ✅ Rate limiting (vedi hooks)
```

### 5. SEO

```svelte
<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
```

---

## Performance Tips Avanzati

### 1. Ottimizzazione Immagini

```svelte
<script>
  import { browser } from '$app/environment';
</script>

<picture>
  <source 
    type="image/webp" 
    srcset="/img/hero.webp" 
  />
  <img 
    src="/img/hero.jpg" 
    alt="Hero"
    loading="lazy"
    decoding="async"
    width={800}
    height={600}
  />
</picture>
```

### 2. Prefetching

```svelte
<!-- Prefetch on hover -->
<a href="/blog" data-sveltekit-prefetch>Blog</a>

<!-- Prefetch on viewport -->
<a href="/about" data-sveltekit-preload-data="viewport">About</a>

<!-- No prefetch -->
<a href="/external" data-sveltekit-preload-data="off">External</a>
```

### 3. Bundle Size Optimization

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte', '@sveltejs/kit'],
          charts: ['chart.js']
        }
      }
    }
  }
};
```

---

## Environment Variables

```bash
# .env
PUBLIC_API_URL=https://api.example.com
PRIVATE_API_KEY=secret123
DATABASE_URL=postgresql://...
```

```typescript
// Accesso nel codice
import { PUBLIC_API_URL } from '$env/static/public';
import { PRIVATE_API_KEY } from '$env/static/private';
import { env } from '$env/dynamic/private';

// PUBLIC_* = esposto al client
// Senza PUBLIC_ = solo server
```

---

## Risorse Utili

### Documentazione
- **SvelteKit Docs:** https://svelte.dev/docs/kit
- **Svelte Docs:** https://svelte.dev/docs
- **Tutorial Interattivo:** https://svelte.dev/tutorial
- **Examples:** https://github.com/sveltejs/kit/tree/master/examples

### Community
- **Discord:** https://svelte.dev/chat
- **Reddit:** https://reddit.com/r/sveltejs
- **GitHub:** https://github.com/sveltejs/kit
- **Svelte Society:** https://www.sveltesociety.dev

### Learning
- **Svelte Master:** https://www.sveltemaster.com
- **Joy of Code:** https://joyofcode.xyz/sveltekit
- **Svelte School:** https://svelte.school

### Tools
- **VS Code Extension:** Svelte for VS Code
- **SvelteKit Devtools:** Browser extension
- **Svelte DevTools:** Chrome/Firefox extension

### Deployment
- **Vercel:** https://vercel.com
- **Netlify:** https://netlify.com
- **Cloudflare Pages:** https://pages.cloudflare.com
- **Railway:** https://railway.app
- **Fly.io:** https://fly.io

### Packages
- **Svelte Society:** https://www.sveltesociety.dev/packages
- **npm:** https://www.npmjs.com/search?q=svelte
- **Awesome Svelte:** https://github.com/TheComputerM/awesome-svelte

---

## Conclusione

Questa guida copre:
- ✅ Setup e CLI completi
- ✅ Routing avanzato con tutti i pattern
- ✅ Load functions e data fetching
- ✅ Form actions e progressive enhancement
- ✅ State management con Runes (Svelte 5)
- ✅ Hooks e middleware
- ✅ Gestione errori
- ✅ API routes e webhooks
- ✅ Streaming e performance
- ✅ Animazioni e UI libraries
- ✅ Best practices e security
- ✅ Deployment su tutte le piattaforme

**Prossimi passi:**
1. Crea il tuo primo progetto con `npx sv create`
2. Esplora gli esempi ufficiali
3. Unisciti alla community Discord
4. Costruisci qualcosa di fantastico! 🚀

**Buon coding con SvelteKit!** 🎉