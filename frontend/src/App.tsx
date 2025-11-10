import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { CommandPalette } from "./components/CommandPalette";
import { LoadingScreen } from "./components/LoadingScreen";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

// Lazy load pages for better performance
const Studio = lazy(() => import("./pages/Studio"));
const Strategy = lazy(() => import("./pages/Strategy"));
const Research = lazy(() => import("./pages/Research"));
const Brain = lazy(() => import("./pages/Brain"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Legacy pages for backwards compatibility
const Create = lazy(() => import("./pages/Create"));
const Intelligence = lazy(() => import("./pages/Intelligence"));
const Hub = lazy(() => import("./pages/Hub"));
const Playbooks = lazy(() => import("./pages/Playbooks"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  useKeyboardShortcuts();

  return (
    <>
      <Toaster />
      <Sonner />
      <CommandPalette />
      <Routes>
        {/* Redirect root to Content Studio */}
        <Route path="/" element={<Navigate to="/studio" replace />} />
        
        {/* New Routes */}
        <Route
          path="/studio"
          element={
            <AppShell>
              <Suspense fallback={<LoadingScreen />}>
                <Studio />
              </Suspense>
            </AppShell>
          }
        />
        <Route
          path="/strategy"
          element={
            <AppShell>
              <Suspense fallback={<LoadingScreen />}>
                <Strategy />
              </Suspense>
            </AppShell>
          }
        />
        <Route
          path="/research"
          element={
            <AppShell>
              <Suspense fallback={<LoadingScreen />}>
                <Research />
              </Suspense>
            </AppShell>
          }
        />
        <Route
          path="/brain"
          element={
            <AppShell>
              <Suspense fallback={<LoadingScreen />}>
                <Brain />
              </Suspense>
            </AppShell>
          }
        />
        
        {/* Legacy Route Redirects */}
        <Route path="/create" element={<Navigate to="/studio" replace />} />
        <Route path="/intelligence" element={<Navigate to="/research" replace />} />
        <Route path="/hub" element={<Navigate to="/brain" replace />} />
        <Route path="/playbooks" element={<Navigate to="/strategy" replace />} />
        
        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
