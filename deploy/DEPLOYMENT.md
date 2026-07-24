# Deploying the portfolio (free, 24/7) at https://arushugal.is-a.dev

The site is a static Vite/React app in `frontend/`. Content is embedded and the
contact form posts to Formspree, so **no backend needs to be hosted** — a free
static host is enough and never sleeps.

Host: **Vercel**  ·  Domain: **arushugal.is-a.dev** (free, via is-a-dev)

---

## Step 1 — Push your latest code to GitHub

```bash
git add .
git commit -m "Portfolio site ready for deploy"
git push origin main
```

## Step 2 — Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. **Add New… → Project**, import `tinu8888/resume-claude`.
3. Set **Root Directory** to `frontend` (click "Edit" next to Root Directory and pick the `frontend` folder). Framework preset should auto-detect **Vite**.
4. Under **Environment Variables**, add your Formspree id:
   - Name: `VITE_FORMSPREE_ID`
   - Value: `your-formspree-id` (the part after `/f/` in your Formspree URL)
5. Click **Deploy**. You'll get a live URL like `resume-claude.vercel.app`.

## Step 3 — Add the custom domain in Vercel

1. In your Vercel project: **Settings → Domains**.
2. Enter `arushugal.is-a.dev` and click **Add**.
3. Vercel will show it's pending DNS and expects a **CNAME → `cname.vercel-dns.com`**.
   (That's exactly what the is-a-dev record below provides.)

## Step 4 — Claim the free is-a.dev subdomain

1. Go to https://github.com/is-a-dev/register and click **Fork**.
2. In your fork, create a new file: `domains/arushugal.json`
3. Paste the contents of [`is-a-dev/arushugal.json`](./is-a-dev/arushugal.json) in this repo:

   ```json
   {
     "owner": {
       "username": "tinu8888",
       "email": "arushugal@gmail.com"
     },
     "description": "Arush Ugal — Backend Software Engineer portfolio",
     "repo": "https://github.com/tinu8888/resume-claude",
     "records": {
       "CNAME": "cname.vercel-dns.com"
     }
   }
   ```

   > The **filename** is the subdomain: `arushugal.json` → `arushugal.is-a.dev`.
   > Read `is-a-dev/register`'s CONTRIBUTING/README first — requirements change
   > occasionally (e.g. no proxied records with a bare CNAME).

4. Commit and open a **Pull Request** to `is-a-dev/register`.
5. Once a maintainer merges it, DNS propagates (minutes to a few hours). Vercel
   will detect the CNAME, verify the domain, and auto-issue an HTTPS certificate.

## Done

`https://arushugal.is-a.dev` will serve the portfolio, always on, for free.
Every future `git push` to `main` auto-redeploys via Vercel.

---

### Notes
- **Formspree first-run:** after adding `VITE_FORMSPREE_ID`, submit one test
  message and confirm the verification email so submissions start reaching you.
- **The Spring Boot backend is optional** and not part of this deploy. If you
  later want the live site to read content from the API instead of the embedded
  data, host the backend somewhere that stays awake and set `VITE_API_BASE_URL`.
