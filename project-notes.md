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

### Positioning Notes

- This should be presented as a complex Shopify ticketing and operations platform migration, not just "theme work".
- Attribution should stay conservative: agency/team delivery context, with clear wording around contribution.
- Strong proof angle: migration from custom platform to Shopify, then Shopify-native constraints solved with custom app architecture.

### Open Questions

- What parts did Roland personally own versus broader team ownership?
- Was the custom Shopify app built in Node.js, Remix, Laravel, or another stack?
- Did Roland work directly on the custom app backend, the Shopify storefront, the booking flow, or all of these?
- What admission/check-in functionality can be publicly described?
- Are there measurable outcomes that can be mentioned, such as reduced operational friction, unified ticket flow, or easier management?
- Should Fullstory be named publicly, or should this stay phrased as agency delivery context?
