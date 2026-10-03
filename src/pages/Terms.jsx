import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, ShieldAlert, Award, ExternalLink } from "lucide-react";

export const Terms = () => {
  return (
    <div className="min-h-screen bg-[#eae7e1] text-[#2d2b28] selection:bg-[#e59845]/25 selection:text-[#2d2b28] overflow-x-hidden font-digital">
      <Helmet>
        <title>Terms of Service | Ayan Manna | Portfolio</title>
        <meta name="description" content="Terms of Service for Ayan Manna's portfolio." />
        <link rel="canonical" href="https://ayanmanna.in/terms" />
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

      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto min-h-[85vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="soft-ui-raised-card rounded-[36px] p-6 sm:p-12 border border-[#dedad1]"
        >
          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-2xl soft-ui-inset flex items-center justify-center text-[#e59845] border border-[#cdc8be]">
              <FileText size={20} />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#e59845] uppercase">
              Legal &amp; Usage Terms
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#2d2b28] mb-3">
            Terms of Service
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#8b8780] mb-8">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-6 text-[#43413d] text-sm sm:text-base leading-relaxed">
            {/* Section 1 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle2 size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">1. Acceptance of Terms</h2>
              </div>
              <p className="text-[#5a5751]">
                By accessing and exploring this portfolio website, you agree to comply with and be bound by these Terms of Service. If you disagree with any terms presented here, please exit the site.
              </p>
            </div>

            {/* Section 2 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Award size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">2. Intellectual Property &amp; Code Use</h2>
              </div>
              <p className="text-[#5a5751] mb-2">
                All showcase designs, UI layouts, animations, personal descriptions, and written content on this website are the intellectual property of Ayan Manna.
              </p>
              <p className="text-[#5a5751]">
                Open-source repositories linked from this portfolio are governed by their respective open-source licenses (e.g., MIT, Apache 2.0) specified on GitHub.
              </p>
            </div>

            {/* Section 3 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <ShieldAlert size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">3. Disclaimer of Warranties</h2>
              </div>
              <p className="text-[#5a5751]">
                This portfolio website is provided on an "as is" and "as available" basis without any express or implied warranties of any kind. I do not guarantee uninterrupted uptime or fault-free operation.
              </p>
            </div>

            {/* Section 4 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <ExternalLink size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">4. Third-Party Links &amp; Demos</h2>
              </div>
              <p className="text-[#5a5751]">
                This site links to external third-party services and demo deployments (such as GitHub, LinkedIn, LeetCode, Vercel). I do not control or take responsibility for any third-party policies, content, or practices.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
