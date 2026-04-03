# PharmaBridge Frontend Implementation Plan

## Proposed Folder Structure
```text
app/
  (marketing)/
    layout.tsx
    page.tsx
    how-it-works/page.tsx
    solutions/
      sponsor/page.tsx
      cdmo/page.tsx
      cro/page.tsx
    intelligence/page.tsx
    rfp/page.tsx
    score/page.tsx
    pricing/page.tsx
    about/page.tsx
    contact/page.tsx
    trust/page.tsx
    get-started/page.tsx
  (auth)/
    auth/login/page.tsx
  onboarding/
    layout.tsx
    sponsor/page.tsx
    cdmo/page.tsx
    cro/page.tsx
    submitted/page.tsx
    pending/page.tsx
  app/
    sponsor/...
    cdmo/...
    cro/...
    admin/...
components/
  app-shell/
  marketing/
  onboarding/
  sections/
  ui/
lib/
  mock-data/
  page-config/
  types.ts
  utils.ts
styles/
  globals.css
```

## Route Map
### Public
- `/`
- `/how-it-works`
- `/solutions/sponsor`
- `/solutions/cdmo`
- `/solutions/cro`
- `/intelligence`
- `/rfp`
- `/score`
- `/pricing`
- `/about`
- `/contact`
- `/trust`
- `/get-started`
- `/auth/login`

### Onboarding
- `/onboarding/sponsor`
- `/onboarding/cdmo`
- `/onboarding/cro`
- `/onboarding/submitted`
- `/onboarding/pending`

### Sponsor App
- `/app/sponsor/dashboard`
- `/app/sponsor/programmes`
- `/app/sponsor/programmes/[id]`
- `/app/sponsor/search`
- `/app/sponsor/vendors/[id]`
- `/app/sponsor/compare`
- `/app/sponsor/shortlists`
- `/app/sponsor/rfps`
- `/app/sponsor/rfps/new`
- `/app/sponsor/rfps/[id]`
- `/app/sponsor/projects/[id]`
- `/app/sponsor/payments`
- `/app/sponsor/intelligence`
- `/app/sponsor/documents`
- `/app/sponsor/settings`

### CDMO App
- `/app/cdmo/dashboard`
- `/app/cdmo/profile`
- `/app/cdmo/facilities`
- `/app/cdmo/capabilities`
- `/app/cdmo/capacity`
- `/app/cdmo/certificates`
- `/app/cdmo/rfps`
- `/app/cdmo/proposals/[id]`
- `/app/cdmo/projects`
- `/app/cdmo/score`
- `/app/cdmo/billing`
- `/app/cdmo/settings`

### CRO App
- `/app/cro/dashboard`
- `/app/cro/profile`
- `/app/cro/services`
- `/app/cro/therapeutic-areas`
- `/app/cro/accreditations`
- `/app/cro/capacity`
- `/app/cro/rfps`
- `/app/cro/proposals/[id]`
- `/app/cro/projects`
- `/app/cro/intelligence`
- `/app/cro/settings`

### Admin Console
- `/app/admin/overview`
- `/app/admin/kyb`
- `/app/admin/organisations/[id]`
- `/app/admin/certificates`
- `/app/admin/audits`
- `/app/admin/disputes`
- `/app/admin/fraud`
- `/app/admin/intelligence-qa`
- `/app/admin/users`
- `/app/admin/reports`

## Screen Inventory
- Public website: 13 screens
- Onboarding: 5 screens
- Sponsor app: 15 screens
- CDMO app: 12 screens
- CRO app: 11 screens
- Admin console: 10 screens
- Total planned prototype coverage: 66 routes/screens

## Reusable Components
- Global shells and role-aware side navigation
- Hero sections, stat strips, highlight cards
- Section headers and page intro blocks
- KPI cards and metric grids
- Filter toolbar and saved-view chips
- Workflow steppers and onboarding section cards
- Data tables, status chips, risk flags
- Vendor cards, proposal cards, shortlist cards
- Timeline, milestone rail, activity feed
- Alert feed, intelligence insight cards, watchlist items
- Document tiles and escrow/payment summary cards
- Drawer/modal-ready action cards and empty/loading panels

## Mock Data Model
- `roles`: sponsor, cdmo, cro, admin
- `modalities`: ADC, LNP/mRNA, CGT, mAbs, Small Molecules, Peptides, Radiopharma, PROTAC, Oligos
- `organisations`
- `vendors`
- `programmes`
- `rfps`
- `proposals`
- `projects`
- `milestones`
- `alerts`
- `documents`
- `reviews`
- `adminQueues`

## Build Order By Phase
1. Foundation: Next.js scaffold, tokens, typography, color, shells, primitives
2. Public website: landing pages and product-positioning pages
3. Onboarding: role selector, role-specific wizards, submission states
4. Sponsor flows: dashboard, programme, search, vendor, compare, shortlist
5. RFP workflow: builder, inbox, proposal comparison, award state
6. Project workspace: workspace, milestones, payments, documents, disputes
7. Vendor apps: CDMO and CRO operational dashboards and self-service flows
8. Admin console: queues, reviews, disputes, fraud, intelligence QA
9. Polish: responsive tuning, state coverage, motion, consistency cleanup
