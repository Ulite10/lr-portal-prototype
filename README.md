# Lead Retrieval Portal — Prototype

A UX prototype of a lead retrieval ecommerce portal for partner-mediated event sales. Two views: an **exhibitor portal** (white-labeled storefront for buying/managing LR at a partner event) and an **admin console** (internal product catalog, exhibitor management, settings).

**Live preview:** https://lr-portal-prototype.vercel.app

- `/` → exhibitor portal
- `/admin` → admin console

---

## Why this exists

This prototype anchors the conversation with a partner who's evaluating us as a replacement for their current LR vendor. The current vendor's portal is functional but dated; this prototype shows what a modern, modular, white-labelable version would look like.

It is intentionally **front-end only** — no real database, payments, or authentication. The goal is to validate UX and structure with the partner before committing engineering to Stage 2 (production build).

---

## Tech & file structure

Plain HTML + CSS + vanilla JS. No build step, no framework, no dependencies.

```
lr-portal-prototype/
├── index.html          # Exhibitor portal (entry at /)
├── admin.html          # Admin console (entry at /admin)
├── vercel.json         # Clean URL config (cleanUrls: true)
├── .gitignore
└── README.md
```

Each HTML file is fully self-contained — all CSS in `<style>`, all JS in `<script>` at the bottom. Easy to read, easy to edit.

---

## Running locally

No build. Just open the files:

```bash
# Open in default browser
open index.html
open admin.html

# Or run a local server (cleaner URLs)
python3 -m http.server 8000
# then visit http://localhost:8000/index.html and /admin.html
```

---

## Deploying to Vercel

Already wired up to https://lr-portal-prototype.vercel.app.

```bash
# Push code to GitHub → Vercel auto-deploys (if Git is connected)
git push

# Or deploy manually via CLI
npx vercel --prod
```

To connect this repo to the Vercel project so pushes auto-deploy:
Vercel dashboard → `lr-portal-prototype` → Settings → Git → Connect Git Repository → pick this repo.

---

## What the prototype demonstrates

### Exhibitor portal (`index.html`)

Three tabs:

1. **Products & Order** — current package banner, three upgrade cards (Basic / Pro / Enterprise), rental cards (iPhone / iPad — with real Leadature app screens), add-ons form with quantity controls, and a live-updating order summary.
2. **Leads** — captured leads table with dummy data based on a real LR export structure (Follow-up, Product Interest, Notes, Opt-in, device, scan time). Lead delivery pipeline shown at the top. CSV export button (visual only).
3. **Billing** — billing contact, address, payment method form (visual only).

**Live pricing:** quantity steppers on rentals and add-ons drive a `recalculate()` function that updates per-row subtotals, the order summary, and the checkout button. Clicking "Checkout & pay" opens a payment modal that transitions to a success state.

### Admin console (`admin.html`)

Four sections in the sidebar:

1. **Products & Services** — package cards (Basic / Pro / Enterprise), rental cards (iPhone / iPad), add-ons table. Every item is editable via an inline modal that updates the card/row in place. "+ Add product" lets you add a new item as a Card or Inline row.
2. **Exhibitors** — list of 15 dummy exhibitors with status, package, add-ons, total. Search and filter UI (filters are visual only). Export-CSV button.
3. **Analytics** — KPIs (revenue, exhibitors purchased, conversion, AOV) + a flat list of every product with sold/attached counts.
4. **Settings** — event details, branding package upload (logo, colors, branding kit zip), Stripe integration card.

---

## What's mocked vs. what's wired

| Feature | State |
|---|---|
| Toggle between exhibitor / admin views | ✅ Wired (demo bar top-right) |
| Quantity steppers + live total recalc | ✅ Wired |
| Order summary + checkout modal + success state | ✅ Wired (UI only) |
| Edit product modal (saves changes to the card) | ✅ Wired |
| Add product modal (creates new cards/rows in-page) | ✅ Wired |
| Tab navigation | ✅ Wired |
| Sidebar nav | ✅ Wired |
| **Payment processing** | ❌ Mock — clicking "Confirm payment" just shows success screen |
| **Data persistence** | ❌ Mock — refresh wipes any changes |
| **Authentication** | ❌ None — no login |
| **Backend / DB** | ❌ None — all data is hardcoded |
| **CRM integration** | ❌ Mock — shown in lead delivery flow but no actual sync |
| **CSV export** | ❌ Visual only — button doesn't trigger download |
| **White-label branding** | ⚠️ Hardcoded as "TechSummit 2026" — settings page has the UI for it but doesn't apply changes |
| **Real app screenshots in rental cards** | ✅ Loaded from Cloudinary URLs (could be self-hosted later) |

---

## Stage 2 — what production needs

If we move forward, the build adds:

| Layer | Recommendation |
|---|---|
| Frontend framework | Convert to Next.js (or keep vanilla if scope stays small) |
| Database + Auth | Supabase (Postgres + magic-link auth) |
| Payments | Stripe Checkout + webhooks for order confirmation |
| Admin backend | Retool pointed at Supabase, or build admin into the Next.js app |
| Integrations | Webhooks + REST API for partner systems; pre-built connectors to Salesforce / HubSpot / Map Your Show / A2Z |
| Multi-tenant white-label | Subdomain routing + brand config in DB |
| Lead delivery pipeline | CSV export endpoint + scheduled email digest + CRM push via webhooks |

Estimated MVP: **2–3 weeks with 1–2 devs**.

---

## Editing conventions

- All three HTML files are self-contained. Edit any of them directly — no rebuild needed, just refresh the browser.
- CSS uses CSS custom properties at the top of each file's `<style>` block (`--accent`, `--text`, etc.) — easy to retheme.
- Dummy data is inline in the HTML — search the file for company names like `Contoso` or `Fabrikam` to find/replace.
- Real app screenshots are loaded from Cloudinary URLs in the SVG `<image>` tags. If you want to self-host, drop PNGs in this folder and update the `href` attributes.

---

## Contact

Built by Uliana (`uliana@joineve.ai`). Questions, suggestions, or wanting to take it to Stage 2 — reach out.
