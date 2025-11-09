import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import Create from "./pages/Create";
import Strategy from "./pages/Strategy";
import Intelligence from "./pages/Intelligence";
import Hub from "./pages/Hub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/create" replace />} />
          <Route path="/create" element={<AppShell><Create /></AppShell>} />
          <Route path="/strategy" element={<AppShell><Strategy /></AppShell>} />
          <Route path="/intelligence" element={<AppShell><Intelligence /></AppShell>} />
          <Route path="/hub" element={<AppShell><Hub /></AppShell>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
