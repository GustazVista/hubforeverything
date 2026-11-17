# Knowledge Hub — local-first website

Your data is stored **on your own device** (in the browser's database). Nothing is sent to a server and there is no sign-in.
The website itself can be hosted on GitHub Pages; each browser/device keeps its own private data.

## Put it online (GitHub Pages)
1. github.com → New repository → upload index.html, config.js, README.md and .nojekyll (files at the top level).
2. Settings → Pages → Source "Deploy from a branch" → main / (root) → Save.
3. Open https://YOUR-USER.github.io/YOUR-REPO/

## Keep everything in one place
Open **Settings → Data**:
- **Link a data file** (Chrome / Edge): pick a file on your computer; the site keeps it updated automatically.
- **Export backup**: one file with everything, including Library files. **Import backup** restores it (also on another device).
Do an export now and then — clearing your browser data erases the local database.

## Translator (optional)
Google Cloud → enable "Cloud Translation API" → Credentials → API key (restrict to your site URL) → paste into config.js (gtKey).

## Password manager
Create a master password the first time. Passwords are encrypted (AES-256) on your device. If you forget the master password they cannot be recovered.
