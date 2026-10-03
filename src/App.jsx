import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Terms } from "./pages/Terms";
import { ProjectDetails } from "./pages/ProjectDetails";
import { SoftUiDemoPage } from "./pages/SoftUiDemoPage";
import { Toaster } from "@/components/ui/toaster";
import WelcomeScreen from "@/components/WelcomeScreen";
import { Analytics } from "@vercel/analytics/react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { CustomCursor } from "@/components/CustomCursor";

function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      return (
        p.includes("/soft-ui") ||
        p.includes("/demo") ||
        p.includes("/project/") ||
        p.includes("/privacy") ||
        p.includes("/terms") ||
        sessionStorage.getItem("welcome_shown") === "true"
      );
    }
    return false;
  });

  const handleWelcomeComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("welcome_shown", "true");
    }
    setWelcomeComplete(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (window.location.pathname === "/admin" || window.location.pathname === "/admin/")) {
      window.location.replace("/admin/index.html");
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Helmet>
        <title>Ayan Manna | Portfolio</title>
        <meta name="description" content="Portfolio of Ayan Manna, a Full Stack Developer." />
      </Helmet>
      <CustomCursor />
      <Toaster />
      {!welcomeComplete ? (
        <WelcomeScreen onWelcomeComplete={handleWelcomeComplete} />
      ) : (
        <SmoothScroll>
          <ScrollProgressBar />
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="project/:id" element={<ProjectDetails />} />
              <Route path="soft-ui" element={<SoftUiDemoPage />} />
              <Route path="demo" element={<SoftUiDemoPage />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
          </BrowserRouter>
        </SmoothScroll>
      )}
    </ThemeProvider>
  );
}

export default App;