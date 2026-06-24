# Nexticorn Platform

Membership platform for the Nexticorn startup ecosystem network.

## Stack
- Frontend + API: Next.js 15 (App Router, TypeScript)
- Database + Auth: Supabase (Postgres, RLS, Auth)
- Payments: Xendit (IDR, virtual account, QRIS, credit card)
- Email: Resend
- Video: Mux (signed token streaming)
- PDF watermarking: pdf-lib (on-the-fly, per member)
- Secrets: Doppler
- Hosting: Cloudflare Pages
- Domain: nexticorn.id

## Project structure
- src/app/(public) — landing page, pricing (no auth required)
- src/app/(auth) — login, signup
- src/app/(members) — gated members area
- src/app/(admin) — admin panel (allowlisted IPs only)
- src/app/api — API route handlers
- src/components/ui — reusable UI components
- src/components/layout — nav, footer, shells
- src/components/members — members-area specific components
- src/lib — supabase client, xendit, resend, utils
- src/types — TypeScript type definitions

## Environment variables
Managed via Doppler. Never use .env files in production.
For local dev, copy .env.example and fill in values.

Required variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- XENDIT_SECRET_KEY
- XENDIT_WEBHOOK_TOKEN
- RESEND_API_KEY
- MUX_TOKEN_ID
- MUX_TOKEN_SECRET

## Local development
npm install
cp .env.example .env.local
npm run dev

## Deployment
Push to main branch, auto-deploys to Cloudflare Pages.

## Build phases
- [x] Phase 0: Project scaffold
- [ ] Phase 1: Supabase setup + auth
- [ ] Phase 2: Landing page
- [ ] Phase 3: Xendit payments + billing
- [ ] Phase 4: Members area + content
- [ ] Phase 5: Admin panel
- [ ] Phase 6: Email automation
- [ ] Phase 7: Security hardening + launch

## Maintainer
Kevin Yonathan — kevin@nexticorn.id
