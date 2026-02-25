import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ParallaxBackground from "@/components/ParallaxBackground";
import Header from "@/components/Header";
import HomePage from "@/pages/HomePage";
import GamePage from "@/pages/GamePage";
import AnalysisPage from "@/pages/AnalysisPage";
import CommunityPage from "@/pages/CommunityPage";
import ShopPage from "@/pages/ShopPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ParallaxBackground>
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
            <div className="mx-auto h-full w-full max-w-[1500px] px-5">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/game" element={<GamePage />} />
                  <Route path="/analysis" element={<AnalysisPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </div>
          </main>
        </ParallaxBackground>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
