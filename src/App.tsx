
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignInPage, SignUpPage } from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SignedIn, SignedOut, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Protected route - only accessible when signed in */}
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <Index />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/sign-in" replace />
                </SignedOut>
              </>
            }
          />
          
          {/* Authentication routes */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          
          {/* OAuth callback routes */}
          <Route path="/sign-in/callback/*" element={<SignInPage />} />
          <Route path="/sign-up/callback/*" element={<SignUpPage />} /> {/* Fixed to use SignUpPage */}
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
