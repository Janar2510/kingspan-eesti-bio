---
name: Kingspan Eesti BIO
description: Visual design language for Kingspan's biological wastewater treatment solutions in Estonia.
colors:
  primary: "#003A70"
  secondary: "#C69214"
  navy: "#002B4A"
  slate: "#64748B"
  cloud: "#F5F7FA"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontWeight: 900
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  '2xl': "1rem"
  '3xl': "1.25rem"
spacing:
  '18': "4.5rem"
  '22': "5.5rem"
  '26': "6.5rem"
  '30': "7.5rem"
components:
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.2xl}"
    padding: "24px"
---

## Overview
This design system represents the visual identity for Kingspan Eesti BIO. It focuses on communicating engineering trustworthiness, safety, and modern sustainability. 

## Colors
- **Kingspan Blue** (`#003A70`): The primary brand color. Conveys trust, corporate stability, and water safety.
- **Kingspan Gold** (`#C69214`): The secondary accent color. Used for badges, highlights, and subtle borders.
- **Navy** (`#002B4A`): Deep neutral text color and hero background accents.
- **Slate** (`#64748B`): Secondary text and borders.
- **Cloud** (`#F5F7FA`): Soft neutral background.

## Typography
Uses the **Satoshi** variable font family (self-hosted, weights 300–900) with a committed weight-contrast strategy: one family, strong weight jumps.
- **Display 1**: Large hero headings (4.5rem, weight 700, letter-spacing -0.02em).
- **Display 2 / Section headers**: weight 900 (Black), letter-spacing -0.015em.
- **Body**: weight 400/500, high legibility (1rem–1.125rem).

## Elevation
Avoids harsh black drop-shadows. Instead, uses soft colored drop-shadows or subtle gradients:
- `card-shadow`: `0 10px 30px rgba(0,0,0,0.08)` or soft navy shadow `0 20px 40px rgba(0, 58, 112, 0.12)`.
- Radial gradient spotlights on hover (`rgba(198,146,20,0.25)`).

## Components
- **Spotlight Cards**: Rounded with `2xl` (1rem), glassmorphic border, and radial gradient highlight tracking the pointer.
- **Buttons**:
  - Primary: Kingspan Blue with white text, or Gold accents.
  - Borders: 2px gradient on hover using Navy, Gold, and Cloud.

## Do's and Don'ts
### Do's
- Keep layout breathing room large using `spacing.18` and `spacing.22`.
- Use the bilingual language toggle EE ↔ EN consistently.
- Present certificates and specifications using clean lists and KPI metrics.

### Don'ts
- Don't use generic flat buttons without hover or micro-interactions.
- Don't use pure black text or high-contrast borders that break the nature-harmonious aesthetic.
- Don't compromise mobile touch sizes when designing calculators and forms.
