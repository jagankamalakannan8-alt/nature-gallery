import { ZoomIn } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { fadeInScale, itemDelay } from "../lib/animations";
import type { Image } from "../types";

interface ImageCardProps {
  image: Image;
  index: number;
  onClick: (image: Image) => void;
}

export function ImageCard({ image, index, onClick }: ImageCardProps) {
  const prefersReduced = useReducedMotion();

  const date = new Date(Number(image.uploadedAt / 1_000_000n));
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/40 shadow-soft hover:shadow-elevated transition-colors duration-300"
      variants={prefersReduced ? undefined : fadeInScale}
      transition={prefersReduced ? undefined : itemDelay(index)}
      onClick={() => onClick(image)}
      whileHover={prefersReduced ? undefined : { scale: 1.02, y: -4 }}
      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
      data-ocid={`gallery.item.${index + 1}`}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image.blob.getDirectURL()}
          alt={image.filename}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Hover zoom icon overlay */}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-all duration-400 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated">
            <ZoomIn size={18} className="text-foreground" />
          </div>
        </motion.div>
      </div>

      {/* Bottom metadata strip — slides up on hover */}
      <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <div className="bg-gradient-to-t from-foreground/80 via-foreground/50 to-transparent px-3 pt-8 pb-3">
          <p className="text-white text-xs font-medium truncate leading-snug">
            {image.filename}
          </p>
          <p className="text-white/70 text-[11px] mt-0.5">{formattedDate}</p>
        </div>
      </div>
    </motion.div>
  );
}
