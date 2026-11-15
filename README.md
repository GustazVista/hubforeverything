# Knowledge Hub — static website (GitHub Pages) with Google sign-in

Files: `index.html` (the site), `config.js` (your Supabase keys), `schema.sql` (database).

## 1. Put it on GitHub Pages
1. Create a GitHub repository and upload everything in this folder (files at the top level, including `.nojekyll`).
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
3. After a minute your site is at `https://YOUR-USER.github.io/YOUR-REPO/`.

## 2. Database (Supabase)
1. Create a free project at supabase.com. In **SQL Editor** run `schema.sql`.
2. **Project Settings → API**: copy *Project URL* and *anon public key* into `config.js`, commit.

## 3. Google sign-in
1. Google Cloud Console → **APIs & Services → Credentials → Create credentials → OAuth client ID** (Web application).
   Authorized redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
2. Supabase → **Authentication → Providers → Google**: enable and paste Client ID + Secret.
3. Supabase → **Authentication → URL Configuration**:
   Site URL = `https://YOUR-USER.github.io/YOUR-REPO/` and add the same URL under *Redirect URLs*.

Every person signs in with their own Google account and gets their own private data.
Without `config.js` filled in, the site still opens and works with local-only profiles.
