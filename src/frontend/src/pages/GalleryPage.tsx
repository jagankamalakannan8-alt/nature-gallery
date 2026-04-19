import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ImageIcon, Leaf, RefreshCw, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { GallerySkeleton } from "../components/GallerySkeleton";
import { ImageCard } from "../components/ImageCard";
import { Lightbox } from "../components/Lightbox";
import { useImages } from "../hooks/useImages";
import {
  fadeInScale,
  fadeUp,
  itemDelay,
  staggerContainer,
} from "../lib/animations";
import type { Image } from "../types";

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-32 px-6 text-center"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      data-ocid="gallery.empty_state"
    >
      {/* Animated icon */}
      <motion.div
        className="relative mb-8"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center shadow-soft">
          <ImageIcon size={40} className="text-primary" />
        </div>
        <motion.div
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Leaf size={14} className="text-accent" />
        </motion.div>
      </motion.div>

      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 tracking-tight">
        No photos yet
      </h2>
      <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed text-base">
        Be the first to share the beauty of nature. Upload your photos and
        inspire the world.
      </p>
      <Button asChild size="lg" data-ocid="gallery.upload_button">
        <Link to="/upload">
          <Upload size={16} className="mr-2" />
          Upload the First Photo
        </Link>
      </Button>
    </motion.div>
  );
}

// ─── Error State ─────────────────────────────────────────────────────────────

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-28 text-center"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      data-ocid="gallery.error_state"
    >
      <p className="text-destructive text-xl font-semibold mb-2">
        Failed to load photos
      </p>
      <p className="text-muted-foreground mb-6">
        Something went wrong. Please try again.
      </p>
      <Button
        variant="outline"
        onClick={onRetry}
        data-ocid="gallery.retry_button"
      >
        <RefreshCw size={14} className="mr-2" />
        Retry
      </Button>
    </motion.div>
  );
}

// ─── Gallery Page ─────────────────────────────────────────────────────────────

export function GalleryPage() {
  const { data: images, isLoading, isError, refetch } = useImages();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <section
      className="container max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14"
      data-ocid="gallery.page"
    >
      {/* Page header */}
      <motion.div
        className="mb-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeInScale}
          transition={itemDelay(0)}
          className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
        >
          <Leaf size={13} />
          Community Gallery
        </motion.div>
        <motion.h1
          variants={fadeInScale}
          transition={itemDelay(1)}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 tracking-tight"
        >
          Nature Gallery
        </motion.h1>
        <motion.p
          variants={fadeInScale}
          transition={itemDelay(2)}
          className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed"
        >
          A community collection of breathtaking nature photography — open to
          everyone.
        </motion.p>
        {images && images.length > 0 && (
          <motion.div
            variants={fadeInScale}
            transition={itemDelay(3)}
            className="mt-5 flex items-center justify-center gap-3"
          >
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {images.length} {images.length === 1 ? "photo" : "photos"}
            </Badge>
            <Button
              asChild
              variant="outline"
              size="sm"
              data-ocid="gallery.upload_link"
            >
              <Link to="/upload">
                <Upload size={13} className="mr-1.5" />
                Add photo
              </Link>
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Content */}
      {isLoading ? (
        <GallerySkeleton />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : !images || images.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          data-ocid="gallery.list"
        >
          {images.map((image, index) => (
            <ImageCard
              key={String(image.id)}
              image={image}
              index={Math.min(index, 10)}
              onClick={setSelectedImage}
            />
          ))}
        </motion.div>
      )}

      {/* Lightbox */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
