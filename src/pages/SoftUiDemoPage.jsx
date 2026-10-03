import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Code2, Smartphone, Monitor, Layers } from "lucide-react";
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
  const staticDate = new Date(2021, 8, 13, 9, 21, 0);

  return (
    <div className="min-h-screen bg-[#f3f1ec] dark:bg-[#1a1917] text-[#2d2b28] dark:text-[#edebe6] flex flex-col items-center py-8 px-4 transition-colors">
      <Helmet>
        <title>Soft UI / Neumorphic Widgets Demo | Ayan Manna</title>
        <meta
          name="description"
          content="Interactive Neumorphic Soft UI widgets demo featuring analog clock, digital alarm card, progress bars, fluid level meters, and calendar."
        />
      </Helmet>

      {/* Top Navigation */}
      <header className="w-full max-w-4xl flex items-center justify-between pb-6 border-b border-[#ded9cf] dark:border-zinc-800 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-1 bg-[#e6e2d8] dark:bg-zinc-800/80 p-1 rounded-xl">
          <button
            onClick={() => setViewTab("device")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewTab === "device"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone Preview</span>
          </button>
          <button
            onClick={() => setViewTab("components")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewTab === "components"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Component Library</span>
          </button>
        </div>
      </header>

      {/* Title Header */}
      <div className="text-center max-w-xl mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skeuomorphic Soft UI & Neumorphism</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#33312e] dark:text-[#f2efe9]">
          Soft UI Dashboard Widgets
        </h1>
        <p className="text-sm text-[#75726b] dark:text-zinc-400 mt-2">
          Handcrafted with dual extruded & inset shadows, clay textures, smooth gradients, and interactive states.
        </p>
      </div>

      {/* View Switch */}
      {viewTab === "device" ? (
        <NeumorphicDashboard />
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Card 1: Analog Clock & Typography */}
          <div className="p-6 rounded-3xl bg-[#eae7e1] shadow-[8px_8px_20px_#cfcbc2,-8px_-8px_20px_#ffffff] flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6d6a63]">
              1. Analog Clock & Organic Header
            </h3>
            <div className="flex items-center justify-around py-4">
              <SoftUiClock time={staticDate} isLive={false} />
              <SoftUiGreeting title="Hello.March" subtitle="Live every day with ease!" />
            </div>
            <p className="text-xs text-[#7a7770]">
              Features dual-shadow disc extrusion with cardinal hour numbers and smooth rotational transforms.
            </p>
          </div>

          {/* Card 2: Digital Clock LCD Inset Card */}
          <div className="p-6 rounded-3xl bg-[#eae7e1] shadow-[8px_8px_20px_#cfcbc2,-8px_-8px_20px_#ffffff] flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6d6a63]">
              2. Debossed LCD Digital Clock Card
            </h3>
            <div className="py-2">
              <SoftUiDigitalCard
                time={staticDate}
                customDay="Monday"
                customDate="2021/09/13"
              />
            </div>
            <p className="text-xs text-[#7a7770]">
              Deep inset box-shadow display bezel creating a sunken LCD glass screen aesthetic.
            </p>
          </div>

          {/* Card 3: Year Progress Pill */}
          <div className="p-6 rounded-3xl bg-[#eae7e1] shadow-[8px_8px_20px_#cfcbc2,-8px_-8px_20px_#ffffff] flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6d6a63]">
              3. Debossed Progress Bar
            </h3>
            <div className="py-4">
              <SoftUiProgressBar percent={29} label="The rest of the year" />
            </div>
            <p className="text-xs text-[#7a7770]">
              Sunken rounded track with pink-coral soft gradient fill and highlighted percentage badge.
            </p>
          </div>

          {/* Card 4: Capsule Fluid Meters & Calendar */}
          <div className="p-6 rounded-3xl bg-[#eae7e1] shadow-[8px_8px_20px_#cfcbc2,-8px_-8px_20px_#ffffff] flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6d6a63]">
              4. Capsule Meters & Calendar
            </h3>
            <div className="flex items-stretch gap-3 py-2">
              <SoftUiCapsuleMeter
                title={<>The remaining<br />today</>}
                percent={58}
                fillColor="#c6c3b6"
              />
              <SoftUiCapsuleMeter
                title="electricity"
                percent={51}
                fillColor="#d4c7cf"
              />
              <SoftUiCalendar monthNumber={9} highlightDay={13} />
            </div>
            <p className="text-xs text-[#7a7770]">
              Fluid reservoir capsules with percentage tags and an interactive clay calendar with amber badge.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftUiDemoPage;
