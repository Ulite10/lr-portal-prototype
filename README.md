# Lead Retrieval Portal — Prototype

Static HTML prototype of a lead retrieval ecommerce portal — exhibitor storefront + admin console.

## Files

| File | Route | Description |
|---|---|---|
| `index.html` | `/` | White-labeled exhibitor storefront (Order, Add-ons, Leads, Billing tabs) |
| `admin.html` | `/admin` | Admin console (Products & Services, Exhibitors with export) |
| `vercel.json` | — | Clean URL config (drops `.html` suffix) |

## Deploy to Vercel

### Option A — Vercel CLI (60 seconds, no git)

```bash
cd lr-portal-prototype
npm install -g vercel    # one-time
vercel                   # follow prompts → live URL
vercel --prod            # promote to production
```

### Option B — Git + Vercel auto-deploy

```bash
# from this folder
git init
git add .
git commit -m "Initial prototype"
git branch -M main
git remote add origin https://github.com/<your-org>/lr-portal-prototype.git
git push -u origin main
```

Then in the Vercel dashboard, connect a project to the repo.

### Option C — Branch on an existing repo

```bash
# from your cloned repo
git checkout -b lr-portal-prototype
cp -r /Users/ulianalutchyn/Documents/Leadature/lr-portal-prototype/* .
git add .
git commit -m "Add prototype"
git push origin lr-portal-prototype
```

Vercel will auto-create a preview at a branch-specific URL.

## Routes (with cleanUrls enabled)

- `/` → exhibitor portal
- `/admin` → admin console

## Next steps

To make this prototype real:

1. **Database** — Supabase (Postgres + auth)
2. **Payments** — Stripe Checkout
3. **Admin backend** — Retool pointed at Supabase, or build into the same app
4. **Integrations** — Webhooks + REST API for partner systems
