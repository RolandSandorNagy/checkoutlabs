# CheckoutLabs Project Notes

## Pennywell Farm

### Context

- Work happened through Fullstory / agency delivery context.
- Collaboration started around 2-3 years ago.
- Pennywell Farm originally used a custom CMS / non-Shopify platform with other supporting systems.
- Initial goal: migrate the full platform to Shopify while preserving the existing frontend pixel-perfect in the first phase.

### Initial Shopify Migration

- First implementation used Shopify-native patterns as much as possible.
- Tickets were modeled as Shopify products or product variants.
- Capacity handling was initially represented through separate line items.
- The first public frontend remained visually the same as before the migration.

### Redesign And Booking Flow

- Later, a new design was introduced and implemented on the Shopify storefront.
- A new booking flow was built to unify purchase flows across:
  - day tickets
  - event tickets
  - other ticket types
  - annual passes
- Before this, different ticket types had separate cart pages.

### Platform Evolution

- The native Shopify approach created limitations after the initial migration.
- The ticket model evolved so one variant encoded ticket information that previously required two line items.
- A custom Shopify app was built by the delivery team to handle the broader operational workflow.
- The app covers operations around:
  - ticket sales
  - admission / check-in
  - marketing-related activity
  - other supporting operational processes

### Ongoing Work

- Many smaller improvements and maintenance tasks happened over a 2-3 year period.
- The project involved Shopify platform work, storefront implementation, custom business logic, booking flow logic, and operational tooling.

### Repo Review Findings

#### Shopify Theme Repo: `pennywell`

- Shopify theme contains the public storefront and ticketing/booking UI.
- Relevant theme areas found:
  - booking flow page template
  - booking flow Liquid snippets for start, calendar, quantity, events, upsells, summary, checkout, forms, gift cards, waitlist, tracking, and progress bar
  - custom cart/ticket pages and older cart flows
  - product ticket templates and ticket landing/PDP sections
  - Klaviyo-related snippets and campaign/supporting content
- The booking flow supports multiple paths including day tickets, event tickets, season-ticket-holder reservations, WWR/rainy-day style flows, gift cards, upsells, and checkout summary.
- Theme settings include day ticket availability / cutoff controls.

#### Central App Repo: `pftoolkit/PFtoolkit`

- Main app appears to be a Remix + Prisma Shopify app / workspace using Shopify Admin API.
- It has grown beyond general utilities into a broad Pennywell operational platform.
- Relevant areas found:
  - ticket order pipeline
  - order line roles
  - variant aggregates and ticket metrics
  - generated ticket variants
  - day ticket themes
  - unified events
  - unified event ticket types, dates, variants, capacities, reservations, and waitlists
  - capacity sync jobs and reconciliation
  - booking funnel analytics
  - booking flow CMS / content sets, sections, global settings, labels, modals, errors, versions, A/B tests, sessions, assets, and audit logs
  - discount management
  - email templates and Klaviyo-related ticketing services
  - customer intelligence / segmentation modules
- Variant generation service uses year-agnostic variants for unified ticketing and covers:
  - day ticket group
  - WWR ticket group
  - season ticket holder group
- Capacity sync service is explicitly designed to prevent overselling, with shared capacity across product groups and sync triggers from:
  - Shopify order webhooks
  - pre-checkout validation
  - cron reconciliation
  - manual admin actions
- This supports a stronger public claim around custom Shopify ticketing architecture, capacity management, operational tooling, and ongoing platform engineering.

#### Check-In Backend Repo: `pennywell-farm-backend`

- Node.js / Express backend for Shopify-based QR ticket check-in and a simple scanner/admin frontend.
- Uses Shopify Admin API, MongoDB, sessions, and Railway deployment.
- Handles:
  - scanner login/session
  - scanner config
  - QR/order check-in
  - ticket date and time validation
  - fulfillment through Shopify fulfillment orders
  - force check-in
  - order detail lookup
  - guest lists and event guest lists
  - check-in summaries
  - day/event/christmas capacity summary endpoints
  - order editing / date changes through Shopify Order Edit API
  - season ticket lookup via PF Toolkit
- Public wording can mention Shopify-based admission/check-in tooling and operational dashboard, if acceptable.

#### Season Tickets Repo: `PF-Season-Tickets`

- Separate Shopify app using React Router, Prisma, Shopify App Bridge/Polaris, and TypeScript.
- Dedicated to season tickets / memberships.
- Relevant areas found:
  - season ticket records, members, passes, renewals, events
  - membership cards and card pool ranges
  - customer onboarding flows
  - Shopify customer/order webhooks
  - account page/banner/order status/onboarding extensions
  - photo upload and image processing
  - PassKit integration for Apple/Google wallet style passes
  - Klaviyo flows and reminders
  - recovery/repair/regeneration scripts and admin routes
- This supports mentioning annual pass / membership operations separately from day-ticket booking.

### Positioning Notes

- This should be presented as a complex Shopify ticketing and operations platform migration, not just "theme work".
- Attribution should stay conservative: agency/team delivery context, with clear wording around contribution.
- Strong proof angle: migration from custom platform to Shopify, then Shopify-native constraints solved with custom app architecture.
- Stronger current positioning: multi-year Shopify ticketing platform engineering across storefront booking UX, custom Shopify app infrastructure, shared capacity management, admission/check-in tooling, season ticket membership operations, and analytics/admin workflows.

### Open Questions

- What parts did Roland personally own versus broader team ownership?
- Was the custom Shopify app built in Node.js, Remix, Laravel, or another stack?
- Did Roland work directly on the custom app backend, the Shopify storefront, the booking flow, or all of these?
- What admission/check-in functionality can be publicly described?
- Are there measurable outcomes that can be mentioned, such as reduced operational friction, unified ticket flow, or easier management?
- Should Fullstory be named publicly, or should this stay phrased as agency delivery context?
- Can we mention PassKit / wallet passes publicly for the Season Tickets app?
- Can we mention capacity sync / oversell prevention publicly?
