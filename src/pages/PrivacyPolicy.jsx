import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Cookie, Mail, Sparkles } from "lucide-react";

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#eae7e1] text-[#2d2b28] selection:bg-[#e59845]/25 selection:text-[#2d2b28] overflow-x-hidden font-digital">
      <Helmet>
        <title>Privacy Policy | Ayan Manna | Portfolio</title>
        <meta name="description" content="Privacy Policy for Ayan Manna's portfolio. Learn how your data is handled." />
        <link rel="canonical" href="https://ayanmanna.in/privacy" />
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
              <ShieldCheck size={20} />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-[#e59845] uppercase">
              Data &amp; Security Protocol
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#2d2b28] mb-3">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#8b8780] mb-8">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-6 text-[#43413d] text-sm sm:text-base leading-relaxed">
            {/* Section 1 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Lock size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">1. Introduction</h2>
              </div>
              <p className="text-[#5a5751]">
                Welcome to my portfolio website. I value your privacy and believe in full transparency. This Privacy Policy explains how any information is handled when you browse the site or contact me directly.
              </p>
            </div>

            {/* Section 2 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Eye size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">2. Information Collection</h2>
              </div>
              <p className="text-[#5a5751] mb-3">
                When you choose to communicate through the contact console on this website, I only collect the details you voluntarily submit:
              </p>
              <div className="space-y-2 text-[#5a5751] font-medium my-3">
                {['Your Full Name', 'Your Email Address', 'The content and subject of your message'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e59845]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Sparkles size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">3. How Information Is Used</h2>
              </div>
              <p className="text-[#5a5751] mb-2">
                Information provided through inquiries is exclusively used to:
              </p>
              <div className="space-y-2 text-[#5a5751] font-medium my-3">
                {['Respond directly to your project, hiring, or collaboration requests.', 'Conduct professional correspondence regarding software engineering opportunities.'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e59845]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#5a5751]">
                I do <strong>not</strong> sell, rent, monetize, or distribute your personal details to any third-party advertisers or brokers.
              </p>
            </div>

            {/* Section 4 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Cookie size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">4. Analytics &amp; Cookies</h2>
              </div>
              <p className="text-[#5a5751]">
                This site may utilize lightweight privacy-first telemetry (such as Vercel Analytics) for monitoring aggregate visitor counts, performance benchmarks, and error rates. No invasive tracking cookies are used.
              </p>
            </div>

            {/* Section 5 */}
            <div className="soft-ui-inset rounded-2xl p-6 border border-[#cdc8be]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Mail size={18} className="text-[#e59845]" />
                <h2 className="text-lg font-bold text-[#2d2b28]">5. Direct Inquiries</h2>
              </div>
              <p className="text-[#5a5751]">
                If you have any questions regarding this Privacy Policy or your data, feel free to reach out directly through the contact section on the homepage or via email at <span className="font-mono text-[#e59845] font-semibold">ayanmanna2004@gmail.com</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
