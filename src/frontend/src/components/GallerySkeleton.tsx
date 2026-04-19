import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { fadeInScale, itemDelay, staggerContainer } from "../lib/animations";

const SKELETON_COUNT = 12;
const SKELETON_KEYS = Array.from(
  { length: SKELETON_COUNT },
  (_, i) => `sk-${i}`,
);

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      variants={fadeInScale}
      transition={itemDelay(index, 0, 0.04)}
    >
      <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
    </motion.div>
  );
}

export function GallerySkeleton() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      aria-label="Loading images…"
      data-ocid="gallery.loading_state"
    >
      {SKELETON_KEYS.map((key, i) => (
        <SkeletonCard key={key} index={i} />
      ))}
    </motion.div>
  );
}
