import type { Transition, Variants } from "motion/react";

// Shared easing curves
export const ease = {
  smooth: [0.4, 0, 0.2, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 30 },
  enter: [0.0, 0.0, 0.2, 1] as const,
  exit: [0.4, 0.0, 1, 1] as const,
} as const;

// Transition presets
export const transitions: Record<string, Transition> = {
  default: { duration: 0.4, ease: ease.smooth },
  fast: { duration: 0.2, ease: ease.smooth },
  slow: { duration: 0.7, ease: ease.smooth },
  spring: { type: "spring", stiffness: 280, damping: 28 },
};

// Fade up — used for text blocks and CTA sections
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

// Fade in scale — used for image cards
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

// Fade in — used for overlays and modals
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: ease.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: ease.exit },
  },
};

// Stagger container — wraps children to stagger their entrance
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// Stagger container with a short delay (for above-the-fold content)
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

// Slide in from left — header / nav items
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: ease.smooth },
  },
};

// Slide in from right — action buttons
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: ease.smooth },
  },
};

// Slide up from bottom — image lightbox / modal
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transitions.spring },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: { duration: 0.25, ease: ease.exit },
  },
};

// Helper to build a per-item stagger delay
export function itemDelay(index: number, base = 0, step = 0.06): Transition {
  return { delay: base + index * step, duration: 0.45, ease: ease.smooth };
}
