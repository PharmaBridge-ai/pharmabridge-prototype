# Sponsor Light Redesign Plan

## 1. Visual System
- Canvas: soft blue-gray and warm white background with low-contrast radial glow fields
- Primary surfaces: white and off-white cards with selective frosted translucency
- Secondary surfaces: misted slate-blue tints for AI panels, trays, rails, and overlays
- Borders: hairline neutral borders with low contrast and reduced panel heaviness
- Shadows: diffused layered shadows with more lift and less darkness
- Radius: 18px to 28px for cards, 999px for pills and segmented controls
- Typography: large display headlines, calmer body copy, fewer tiny labels
- Accent palette: restrained indigo, soft cobalt, teal, and muted apricot highlights
- Status palette: softened success/warning/risk treatments with less saturation and more transparency
- Glass use: reserved for hero insight cards, AI panels, compare tray, overlay chrome, and summary modules

## 2. Sponsor Design Principles
- Calm first impression over dashboard density
- Summary before detail on every Sponsor screen
- Fewer competing panels, stronger focal hierarchy
- Spacious layout rhythm with larger gutters and internal padding
- Enterprise trust through clarity, not heaviness
- Premium composition before decorative effects
- Advanced detail hidden behind tabs, drawers, or secondary modules

## 3. Before / After Strategy
- Before: dark, compact, panel-heavy, many equal-weight surfaces, crowded action density
- After: bright, layered, airy, high-contrast hierarchy, clearer zoning, premium light enterprise aesthetic
- Reduce simultaneous visual emphasis by turning many hard panels into softer grouped sections
- Promote primary actions and urgent states while muting secondary metadata
- Move from “wall of widgets” to “executive command center plus supporting modules”

## 4. Component Redesign Inventory
- Sponsor shell and top app bar
- Left navigation rail
- Page header / hero block
- KPI cards and insight hero cards
- Section wrappers and grouped modules
- Tables and list rows
- Filter pills and segmented controls
- Status chips and badges
- Buttons and CTA stacks
- Form fields and steppers
- AI processing panels
- Compare tray and floating action surfaces
- Alert cards and activity feed items
- Empty states, waiting states, and skeleton surfaces

## 5. Layout System
- Wider desktop breathing room with larger outer gutters
- Header zone, KPI/summary zone, primary work zone, secondary support zone
- 2 to 4 major zones max per screen
- Hero summary cards first, operational tables and details second
- Sticky action trays only where they reduce friction
- Cleaner side rails for filters, demo controls, and contextual modules

## 6. Motion Principles
- Use restrained fades, soft slides, and scale-in transitions
- Prioritize transitions for AI states, stepper transitions, compare tray, drawers, and KPI updates
- Hover motion should feel polished and small, not jumpy
- Glass surfaces should animate opacity and blur softly
- Preserve reduced-motion fallbacks across page and overlay transitions

## 7. Crowding Reduction Approach
- Increase card padding and row height
- Reduce always-visible metadata and compress it into pills, tabs, and summaries
- Break dense dashboards into clear “action”, “insight”, and “monitoring” zones
- Use summary cards above detailed tables and feeds
- Limit equal-weight cards per row and create clearer content hierarchy
- Reserve strong accents for primary actions, AI states, and critical risk moments only
