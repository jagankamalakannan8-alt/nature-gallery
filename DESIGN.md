# Design Brief

## Context
Public nature photography gallery with no login required for viewing. Smooth animations are core to the user experience, not optional enhancements.

## Tone & Aesthetic
Editorial minimalism with organic motion. Photography-first platform inspired by Unsplash/Flickr. Warm, calm, inviting — colors and UI fade into background to let images breathe.

## Color Palette (Light Mode)
| Token | OKLCH | Use |
|-------|-------|-----|
| Background | 0.97 0.02 80 | Main surface, warm cream |
| Foreground | 0.2 0 0 | Text, deep charcoal |
| Card | 0.98 0.01 70 | Image containers, header |
| Primary (Accent) | 0.55 0.08 140 | Muted sage/olive, CTAs, highlights |
| Secondary (Muted) | 0.88 0.03 90 | Soft taupe, secondary surfaces |
| Accent (Highlight) | 0.62 0.12 50 | Warm clay, hover states |
| Border | 0.92 0.01 80 | Subtle dividers |
| Destructive | 0.55 0.22 25 | Error/delete, warm red |

## Color Palette (Dark Mode)
| Token | OKLCH | Use |
|-------|-------|-----|
| Background | 0.12 0.01 80 | Main surface, warm dark |
| Foreground | 0.94 0 0 | Text, near white |
| Card | 0.16 0.01 80 | Image containers |
| Primary (Accent) | 0.72 0.1 140 | Bright sage, CTAs |
| Secondary (Muted) | 0.25 0.02 90 | Dark taupe |
| Accent (Highlight) | 0.72 0.13 50 | Bright clay |

## Typography
| Layer | Font | Use | Weight |
|-------|------|-----|--------|
| Display | Fraunces | Hero title, section headers | 400–900 |
| Body | GeneralSans | UI text, descriptions | 400–700 |
| Mono | GeistMono | Code/technical (fallback) | 400–700 |

## Elevation & Depth
Soft, diffused shadows — no harsh or neon effects. Two shadow tiers: `shadow-soft` (2px 8px, 6% opacity) for cards, `shadow-elevated` (8px 24px, 8% opacity) for lightbox/modals. Subtle borders (0.5px, 1% opacity).

## Structural Zones
| Zone | Treatment | Details |
|------|-----------|---------|
| Header | Card-elevated | Warm white bg, border-bottom, title + upload button, `shadow-soft` |
| Gallery Grid | Masonry layout | Background as main canvas, images on card bg with `shadow-soft`, 16–24px gaps |
| Image Card | Lifted state | Rounded 12px, subtle border, hover lifts with `shadow-elevated` + brightness +5% |
| Lightbox/Modal | Overlay | Semi-transparent backdrop, card with `shadow-elevated`, smooth scale + fade (0.3s) |
| Footer (optional) | Muted surface | `bg-muted`, `border-t`, credits/about text |

## Spacing & Rhythm
Grid: 4px base. Key intervals: 8, 12, 16, 24, 32, 48px. Generous padding around images (24–32px). Gap between grid items: 16–24px (mobile 12px). Border radius: 12px (gallery cards), 8px (buttons/inputs), 4px (small elements).

## Component Patterns
- **Buttons**: Filled (primary bg) or outlined (border). Scale on hover (105%), 0.3s ease-out.
- **Image Cards**: Border-radius 12px, overflow hidden, hover-image-lift class for combined effects.
- **Upload Button**: Large, primary bg, icon + text, scale + glow on hover.
- **Text Links**: Underline (border-b), hover text-accent, 0.3s smooth.

## Motion & Animation Choreography
- **Page load**: Grid images fade-in-scale (0.6s, staggered 60ms per item, cubic-bezier(0.4, 0, 0.2, 1))
- **Lightbox open**: Scale from card position, fade in, 0.3s ease-out
- **Image hover**: Brightness +5%, shadow elevation, 0.3s transition-smooth
- **Button hover**: Scale 105%, shadow elevation, 0.3s transition-smooth
- **Scroll reveal** (optional): Images fade-in as they enter viewport, IntersectionObserver

## Signature Detail
Warm cream background with muted sage accents creates serene, photography-centric aesthetic. Choreographed stagger animations on grid load give personality without distraction. Soft shadows and organic spacing feel premium and editorial.

## Constraints
- No gradients (unless subtle, 2-color only, for emphasis).
- No bouncy animations (all cubic-bezier(0.4, 0, 0.2, 1) or ease-out).
- No cartoon or toy-like effects.
- Maintain high contrast (AA+) in both light and dark modes.
- Images are the hero — all UI must step back and facilitate viewing.
