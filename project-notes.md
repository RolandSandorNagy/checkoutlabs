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
- Roland personally handled the migration, new storefront design implementation, booking flow, and most non-app work.
- The app codebases were initially vibe-coded by Ben, but contained many bugs and regressions.
- Over the last ~6 months Roland has been fixing bugs, regressions, and production issues across the app ecosystem.

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
- Public attribution can be more direct for migration, storefront, redesign, and booking flow work: these were personally delivered by Roland.
- Public attribution for the app ecosystem should emphasize stabilization, bug fixing, regression cleanup, production support, and hardening, unless specific app features are confirmed as personally authored.

### Open Questions

- What parts did Roland personally own versus broader team ownership?
- Was the custom Shopify app built in Node.js, Remix, Laravel, or another stack?
- Did Roland work directly on the custom app backend, the Shopify storefront, the booking flow, or all of these?
- What admission/check-in functionality can be publicly described?
- Are there measurable outcomes that can be mentioned, such as reduced operational friction, unified ticket flow, or easier management?
- Should Fullstory be named publicly, or should this stay phrased as agency delivery context?
- Can we mention PassKit / wallet passes publicly for the Season Tickets app?
- Can we mention capacity sync / oversell prevention publicly?

## Edenmoor / Pipers Farm

### Context

- Work happened through Fullstory / agency delivery context.
- At the time of the work the brand was still Pipers Farm; it later became Edenmoor.
- Roland has not meaningfully worked with the project since the Edenmoor rebrand.
- The store already existed when the work started.
- A delivery date selector already existed, built by another company, but it was not on the checkout page.

### Problem

- The existing delivery date selection happened before checkout.
- This caused issues because the precise postcode and shipping methods are only known during checkout.
- Delivery date selection needed to align with checkout-specific postcode and shipping method logic.

### Work Delivered

- A Shopify Checkout UI Extension was built for delivery date selection.
- Roland personally built the extension.
- Roland also handled the shipping method logic.
- The backend app portion was not personally built by Roland.
- The checkout page is publicly reachable, so the date picker can be shown in screenshots.
- Stack: Node.js, React, Remix, Shopify Checkout UI Extensions.
- The date picker validated checkout progress and could block checkout until a valid delivery date was selected.
- The shipping method logic ran in the extension.

### Additional Storefront Work

- During the broader engagement there was also frontend/storefront work.
- This likely included design implementation, product page UI work, variant selector work, and other storefront updates.
- Exact details are less clear and should be phrased conservatively unless recovered from repo/history.

### Positioning Notes

- Strongest public angle: Checkout UI Extension for delivery date selection, driven by postcode/cart/shipping-method constraints.
- The work should be presented as checkout customization / delivery logic rather than generic frontend work.
- Public wording should mention Pipers Farm / now Edenmoor carefully, e.g. "Edenmoor, formerly Pipers Farm".

### Open Questions

- Which screenshots best show the checkout date picker and shipping method behavior?

## YOZA

### Context

- Fresh project from the current year.
- Direct client acquired by Roland through a Facebook post.
- New Shopify website was mostly ready when Roland joined.
- Remaining work included smaller frontend changes/fixes and the main configurator integration.

### Work Delivered

- Integrated an existing 3D configurator into the Shopify storefront.
- The configurator was likely built with Three.js.
- Roland's main work was Shopify integration rather than building the 3D engine from scratch.
- Ensured Shopify products and variants worked correctly with the configurator so configured products could be purchased.
- Implemented BOM-based add-to-cart behavior where each component/part is added as a separate Shopify line item.
- Implemented or adjusted smaller frontend/theme fixes.
- Configured shipping methods / shipping profiles.
- Translated the site from English to Hungarian.
- Configured Shopify Markets, shipping profiles, and the Translate & Adapt app.
- No backend app/API work; theme/frontend-only integration.

### Configuration Persistence

- The order stores a link to the ordered configuration.
- Opening the link shows the purchased configuration, making the configuration shareable/reviewable after purchase.

### Positioning Notes

- Strongest public angle: direct-client Shopify 3D configurator integration.
- This should be positioned as Shopify integration and commerce logic for an existing 3D configurator, not as custom 3D engine development.
- Strong technical points:
  - product/variant integration
  - BOM-style multi-line-item cart logic
  - saved configuration links on orders
  - Shopify Markets and localization setup
  - shipping profile/method setup
- Public copy should not mention:
  - direct client acquisition
  - Facebook source
  - that the 3D engine already existed
  - theme/frontend-only scope
- Public copy can mention:
  - BOM / multi-line-item cart logic
  - Shopify product and variant integration
  - saved/shareable configuration links
  - Markets, shipping profiles, and localization setup

### Open Questions

- Which screenshots best show the configurator, cart line-item behavior, and saved configuration state?
- Are there any constraints around publicly describing BOM / line-item architecture?

## Bramley / Bramley for Business

### Context

- Work happened through Fullstory / agency delivery context.
- Bramley was one of Roland's early Fullstory projects.
- Fullstory has worked with Bramley for many years, likely 4-6 years, including ongoing marketing work.
- Roland worked heavily on Bramley in the earlier years.
- Important distinction:
  - Bramley / Bramley Products: older B2C store.
  - Bramley for Business: later B2B store/project, built from scratch around 3-4 years ago.

### B2C Bramley Work

- Multiple frontend/theme/design implementation projects over the years.
- Work likely included custom PDPs, theme updates, redesign implementations, and smaller storefront fixes.
- Exact details are less clear, so public copy should remain conservative for the B2C side unless recovered from repo/history.

### Bramley for Business B2B Work

- Roland was involved from the beginning of the B2B store.
- Built through Fullstory.
- Roland handled the technical Shopify implementation for requirements defined by the team.
- The project was not Shopify Plus / native Shopify B2B.
- It used custom B2B logic with Liquid, JavaScript, and Shopify-native primitives.
- Relevant implementation areas:
  - company name / business customer fields
  - bulk purchasing
  - buying limitations / constraints
  - custom price lists
  - customer/group-like B2B behavior
  - MOQ or order rule style logic
  - gated or segmented purchasing behavior where needed
  - product variants, metafields, and metaobjects
- No substantial backend/API/app work remembered.
- B2B theme/frontend implementation was done once and appears to still be in use.

### Positioning Notes

- Strongest public angle: custom B2B Shopify implementation without Shopify Plus/native B2B.
- This is useful proof for merchants or agencies needing B2B behavior using Shopify-native building blocks and custom theme logic.
- Public copy should distinguish:
  - Bramley B2C: ongoing storefront/theme contribution.
  - Bramley for Business: custom B2B commerce implementation.
- Public wording should be careful not to overclaim full ownership of the entire business system, because Roland implemented the technical Shopify pieces requested by the agency/team.

### Public Representation Decision

- Bramley for Business should be the main public card.
- Bramley B2C should be mentioned as related storefront/theme/design implementation experience, not as a separate detailed case until more precise historical details are recovered.
- The strongest public angle is custom B2B Shopify commerce implemented without Shopify Plus native B2B.
- The current card should use the Bramley for Business storefront screenshot where available.
- Public details can include Liquid, JavaScript, variants, metafields, metaobjects, bulk buying, business customer fields, purchasing constraints, and price-list behavior.
