import { Button } from "@/components/ui/button";
import { slideInLeft, slideInRight, staggerFast } from "@/lib/animations";
import { Link } from "@tanstack/react-router";
import { Leaf, Upload } from "lucide-react";
import { motion } from "motion/react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
      <motion.div
        className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        variants={staggerFast}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={slideInLeft}>
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="header.home_link"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-primary/20">
              <Leaf size={16} strokeWidth={1.8} />
            </span>
            <span className="font-display font-semibold text-lg tracking-tight text-foreground">
              Nature<span className="text-primary">Gallery</span>
            </span>
          </Link>
        </motion.div>

        {/* Nav */}
        <motion.nav
          className="hidden md:flex items-center gap-6 text-sm text-muted-foreground"
          variants={slideInLeft}
        >
          <Link
            to="/"
            className="transition-smooth hover:text-foreground [&.active]:text-foreground [&.active]:font-medium"
            data-ocid="nav.gallery_link"
          >
            Gallery
          </Link>
          <Link
            to="/upload"
            className="transition-smooth hover:text-foreground [&.active]:text-foreground [&.active]:font-medium"
            data-ocid="nav.upload_link"
          >
            Upload
          </Link>
        </motion.nav>

        {/* CTA */}
        <motion.div variants={slideInRight}>
          <Button
            asChild
            size="sm"
            className="gap-2"
            data-ocid="header.upload_button"
          >
            <Link to="/upload">
              <Upload size={15} strokeWidth={2} />
              <span>Upload</span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </header>
  );
}
