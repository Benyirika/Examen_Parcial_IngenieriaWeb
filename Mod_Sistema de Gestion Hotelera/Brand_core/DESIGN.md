---
name: Hospitality Core
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#43474e'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f88'
  primary: '#002045'
  on-primary: '#ffffff'
  primary-container: '#1a365d'
  on-primary-container: '#86a0cd'
  inverse-primary: '#adc7f7'
  secondary: '#0a6c44'
  on-secondary: '#ffffff'
  secondary-container: '#9ff5c1'
  on-secondary-container: '#167249'
  tertiary: '#3e1200'
  on-tertiary: '#ffffff'
  tertiary-container: '#612100'
  on-tertiary-container: '#f47d45'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#9ff5c1'
  secondary-fixed-dim: '#83d8a6'
  on-secondary-fixed: '#002111'
  on-secondary-fixed-variant: '#005231'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  grid-margin: 24px
  grid-gutter: 16px
---

## Brand & Style

The design system is engineered for efficiency, clarity, and reliability within high-pressure hospitality environments. It balances a **Corporate / Modern** aesthetic with high-utility functionalism to support Property Management Systems (PMS) that require long-term focus.

The visual language focuses on reducing cognitive load through "Quiet UI"—minimizing unnecessary decorative elements to highlight critical operational data. The emotional response should be one of professional control, calm under pressure, and systemic order. Whitespace is used strategically as a functional separator rather than just an aesthetic choice, ensuring that staff can navigate complex booking matrices without fatigue.

## Colors

This color palette is grounded in psychological cues for hospitality management:
- **Primary (Deep Blue):** Used for navigation, primary actions, and branding to establish trust and authority.
- **Secondary (Forest Green):** Reserved exclusively for "Available," "Confirmed," or "Paid" statuses, providing immediate positive reinforcement.
- **Tertiary (Burnt Orange):** Indicates "Pending," "In-Progress," or "Maintenance"—states requiring attention but not immediate alarm.
- **Error/Alert (Ruby Red):** Used for "Overbooked," "Cancelled," or "Urgent Block" states.
- **Neutrals:** A range of cool grays used for typography and structural borders to maintain a clean, organized hierarchy.

The default mode is **Light**, optimized for well-lit reception areas and back-office environments.

## Typography

The typography system prioritizes legibility and data-density management.
- **Headlines:** Uses **Hanken Grotesk** for a modern, sharp, and professional look that feels contemporary yet established.
- **Body:** Uses **Inter** for its exceptional readability in UI environments, particularly for long lists of guest names and room details.
- **Data:** Uses **JetBrains Mono** specifically for room numbers, prices, and dates within the calendar matrix to ensure numeric alignment and rapid scanning.

Maintain a high contrast ratio (minimum 4.5:1) for all body text against background surfaces to accommodate various lighting conditions in hotel lobbies.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Navigation sidebars are fixed, while the main operational dashboard (the "Grid") stretches to maximize screen real estate.

- **The Matrix Rhythm:** Use a strict 8px base grid. Spacing between interactive elements (like booking blocks) must never drop below 4px to prevent mis-clicks.
- **Generous Margins:** A 24px outer margin is required for all primary views to provide "visual breathing room," reducing the feeling of clutter in data-heavy screens.
- **Desktop First:** While the system is responsive, the primary optimization is for 1920x1080 displays common in professional workstations.

## Elevation & Depth

This design system utilizes **Tonal Layering** and **Ambient Shadows** to define hierarchy without visual noise.

- **Level 0 (Background):** Flat `#F7FAFC`.
- **Level 1 (Cards/Sidebar):** White surface with a very soft, diffused shadow (`0px 2px 4px rgba(0,0,0,0.05)`).
- **Level 2 (Modals/Popovers):** White surface with a more pronounced shadow (`0px 10px 25px rgba(26, 54, 93, 0.1)`) to pull the element forward.
- **Depth Cues:** Use subtle 1px borders in a light neutral (`#E2E8F0`) instead of shadows for separating grid cells in the calendar matrix to keep the view crisp.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a approachable, modern feel while maintaining the structural integrity required for a professional tool.

- **Buttons & Inputs:** 4px (0.25rem) radius.
- **Cards & Steppers:** 8px (0.5rem) radius for a slightly softer container look.
- **Status Pills:** Fully rounded (capsule) to distinguish status indicators from clickable buttons.

## Components

### Steppers
Used for guest check-in/out workflows. Use a horizontal layout for desktop with a "completed" state using the Primary Blue and a checkmark icon. The "active" step should have a subtle pulsing shadow.

### Data Tables
Tables must support "Compact" and "Comfortable" density modes. Row hover states should use a very light blue tint (`#EBF8FF`) to help the eye track across long horizontal rows.

### Calendar Matrix (The Grid)
The heart of the PMS. 
- **Header:** Sticky Y-axis for room types, sticky X-axis for dates.
- **Cells:** Use color-coded blocks with 2px gaps. 
- **Interaction:** Drag-to-select functionality for multi-night bookings.

### Input Fields
Floating labels or top-aligned labels are preferred to keep forms compact. Use a 2px solid Primary Blue border for the `focus` state.

### Chips/Status Pills
High-contrast text on low-saturation backgrounds (e.g., Deep Green text on Light Green background) for "Available" to ensure the text remains legible while the color remains the primary signifier.