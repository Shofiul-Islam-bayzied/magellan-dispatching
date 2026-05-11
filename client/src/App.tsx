import { lazy, Suspense } from "react";
import Home from "@/pages/Home";
const Schedule = lazy(() => import("@/pages/Schedule"));
const GetStarted = lazy(() => import("@/pages/GetStarted"));
const Admin = lazy(() => import("@/pages/Admin"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/not-found"));
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getQueryFn } from "@/lib/queryClient";
import type { PublicSettings } from "@shared/schema";

function Router() {
  const { data: settings } = useQuery<PublicSettings>({
    queryKey: ["/api/public/settings"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: Infinity,
  });

  const adminSlug = settings?.adminSlug ?? "mgmt-9x7k";

  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/get-started" component={GetStarted} />
        <Route path="/schedule" component={Schedule} />
        <Route path={`/${adminSlug}`} component={Admin} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
