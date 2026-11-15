# Knowledge Hub (Next.js + Supabase + Google sign-in)

## 1. Supabase
1. Create a project at supabase.com. Run `supabase/schema.sql` in **SQL Editor**.
2. **Project Settings → API**: copy the Project URL and anon key into `.env.local` (see `.env.example`).

## 2. Google sign-in
1. Google Cloud Console → **APIs & Services → Credentials → Create OAuth client ID** (Web application).
2. Authorized redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`.
3. Supabase → **Authentication → Providers → Google**: enable, paste the Client ID and Client Secret.
4. Supabase → **Authentication → URL Configuration**: Site URL = your Vercel URL; add Redirect URLs `http://localhost:3000/**` and `https://YOUR-APP.vercel.app/**`.

## 3. Run
```
npm install
cp .env.example .env.local   # then fill in the two values
npm run dev
```
## 4. Deploy
Push to GitHub, import in Vercel, add the same two env vars.

Every user signs in with their own Google account and sees only their own rows (Row Level Security).
