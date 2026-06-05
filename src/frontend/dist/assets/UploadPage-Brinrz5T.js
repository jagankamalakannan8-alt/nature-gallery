import { c as createLucideIcon, u as useAuth, r as reactExports, o as ue, j as jsxRuntimeExports, m as motion, n as fadeUp, k as ease, e as itemDelay, s as staggerContainer, B as Button, U as Upload, g as fadeIn, f as fadeInScale } from "./index-3cbt0zST.js";
import { a as useUploadImage, I as Image, A as AnimatePresence, X } from "./useImages-g2jPE6uG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const MAX_FILE_SIZE = 10 * 1024 * 1024;
function UploadZoneContent({
  isDragActive,
  state
}) {
  if (state.status === "uploading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col items-center gap-5 w-full max-w-xs",
        variants: fadeIn,
        initial: "hidden",
        animate: "visible",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-0 rounded-full border-4 border-primary/20",
                style: { borderRadius: "50%" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-0 rounded-full border-4 border-transparent border-t-primary",
                style: { borderRadius: "50%" },
                animate: { rotate: 360 },
                transition: {
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-primary", children: [
              Math.round(state.progress),
              "%"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center mb-2.5", children: "Uploading to gallery…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full rounded-full progress-bar-gradient",
                animate: { width: `${state.progress}%` },
                transition: { duration: 0.3, ease: ease.smooth }
              }
            ) })
          ] })
        ]
      },
      "uploading"
    );
  }
  if (state.status === "success") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col items-center gap-3",
        variants: fadeIn,
        initial: "hidden",
        animate: "visible",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0, rotate: -20 },
              animate: { scale: 1, rotate: 0 },
              transition: { type: "spring", stiffness: 400, damping: 22 },
              className: "w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 36, className: "text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-lg", children: "Uploaded!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Navigating to gallery…" })
        ]
      },
      "success"
    );
  }
  if (state.status === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col items-center gap-3",
        variants: fadeIn,
        initial: "hidden",
        animate: "visible",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.6, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { type: "spring", stiffness: 350, damping: 20 },
              className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 34, className: "text-destructive" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-semibold", children: "Upload failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: state.error ?? "Please try again" })
        ]
      },
      "error"
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex flex-col items-center gap-4",
      variants: fadeIn,
      initial: "hidden",
      animate: "visible",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: isDragActive ? { scale: 1.2, rotate: -8, y: -4 } : { scale: 1, rotate: 0, y: 0 },
            transition: { type: "spring", stiffness: 300, damping: 18 },
            className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Upload,
              {
                size: 28,
                className: isDragActive ? "text-primary" : "text-primary/70"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isDragActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "text-primary font-semibold text-xl",
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -6 },
            transition: { duration: 0.2 },
            children: "Drop it here!"
          },
          "drag"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center",
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -6 },
            transition: { duration: 0.2 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium mb-1", children: "Drag & drop photos here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "or click to browse files" })
            ]
          },
          "prompt"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "JPG, PNG, WebP, GIF — max 10 MB each" })
      ]
    },
    "idle"
  );
}
function FilePreviewCard({
  preview,
  onRemove,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "relative group rounded-xl overflow-hidden border border-border bg-card shadow-soft",
      variants: fadeInScale,
      layout: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: preview.preview,
            alt: preview.file.name,
            className: "w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs truncate font-medium", children: preview.file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-xs", children: [
            (preview.file.size / 1024 / 1024).toFixed(1),
            " MB"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            onClick: onRemove,
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-foreground/60 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-destructive",
            "aria-label": "Remove",
            "data-ocid": `upload.delete_button.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
          }
        )
      ]
    }
  );
}
function UploadPage() {
  const { isAuthenticated, isAdmin, isAdminLoading } = useAuth();
  const { mutateAsync: uploadImage } = useUploadImage();
  const [uploadState, setUploadState] = reactExports.useState({
    status: "idle",
    progress: 0
  });
  const [queue, setQueue] = reactExports.useState([]);
  const [isDragActive, setIsDragActive] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isAdminLoading) return;
    if (!isAuthenticated || !isAdmin) {
      window.location.href = "/";
    }
  }, [isAuthenticated, isAdmin, isAdminLoading]);
  reactExports.useEffect(() => {
    if (uploadState.status !== "success") return;
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 1500);
    return () => clearTimeout(timer);
  }, [uploadState.status]);
  const addFiles = reactExports.useCallback(
    (files) => {
      const valid = files.filter(
        (f) => f.type.startsWith("image/") && f.size <= MAX_FILE_SIZE
      );
      const tooLarge = files.filter((f) => f.size > MAX_FILE_SIZE).length;
      if (tooLarge > 0) {
        ue.error(`${tooLarge} file(s) exceeded the 10 MB limit`);
      }
      const previews = valid.map((f) => ({
        file: f,
        preview: URL.createObjectURL(f)
      }));
      setQueue((q) => [...q, ...previews]);
      if (uploadState.status === "error" || uploadState.status === "success") {
        setUploadState({ status: "idle", progress: 0 });
      }
    },
    [uploadState.status]
  );
  if (isAdminLoading || !isAdmin) return null;
  function handleInputChange(e) {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  }
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }
  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }
  function handleDragLeave(e) {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragActive(false);
    }
  }
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    addFiles(Array.from(e.dataTransfer.files));
  }
  function removeFromQueue(index) {
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
        const bytes = new Uint8Array(arrayBuffer);
        await uploadImage({
          filename: item.file.name,
          blob: bytes,
          onProgress: (pct) => {
            const overall = (i + pct / 100) / queue.length * 100;
            setUploadState({ status: "uploading", progress: overall });
          }
        });
        URL.revokeObjectURL(item.preview);
      }
      setQueue([]);
      setUploadState({ status: "success", progress: 100 });
      ue.success("Photos uploaded! Opening gallery…");
    } catch {
      setUploadState({
        status: "error",
        progress: 0,
        error: "Upload failed. Please try again."
      });
      ue.error("Upload failed");
    }
  }
  const isUploading = uploadState.status === "uploading";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "container max-w-3xl mx-auto px-6 py-12",
      "data-ocid": "upload.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "mb-10 text-center",
            variants: fadeUp,
            initial: "hidden",
            animate: "visible",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.6, ease: ease.smooth },
                  className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 28, className: "text-primary" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display font-bold text-foreground mb-3 tracking-tight", children: "Share Your Photos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-md mx-auto", children: "Upload nature photos to the public gallery — visible to everyone, enjoyed by all." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            variants: fadeUp,
            initial: "hidden",
            animate: "visible",
            transition: itemDelay(1),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  id: "upload-input",
                  type: "file",
                  accept: "image/*",
                  multiple: true,
                  className: "sr-only",
                  onChange: handleInputChange,
                  "data-ocid": "upload.input",
                  disabled: isUploading
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "upload-input",
                  "aria-label": "Upload area: drag and drop or click to select photos",
                  onDragOver: handleDragOver,
                  onDragEnter: handleDragEnter,
                  onDragLeave: handleDragLeave,
                  onDrop: handleDrop,
                  className: [
                    "relative flex flex-col items-center justify-center min-h-[240px] rounded-2xl border-2 border-dashed transition-all duration-300 p-8",
                    isUploading ? "cursor-not-allowed" : "cursor-pointer",
                    isDragActive ? "border-primary bg-primary/8 scale-[1.01] shadow-elevated" : uploadState.status === "error" ? "border-destructive/50 bg-destructive/5" : uploadState.status === "success" ? "border-primary/60 bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30 bg-muted/10"
                  ].join(" "),
                  "data-ocid": "upload.dropzone",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isDragActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "absolute inset-0 rounded-2xl pointer-events-none",
                        style: {
                          boxShadow: "0 0 0 3px oklch(var(--primary) / 0.25), inset 0 0 40px oklch(var(--primary) / 0.06)"
                        },
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                        transition: { duration: 0.2 }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      UploadZoneContent,
                      {
                        isDragActive,
                        state: uploadState
                      },
                      uploadState.status
                    ) })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: queue.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "mt-8",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 10 },
            transition: { duration: 0.4, ease: ease.smooth },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-muted-foreground", children: [
                  queue.length,
                  " photo",
                  queue.length !== 1 ? "s" : "",
                  " ready to upload"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    onClick: clearQueue,
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
                    "data-ocid": "upload.clear_button",
                    children: "Clear all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6",
                  variants: staggerContainer,
                  initial: "hidden",
                  animate: "visible",
                  "data-ocid": "upload.list",
                  children: queue.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FilePreviewCard,
                    {
                      preview: p,
                      index: i,
                      onRemove: () => removeFromQueue(i)
                    },
                    p.preview
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.15, duration: 0.35, ease: ease.smooth },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "w-full gap-2 transition-smooth",
                      onClick: handleUploadAll,
                      disabled: isUploading,
                      "data-ocid": "upload.submit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.span,
                          {
                            animate: isUploading ? { rotate: 360 } : { rotate: 0 },
                            transition: {
                              duration: 1,
                              repeat: isUploading ? Number.POSITIVE_INFINITY : 0,
                              ease: "linear"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 18 })
                          }
                        ),
                        isUploading ? `Uploading… ${Math.round(uploadState.progress)}%` : `Upload ${queue.length} Photo${queue.length !== 1 ? "s" : ""}`
                      ]
                    }
                  )
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: uploadState.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "mt-4 text-center",
            variants: fadeIn,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            "data-ocid": "upload.error_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "transition-smooth",
                onClick: () => setUploadState({ status: "idle", progress: 0 }),
                "data-ocid": "upload.retry_button",
                children: "Try Again"
              }
            )
          }
        ) })
      ]
    }
  );
}
export {
  UploadPage
};
