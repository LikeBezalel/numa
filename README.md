# NÜMA Açaí Website

Premium, conversion-focused marketing site for a boutique açaí event catering brand.

## Stack
- Next.js 16 (App Router, latest stable line)
- TypeScript
- Tailwind CSS

## Pages
- Home
- Experience
- Gallery
- Testimonials
- About
- Inquiry
- Contact

## Inquiry Flow
The booking intake routes to the provided Google Form and is also embedded on the inquiry page for a seamless UX.

## Local Development
```bash
npm install
npm run dev
```

## Content / Asset Follow-up
- Replace gallery placeholders with real photography from events and Instagram.
- Replace founder placeholder content on the About page.
- Swap emoji logo mark with official exported logo files (SVG/PNG) when available.

## Admin CRM Pipeline (`/admin/crm`)

An unlinked internal CRM board page is implemented at:
- `/admin/crm`

### Features included
- Kanban pipeline stages with drag/drop lead movement (persisted)
- Stage management: add, rename, reorder, archive
- Lead command-center drawer: edit lead details, owner, tags, next action, due date
- Notes and activity timeline with persistence
- Search + owner/service filters + sort (recent/due)

### Supabase setup
1. Run the SQL migration:
   - `supabase/migrations/20260410_crm_pipeline.sql`
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Restart Next.js.

### RLS guidance
- Migration includes suggested RLS statements in comments.
- For production, enable RLS and tie policies to your auth model (`auth.uid()` and org/tenant constraints).

### Adaptation examples
- Açaí/event business: store guest_count, venue, package in `custom_fields`.
- Painting business: store property_type, square_footage, paint_scope in `custom_fields`.
- Keep board/column naming per client while preserving shared workflow engine.


## Versioning note
- Pinned to modern semver ranges compatible with Vercel deployments (`next@^16.2.2`, `react@^19.2.0`).
