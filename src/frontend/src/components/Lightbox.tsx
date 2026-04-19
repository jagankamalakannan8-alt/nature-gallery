import { ease, fadeIn } from "@/lib/animations";
import type { Image } from "@/types/index";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { useCallback, useEffect } from "react";

interface LightboxProps {
  image: Image | null;
  onClose: () => void;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(ms));
}

export function Lightbox({ image, onClose }: LightboxProps) {
  const prefersReduced = useReducedMotion();

  // Prevent body scroll while open
  useEffect(() => {
    if (!image) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [image]);

  // Keyboard: Escape to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reduced-motion overrides: instant transitions
  const backdropVariants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : fadeIn;

  const panelVariants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.35, ease: ease.smooth },
        },
        exit: {
          opacity: 0,
          scale: 0.92,
          transition: { duration: 0.22, ease: ease.exit },
        },
      };

  const footerVariants: Variants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.96 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.35, delay: 0.18, ease: ease.smooth },
        },
        exit: { opacity: 0, scale: 0.96 },
      };

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          key="lightbox-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{ backdropFilter: "blur(12px)" }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          aria-label={`Lightbox: ${image.filename}`}
          data-ocid="lightbox.dialog"
        >
          {/* Semi-transparent dark overlay */}
          <div
            className="absolute inset-0 bg-foreground/70"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="lightbox-panel"
            className="relative z-10 flex flex-col items-center max-w-5xl w-full max-h-[90vh]"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="absolute -top-3 -right-3 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-card text-foreground shadow-elevated border border-border hover:bg-accent hover:text-accent-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={onClose}
              aria-label="Close lightbox"
              data-ocid="lightbox.close_button"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="w-full overflow-hidden rounded-xl shadow-elevated">
              <img
                src={image.blob.getDirectURL()}
                alt={image.filename}
                className="w-full max-h-[75vh] object-contain bg-black/20 rounded-xl"
                draggable={false}
              />
            </div>

            {/* Footer */}
            <motion.div
              key="lightbox-footer"
              className="mt-4 flex items-center gap-4 px-4 py-2.5 rounded-lg bg-card/90 border border-border shadow-soft backdrop-blur-sm"
              variants={footerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              data-ocid="lightbox.panel"
            >
              <div className="flex flex-col min-w-0">
                <span
                  className="text-sm font-display font-semibold text-foreground truncate max-w-xs"
                  title={image.filename}
                >
                  {image.filename}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Uploaded {formatDate(image.uploadedAt)}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
