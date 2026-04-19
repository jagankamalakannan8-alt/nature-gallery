import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

// Lazy-load pages
const GalleryPage = lazy(() =>
  import("./pages/GalleryPage").then((m) => ({ default: m.GalleryPage })),
);
const UploadPage = lazy(() =>
  import("./pages/UploadPage").then((m) => ({ default: m.UploadPage })),
);

// Page loading fallback
function PageSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
          <Skeleton key={k} className="aspect-[4/3] rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Router setup
const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <GalleryPage />
    </Suspense>
  ),
});

const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upload",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <UploadPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([indexRoute, uploadRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
