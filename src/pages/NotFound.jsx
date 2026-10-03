import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Home, Code, Compass, Terminal, Sparkles, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#eae7e1] text-[#2d2b28] selection:bg-[#e59845]/25 selection:text-[#2d2b28] flex flex-col justify-between relative overflow-x-hidden font-digital">
      <Helmet>
        <title>404 - Page Not Found | Ayan Manna</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      {/* Embedded Neumorphic Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .font-handwriting {
            font-family: 'Gaegu', 'Quicksand', cursive, sans-serif;
          }
          .font-digital {
            font-family: 'Fredoka', 'Quicksand', sans-serif;
          }
          .soft-ui-raised {
            background: #eae7e1;
            box-shadow: 6px 6px 14px #cfcbc2, -6px -6px 14px #ffffff;
          }
          .soft-ui-raised-card {
            background: #eae7e1;
            box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
          }
          .soft-ui-inset {
            background: #e4e1d9;
            box-shadow: inset 3px 3px 6px #cac5bb, inset -3px -3px 6px #ffffff;
          }
          .soft-ui-inset-subtle {
            background: #e6e3dc;
            box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
          }
        `
      }} />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl w-full soft-ui-raised-card rounded-[36px] p-8 sm:p-12 border border-[#dedad1] text-center relative overflow-hidden"
        >
          {/* Top Status Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui-inset text-xs font-mono text-[#5a5751] mb-8 border border-[#cdc8be]">
            <span className="w-2 h-2 rounded-full bg-[#f06292] animate-pulse" />
            <span>HTTP_ERROR // 404_NOT_FOUND</span>
          </div>

          {/* 404 Giant Clay Display */}
          <div className="relative inline-block mb-6 select-none">
            <div className="text-8xl sm:text-9xl font-black tracking-tight text-[#2d2b28] drop-shadow-sm flex items-center justify-center">
              <span>4</span>
              <span className="text-[#e59845] mx-1 inline-block animate-bounce" style={{ animationDuration: '2.5s' }}>0</span>
              <span>4</span>
            </div>
            <div className="absolute -top-2 -right-4 px-2.5 py-0.5 rounded-full bg-[#f06292] text-white text-[11px] font-mono font-bold shadow-sm rotate-6">
              Exception
            </div>
          </div>

          {/* Headline and Description */}
          <h1 className="text-2xl sm:text-3xl font-black text-[#2d2b28] mb-3">
            Component Route Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#5a5751] max-w-lg mx-auto leading-relaxed mb-8">
            The page or route you requested is undefined. It may have been unmounted, moved, or deleted from the portfolio registry.
          </p>

          {/* Debossed Terminal Diagnostics Box */}
          <div className="soft-ui-inset rounded-2xl p-5 mb-8 text-left border border-[#cdc8be] font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#cdc8be]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f06292]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#e59845]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#8b8780]" />
              </div>
              <span className="text-[11px] text-[#8b8780] flex items-center gap-1">
                <Terminal size={12} /> route_trace.log
              </span>
            </div>

            <div className="space-y-1 text-[#43413d]">
              <p className="text-[#8b8780] italic">// Unhandled Route Exception</p>
              <p>
                <span className="text-[#e59845]">lookupRoute</span>
                <span className="text-[#8b8780]">(</span>
                <span className="text-[#2d2b28] font-semibold">"{typeof window !== 'undefined' ? window.location.pathname : '/404'}"</span>
                <span className="text-[#8b8780]">)</span>
                <span className="text-[#f06292]"> =&gt; </span>
                <span className="text-[#f06292] font-semibold">404 null</span>
              </p>
              <p>
                <span className="text-[#8b8780]">suggestion:</span>
                <span className="text-[#5a5751]"> returnToSafety(</span>
                <span className="text-[#e59845]">"root"</span>
                <span className="text-[#5a5751]">)</span>
              </p>
            </div>
          </div>

          {/* Interactive Navigation Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl soft-ui-raised text-[#2d2b28] hover:text-[#e59845] font-bold text-sm border border-[#dedad1] shadow-md transition-all cursor-pointer"
              >
                <ArrowLeft size={16} className="text-[#e59845]" />
                <span>Return to Portfolio</span>
              </motion.button>
            </Link>

            <motion.a
              href="https://github.com/ayanmanna123"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl soft-ui-inset text-[#5a5751] hover:text-[#2d2b28] font-bold text-sm border border-[#cdc8be] transition-all cursor-pointer"
            >
              <Code size={16} className="text-[#5a5751]" />
              <span>Explore GitHub Repos</span>
            </motion.a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
