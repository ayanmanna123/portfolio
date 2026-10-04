import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Smartphone, Layers, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import NeumorphicDashboard, {
  SoftUiClock,
  SoftUiDigitalCard,
  SoftUiProgressBar,
  SoftUiCapsuleMeter,
  SoftUiCalendar,
  SoftUiGreeting,
} from "../components/SoftUiWidgets";

export const SoftUiDemoPage = () => {
  const [viewTab, setViewTab] = useState("device"); // "device" | "components"
  const { resolvedTheme, setTheme } = useTheme();
  const [pageTheme, setPageTheme] = useState("dark"); // "dark" (default, matching reference) | "light"
  const isDark = pageTheme === "dark";

  // Sync with next-themes if present
  useEffect(() => {
    if (resolvedTheme) {
      setPageTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const handleThemeChange = (newTheme) => {
    setPageTheme(newTheme);
    if (setTheme) {
      setTheme(newTheme);
    }
  };

  const referenceDate = new Date(2026, 9, 4, 14, 21, 0);

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 px-4 transition-colors duration-300 ${
        isDark ? "bg-[#0e1014] text-[#eae7e1]" : "bg-[#f3f1ec] text-[#2d2b28]"
      }`}
    >
      <Helmet>
        <title>Soft UI / Neumorphic Widgets Demo | Ayan Manna</title>
        <meta
          name="description"
          content="Interactive Neumorphic Soft UI widgets demo featuring analog clock, digital alarm card, progress bars, fluid level meters, and calendar in both dark and light modes."
        />
      </Helmet>

      {/* Embedded Neumorphic Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Quicksand:wght@500;600;700&family=Fredoka:wght@500;600;700&display=swap');
          
          .font-handwriting {
            font-family: 'Gaegu', 'Quicksand', cursive, sans-serif;
          }
          .font-digital {
            font-family: 'Fredoka', 'Quicksand', sans-serif;
          }

          .soft-ui-raised {
            background: #eae7e1;
            box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
          }
          .soft-ui-inset {
            background: #e4e1d9;
            box-shadow: inset 4px 4px 8px #cac5bb, inset -4px -4px 8px #ffffff;
          }
          .soft-ui-inset-subtle {
            background: #e6e3dc;
            box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
          }

          .soft-ui-dark-raised {
            background: #191c23;
            box-shadow: 10px 10px 22px #0f1115, -10px -10px 22px #232731;
          }
          .soft-ui-dark-inset {
            background: #13151a;
            box-shadow: inset 4px 4px 8px #0b0c0f, inset -4px -4px 8px #21252e;
          }
          .soft-ui-dark-inset-subtle {
            background: #15171d;
            box-shadow: inset 2px 2px 5px #0c0d10, inset -2px -2px 5px #20242d;
          }
        `
      }} />

      {/* Top Navigation */}
      <header
        className={`w-full max-w-4xl flex items-center justify-between pb-6 border-b mb-8 transition-colors ${
          isDark ? "border-[#22262f]" : "border-[#ded9cf]"
        }`}
      >
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer ${
            isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-black"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Global Theme Toggle */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl transition-colors ${
              isDark ? "bg-[#181a20] border border-[#262a33]" : "bg-[#e6e2d8]"
            }`}
          >
            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isDark
                  ? "bg-[#282d38] text-[#eae7e1] shadow-sm font-bold"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-[#ff5768]" />
              <span className="hidden sm:inline">Dark</span>
            </button>
            <button
              onClick={() => handleThemeChange("light")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !isDark
                  ? "bg-white text-zinc-900 shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#e59845]" />
              <span className="hidden sm:inline">Light</span>
            </button>
          </div>

          {/* View Tab Switch */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl transition-colors ${
              isDark ? "bg-[#181a20] border border-[#262a33]" : "bg-[#e6e2d8]"
            }`}
          >
            <button
              onClick={() => setViewTab("device")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewTab === "device"
                  ? isDark
                    ? "bg-[#282d38] text-white shadow-sm"
                    : "bg-white text-zinc-900 shadow-sm"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone Preview</span>
            </button>
            <button
              onClick={() => setViewTab("components")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewTab === "components"
                  ? isDark
                    ? "bg-[#282d38] text-white shadow-sm"
                    : "bg-white text-zinc-900 shadow-sm"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Component Library</span>
            </button>
          </div>
        </div>
      </header>

      {/* Title Header */}
      <div className="text-center max-w-xl mb-6 select-none">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold font-digital mb-2.5 ${
            isDark
              ? "bg-[#ff5768]/15 text-[#ff5768] border border-[#ff5768]/20"
              : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skeuomorphic Soft UI & Clay Neumorphism</span>
        </div>
        <h1
          className={`text-3xl sm:text-4xl font-black tracking-tight font-digital ${
            isDark ? "text-[#eae7e1]" : "text-[#33312e]"
          }`}
        >
          Soft UI Dashboard Widgets
        </h1>
        <p
          className={`text-xs sm:text-sm mt-2 font-medium ${
            isDark ? "text-[#787a82]" : "text-[#75726b]"
          }`}
        >
          Handcrafted with dual extruded & inset shadows, charcoal & clay textures, and interactive states.
        </p>
      </div>

      {/* View Switch Content */}
      {viewTab === "device" ? (
        <NeumorphicDashboard
          theme={pageTheme}
          onThemeChange={handleThemeChange}
        />
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Card 1: Analog Clock & Typography */}
          <div
            className={`p-6 rounded-3xl flex flex-col gap-4 transition-all duration-300 ${
              isDark
                ? "bg-[#181a20] border border-[#22252e] shadow-[8px_8px_20px_#0f1115,-8px_-8px_20px_#232731]"
                : "bg-[#eae7e1] shadow-[8px_8px_20px_#cfcbc2,-8px_-8px_20px_#ffffff]"
            }`}
          >
            <h3
              className={`text-xs font-bold uppercase tracking-wider font-digital ${
                isDark ? "text-[#ff5768]" : "text-[#6d6a63]"
              }`}
            >
              1. Analog Clock & Organic Header
            </h3>
            <div className="flex items-center justify-around py-4">
              <SoftUiClock time={referenceDate} isLive={false} theme={pageTheme} />
              <SoftUiGreeting
                title={isDark ? "Hello.Oct" : "Hello.March"}
                subtitle="Live every day with ease!"
                theme={pageTheme}
              />
            </div>
            <p className={`text-xs font-mono ${isDark ? "text-[#787a82]" : "text-[#7a7770]"}`}>
              Features dual-shadow disc extrusion with cardinal hour numbers and smooth rotational transforms.
            </p>
          </div>

          {/* Card 2: Digital Clock LCD Inset Card */}
          <div
            className={`p-6 rounded-3xl flex flex-col gap-4 transition-all duration-300 ${
              isDark
                ? "bg-[#181a20] border border-[#22252e] shadow-[8px_8px_20px_#0f1115,-8px_-8px_20px_#232731]"
                : "bg-[#eae7e1] shadow-[8px_8px_20px_#cfcbc2,-8px_-8px_20px_#ffffff]"
            }`}
          >
            <h3
              className={`text-xs font-bold uppercase tracking-wider font-digital ${
                isDark ? "text-[#ff5768]" : "text-[#6d6a63]"
              }`}
            >
              2. Debossed LCD Digital Clock Card
            </h3>
            <div className="py-2">
              <SoftUiDigitalCard
                time={referenceDate}
                customDay={isDark ? "Sunday" : "Monday"}
                customDate={isDark ? "2026/10/04" : "2021/09/13"}
                theme={pageTheme}
              />
            </div>
            <p className={`text-xs font-mono ${isDark ? "text-[#787a82]" : "text-[#7a7770]"}`}>
              Deep inset box-shadow display bezel creating a sunken LCD glass screen aesthetic.
            </p>
          </div>

          {/* Card 3: Year Progress Pill */}
          <div
            className={`p-6 rounded-3xl flex flex-col gap-4 transition-all duration-300 ${
              isDark
                ? "bg-[#181a20] border border-[#22252e] shadow-[8px_8px_20px_#0f1115,-8px_-8px_20px_#232731]"
                : "bg-[#eae7e1] shadow-[8px_8px_20px_#cfcbc2,-8px_-8px_20px_#ffffff]"
            }`}
          >
            <h3
              className={`text-xs font-bold uppercase tracking-wider font-digital ${
                isDark ? "text-[#ff5768]" : "text-[#6d6a63]"
              }`}
            >
              3. Debossed Progress Bar
            </h3>
            <div className="py-4">
              <SoftUiProgressBar
                percent={isDark ? 24 : 29}
                label="The rest of the year"
                theme={pageTheme}
              />
            </div>
            <p className={`text-xs font-mono ${isDark ? "text-[#787a82]" : "text-[#7a7770]"}`}>
              Sunken rounded track with coral gradient fill and highlighted percentage badge.
            </p>
          </div>

          {/* Card 4: Capsule Fluid Meters & Calendar */}
          <div
            className={`p-6 rounded-3xl flex flex-col gap-4 transition-all duration-300 ${
              isDark
                ? "bg-[#181a20] border border-[#22252e] shadow-[8px_8px_20px_#0f1115,-8px_-8px_20px_#232731]"
                : "bg-[#eae7e1] shadow-[8px_8px_20px_#cfcbc2,-8px_-8px_20px_#ffffff]"
            }`}
          >
            <h3
              className={`text-xs font-bold uppercase tracking-wider font-digital ${
                isDark ? "text-[#ff5768]" : "text-[#6d6a63]"
              }`}
            >
              4. Capsule Meters & Calendar
            </h3>
            <div className="flex items-stretch gap-3 py-2">
              <SoftUiCapsuleMeter
                title={<>The<br />remaining<br />today</>}
                percent={40}
                variant="cutout"
                theme={pageTheme}
              />
              <SoftUiCapsuleMeter
                title="electricity"
                percent={80}
                variant="fluid"
                theme={pageTheme}
              />
              <SoftUiCalendar
                monthNumber={isDark ? 10 : 9}
                highlightDay={13}
                theme={pageTheme}
              />
            </div>
            <p className={`text-xs font-mono ${isDark ? "text-[#787a82]" : "text-[#7a7770]"}`}>
              Fluid reservoir capsules with percentage readouts and an interactive clay calendar with amber badge.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftUiDemoPage;
