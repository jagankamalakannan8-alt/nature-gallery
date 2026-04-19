import { c as createLucideIcon, h as hasReducedMotionListener, i as initPrefersReducedMotion, r as reactExports, p as prefersReducedMotion, j as jsxRuntimeExports, S as Slot, a as cn, b as cva, m as motion, s as staggerContainer, f as fadeInScale, d as Skeleton, e as itemDelay, g as fadeIn, k as ease, L as Leaf, B as Button, l as Link, U as Upload, n as fadeUp } from "./index-F902wx8x.js";
import { A as AnimatePresence, X, u as useImages, I as Image } from "./useImages-8dYvdmNY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function useReducedMotion() {
  !hasReducedMotionListener.current && initPrefersReducedMotion();
  const [shouldReduceMotion] = reactExports.useState(prefersReducedMotion.current);
  return shouldReduceMotion;
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const SKELETON_COUNT = 12;
const SKELETON_KEYS = Array.from(
  { length: SKELETON_COUNT },
  (_, i) => `sk-${i}`
);
function SkeletonCard({ index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "rounded-2xl overflow-hidden",
      variants: fadeInScale,
      transition: itemDelay(index, 0, 0.04),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full rounded-2xl" })
    }
  );
}
function GallerySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
      variants: staggerContainer,
      initial: "hidden",
      animate: "visible",
      "aria-label": "Loading images…",
      "data-ocid": "gallery.loading_state",
      children: SKELETON_KEYS.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { index: i }, key))
    }
  );
}
function ImageCard({ image, index, onClick }) {
  const prefersReduced = useReducedMotion();
  const date = new Date(Number(image.uploadedAt / 1000000n));
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "group relative cursor-pointer overflow-hidden rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/40 shadow-soft hover:shadow-elevated transition-colors duration-300",
      variants: prefersReduced ? void 0 : fadeInScale,
      transition: prefersReduced ? void 0 : itemDelay(index),
      onClick: () => onClick(image),
      whileHover: prefersReduced ? void 0 : { scale: 1.02, y: -4 },
      whileTap: prefersReduced ? void 0 : { scale: 0.98 },
      "data-ocid": `gallery.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: image.blob.getDirectURL(),
            alt: image.filename,
            className: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110",
            loading: "lazy",
            decoding: "async"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-all duration-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.7 },
            whileHover: { opacity: 1, scale: 1 },
            className: "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { size: 18, className: "text-foreground" }) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-t from-foreground/80 via-foreground/50 to-transparent px-3 pt-8 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-medium truncate leading-snug", children: image.filename }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-[11px] mt-0.5", children: formattedDate })
        ] }) })
      ]
    }
  );
}
function formatDate(ts) {
  const ms = Number(ts / 1000000n);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(ms));
}
function Lightbox({ image, onClose }) {
  const prefersReduced = useReducedMotion();
  reactExports.useEffect(() => {
    if (!image) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [image]);
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  reactExports.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  const backdropVariants = prefersReduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } : fadeIn;
  const panelVariants = prefersReduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } : {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: ease.smooth }
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      transition: { duration: 0.22, ease: ease.exit }
    }
  };
  const footerVariants = prefersReduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } : {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, delay: 0.18, ease: ease.smooth }
    },
    exit: { opacity: 0, scale: 0.96 }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: image && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8",
      style: { backdropFilter: "blur(12px)" },
      variants: backdropVariants,
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      onClick: onClose,
      "aria-label": `Lightbox: ${image.filename}`,
      "data-ocid": "lightbox.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/70",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 flex flex-col items-center max-w-5xl w-full max-h-[90vh]",
            variants: panelVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute -top-3 -right-3 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-card text-foreground shadow-elevated border border-border hover:bg-accent hover:text-accent-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  onClick: onClose,
                  "aria-label": "Close lightbox",
                  "data-ocid": "lightbox.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full overflow-hidden rounded-xl shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: image.blob.getDirectURL(),
                  alt: image.filename,
                  className: "w-full max-h-[75vh] object-contain bg-black/20 rounded-xl",
                  draggable: false
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "mt-4 flex items-center gap-4 px-4 py-2.5 rounded-lg bg-card/90 border border-border shadow-soft backdrop-blur-sm",
                  variants: footerVariants,
                  initial: "hidden",
                  animate: "visible",
                  exit: "hidden",
                  "data-ocid": "lightbox.panel",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-sm font-display font-semibold text-foreground truncate max-w-xs",
                        title: image.filename,
                        children: image.filename
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "Uploaded ",
                      formatDate(image.uploadedAt)
                    ] })
                  ] })
                },
                "lightbox-footer"
              )
            ]
          },
          "lightbox-panel"
        )
      ]
    },
    "lightbox-backdrop"
  ) });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex flex-col items-center justify-center py-32 px-6 text-center",
      variants: fadeUp,
      initial: "hidden",
      animate: "visible",
      "data-ocid": "gallery.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative mb-8",
            animate: { y: [0, -8, 0] },
            transition: {
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 40, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center",
                  animate: { scale: [1, 1.2, 1] },
                  transition: {
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 14, className: "text-accent" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-3 tracking-tight", children: "No photos yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mb-8 leading-relaxed text-base", children: "Be the first to share the beauty of nature. Upload your photos and inspire the world." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", "data-ocid": "gallery.upload_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16, className: "mr-2" }),
          "Upload the First Photo"
        ] }) })
      ]
    }
  );
}
function ErrorState({ onRetry }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex flex-col items-center justify-center py-28 text-center",
      variants: fadeUp,
      initial: "hidden",
      animate: "visible",
      "data-ocid": "gallery.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xl font-semibold mb-2", children: "Failed to load photos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Something went wrong. Please try again." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: onRetry,
            "data-ocid": "gallery.retry_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14, className: "mr-2" }),
              "Retry"
            ]
          }
        )
      ]
    }
  );
}
function GalleryPage() {
  const { data: images, isLoading, isError, refetch } = useImages();
  const [selectedImage, setSelectedImage] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "container max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14",
      "data-ocid": "gallery.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "mb-10 text-center",
            variants: staggerContainer,
            initial: "hidden",
            animate: "visible",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: fadeInScale,
                  transition: itemDelay(0),
                  className: "inline-flex items-center gap-2 text-primary text-sm font-medium mb-3 px-3 py-1 rounded-full bg-primary/10 border border-primary/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 13 }),
                    "Community Gallery"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.h1,
                {
                  variants: fadeInScale,
                  transition: itemDelay(1),
                  className: "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 tracking-tight",
                  children: "Nature Gallery"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  variants: fadeInScale,
                  transition: itemDelay(2),
                  className: "text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed",
                  children: "A community collection of breathtaking nature photography — open to everyone."
                }
              ),
              images && images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: fadeInScale,
                  transition: itemDelay(3),
                  className: "mt-5 flex items-center justify-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-sm px-3 py-1", children: [
                      images.length,
                      " ",
                      images.length === 1 ? "photo" : "photos"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        asChild: true,
                        variant: "outline",
                        size: "sm",
                        "data-ocid": "gallery.upload_link",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 13, className: "mr-1.5" }),
                          "Add photo"
                        ] })
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(GallerySkeleton, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: refetch }) : !images || images.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4",
            variants: staggerContainer,
            initial: "hidden",
            animate: "visible",
            "data-ocid": "gallery.list",
            children: images.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ImageCard,
              {
                image,
                index: Math.min(index, 10),
                onClick: setSelectedImage
              },
              String(image.id)
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbox, { image: selectedImage, onClose: () => setSelectedImage(null) })
      ]
    }
  );
}
export {
  GalleryPage
};
