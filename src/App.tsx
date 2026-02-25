import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/contexts/AuthContext";

import DashboardServiceComponent from "@/components/services/DashboardServiceComponent";
import AuthServiceComponent from "@/components/services/AuthServiceComponent";
import UserServiceComponent from "@/components/services/UserServiceComponent";
import QuizServiceComponent from "@/components/services/QuizServiceComponent";
import CommunityServiceComponent from "@/components/services/CommunityServiceComponent";
import VideoAnalysisComponent from "@/components/services/VideoAnalysisComponent";
import PaymentComponent from "@/components/services/PaymentComponent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-12 flex items-center border-b border-border bg-card/50 backdrop-blur-sm px-4 shrink-0">
                  <SidebarTrigger />
                  <span className="ml-3 text-sm font-jua text-muted-foreground tracking-wide">
                    Service Management Dashboard
                  </span>
                </header>
                <main className="flex-1 overflow-y-auto p-6">
                  <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/" element={<DashboardServiceComponent />} />
                        <Route path="/auth" element={<AuthServiceComponent />} />
                        <Route path="/user" element={<UserServiceComponent />} />
                        <Route path="/quiz" element={<QuizServiceComponent />} />
                        <Route path="/community" element={<CommunityServiceComponent />} />
                        <Route path="/video-analysis" element={<VideoAnalysisComponent />} />
                        <Route path="/payment" element={<PaymentComponent />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </AnimatePresence>
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
