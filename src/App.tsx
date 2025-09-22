import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Lazy load NotFound page since it's only needed for 404 routes
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route 
          path="*" 
          element={
            <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
              <NotFound />
            </Suspense>
          } 
        />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
