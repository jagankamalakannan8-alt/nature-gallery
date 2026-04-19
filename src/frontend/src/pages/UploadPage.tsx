import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, ImageIcon, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useUploadImage } from "../hooks/useImages";
import {
  ease,
  fadeIn,
  fadeInScale,
  fadeUp,
  itemDelay,
  staggerContainer,
} from "../lib/animations";
import type { UploadState } from "../types";

interface FilePreview {
  file: File;
  preview: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// ---------- UploadZoneContent ----------

function UploadZoneContent({
  isDragActive,
  state,
}: {
  isDragActive: boolean;
  state: UploadState;
}) {
  if (state.status === "uploading") {
    return (
      <motion.div
        className="flex flex-col items-center gap-5 w-full max-w-xs"
        key="uploading"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        {/* Spinner ring */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/20"
            style={{ borderRadius: "50%" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
            style={{ borderRadius: "50%" }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {Math.round(state.progress)}%
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full">
          <p className="text-sm text-muted-foreground text-center mb-2.5">
            Uploading to gallery…
          </p>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full progress-bar-gradient"
              animate={{ width: `${state.progress}%` }}
              transition={{ duration: 0.3, ease: ease.smooth }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  if (state.status === "success") {
    return (
      <motion.div
        key="success"
        className="flex flex-col items-center gap-3"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center"
        >
          <CheckCircle2 size={36} className="text-primary" />
        </motion.div>
        <p className="text-foreground font-semibold text-lg">Uploaded!</p>
        <p className="text-sm text-muted-foreground">Navigating to gallery…</p>
      </motion.div>
    );
  }

  if (state.status === "error") {
    return (
      <motion.div
        key="error"
        className="flex flex-col items-center gap-3"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"
        >
          <AlertCircle size={34} className="text-destructive" />
        </motion.div>
        <p className="text-destructive font-semibold">Upload failed</p>
        <p className="text-sm text-muted-foreground text-center">
          {state.error ?? "Please try again"}
        </p>
      </motion.div>
    );
  }

  // idle / default
  return (
    <motion.div
      key="idle"
      className="flex flex-col items-center gap-4"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        animate={
          isDragActive
            ? { scale: 1.2, rotate: -8, y: -4 }
            : { scale: 1, rotate: 0, y: 0 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
      >
        <Upload
          size={28}
          className={isDragActive ? "text-primary" : "text-primary/70"}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {isDragActive ? (
          <motion.p
            key="drag"
            className="text-primary font-semibold text-xl"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            Drop it here!
          </motion.p>
        ) : (
          <motion.div
            key="prompt"
            className="text-center"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-foreground font-medium mb-1">
              Drag &amp; drop photos here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-muted-foreground">
        JPG, PNG, WebP, GIF — max 10 MB each
      </p>
    </motion.div>
  );
}

// ---------- FilePreviewCard ----------

function FilePreviewCard({
  preview,
  onRemove,
  index,
}: {
  preview: FilePreview;
  onRemove: () => void;
  index: number;
}) {
  return (
    <motion.div
      className="relative group rounded-xl overflow-hidden border border-border bg-card shadow-soft"
      variants={fadeInScale}
      layout
    >
      <img
        src={preview.preview}
        alt={preview.file.name}
        className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-3">
        <p className="text-white text-xs truncate font-medium">
          {preview.file.name}
        </p>
        <p className="text-white/70 text-xs">
          {(preview.file.size / 1024 / 1024).toFixed(1)} MB
        </p>
      </div>
      <motion.button
        type="button"
        onClick={onRemove}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-foreground/60 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-destructive"
        aria-label="Remove"
        data-ocid={`upload.delete_button.${index + 1}`}
      >
        <X size={14} />
      </motion.button>
    </motion.div>
  );
}

// ---------- UploadPage ----------

export function UploadPage() {
  const { mutateAsync: uploadImage } = useUploadImage();
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    progress: 0,
  });
  const [queue, setQueue] = useState<FilePreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-navigate to gallery on success after 1.5 seconds
  useEffect(() => {
    if (uploadState.status !== "success") return;
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 1500);
    return () => clearTimeout(timer);
  }, [uploadState.status]);

  const addFiles = useCallback(
    (files: File[]) => {
      const valid = files.filter(
        (f) => f.type.startsWith("image/") && f.size <= MAX_FILE_SIZE,
      );
      const tooLarge = files.filter((f) => f.size > MAX_FILE_SIZE).length;
      if (tooLarge > 0) {
        toast.error(`${tooLarge} file(s) exceeded the 10 MB limit`);
      }
      const previews: FilePreview[] = valid.map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
      }));
      setQueue((q) => [...q, ...previews]);
      if (uploadState.status === "error" || uploadState.status === "success") {
        setUploadState({ status: "idle", progress: 0 });
      }
    },
    [uploadState.status],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    addFiles(Array.from(e.dataTransfer.files));
  }

  function removeFromQueue(index: number) {
    setQueue((q) => {
      URL.revokeObjectURL(q[index].preview);
      return q.filter((_, i) => i !== index);
    });
  }

  function clearQueue() {
    for (const p of queue) URL.revokeObjectURL(p.preview);
    setQueue([]);
  }

  async function handleUploadAll() {
    if (queue.length === 0) return;
    setUploadState({ status: "uploading", progress: 0 });

    try {
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        const arrayBuffer = await item.file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer) as Uint8Array<ArrayBuffer>;

        await uploadImage({
          filename: item.file.name,
          blob: bytes,
          onProgress: (pct) => {
            const overall = ((i + pct / 100) / queue.length) * 100;
            setUploadState({ status: "uploading", progress: overall });
          },
        });

        URL.revokeObjectURL(item.preview);
      }

      setQueue([]);
      setUploadState({ status: "success", progress: 100 });
      toast.success("Photos uploaded! Opening gallery…");
    } catch {
      setUploadState({
        status: "error",
        progress: 0,
        error: "Upload failed. Please try again.",
      });
      toast.error("Upload failed");
    }
  }

  const isUploading = uploadState.status === "uploading";

  return (
    <section
      className="container max-w-3xl mx-auto px-6 py-12"
      data-ocid="upload.page"
    >
      {/* Page heading */}
      <motion.div
        className="mb-10 text-center"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: ease.smooth }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5"
        >
          <ImageIcon size={28} className="text-primary" />
        </motion.div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
          Share Your Photos
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Upload nature photos to the public gallery — visible to everyone,
          enjoyed by all.
        </p>
      </motion.div>

      {/* Drop zone */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={itemDelay(1)}
      >
        <input
          ref={inputRef}
          id="upload-input"
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handleInputChange}
          data-ocid="upload.input"
          disabled={isUploading}
        />
        <label
          htmlFor="upload-input"
          aria-label="Upload area: drag and drop or click to select photos"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={[
            "relative flex flex-col items-center justify-center min-h-[240px] rounded-2xl border-2 border-dashed transition-all duration-300 p-8",
            isUploading ? "cursor-not-allowed" : "cursor-pointer",
            isDragActive
              ? "border-primary bg-primary/8 scale-[1.01] shadow-elevated"
              : uploadState.status === "error"
                ? "border-destructive/50 bg-destructive/5"
                : uploadState.status === "success"
                  ? "border-primary/60 bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/30 bg-muted/10",
          ].join(" ")}
          data-ocid="upload.dropzone"
        >
          {/* Animated border glow on drag */}
          <AnimatePresence>
            {isDragActive && (
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 0 3px oklch(var(--primary) / 0.25), inset 0 0 40px oklch(var(--primary) / 0.06)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <UploadZoneContent
              key={uploadState.status}
              isDragActive={isDragActive}
              state={uploadState}
            />
          </AnimatePresence>
        </label>
      </motion.div>

      {/* Queue preview */}
      <AnimatePresence>
        {queue.length > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: ease.smooth }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">
                {queue.length} photo{queue.length !== 1 ? "s" : ""} ready to
                upload
              </p>
              <motion.button
                type="button"
                onClick={clearQueue}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="upload.clear_button"
              >
                Clear all
              </motion.button>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              data-ocid="upload.list"
            >
              {queue.map((p, i) => (
                <FilePreviewCard
                  key={p.preview}
                  preview={p}
                  index={i}
                  onRemove={() => removeFromQueue(i)}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35, ease: ease.smooth }}
            >
              <Button
                size="lg"
                className="w-full gap-2 transition-smooth"
                onClick={handleUploadAll}
                disabled={isUploading}
                data-ocid="upload.submit_button"
              >
                <motion.span
                  animate={isUploading ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    duration: 1,
                    repeat: isUploading ? Number.POSITIVE_INFINITY : 0,
                    ease: "linear",
                  }}
                >
                  <Upload size={18} />
                </motion.span>
                {isUploading
                  ? `Uploading… ${Math.round(uploadState.progress)}%`
                  : `Upload ${queue.length} Photo${queue.length !== 1 ? "s" : ""}`}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error retry */}
      <AnimatePresence>
        {uploadState.status === "error" && (
          <motion.div
            className="mt-4 text-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-ocid="upload.error_state"
          >
            <Button
              variant="outline"
              className="transition-smooth"
              onClick={() => setUploadState({ status: "idle", progress: 0 })}
              data-ocid="upload.retry_button"
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
