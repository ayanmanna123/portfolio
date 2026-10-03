import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Copy, Check, Battery, Calendar, Clock, Sliders, Sparkles, Sun, Moon } from "lucide-react";

/**
 * Neumorphic Soft UI Widgets Demo
 * Faithfully recreating the soft clay / skeuomorphic neumorphism aesthetics
 * with live ticking clock, interactive calendar, battery meter & year progress.
 */

export const SoftUiClock = ({ time, isLive = false }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotations
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex items-center justify-center soft-ui-raised select-none transition-all duration-300">
      {/* Subtle inner dial ring */}
      <div className="w-[88%] h-[88%] rounded-full relative flex items-center justify-center">
        {/* Hour markers 12, 3, 6, 9 */}
        <span className="absolute top-1 text-xs font-semibold text-[#6d6a64] tracking-tighter">12</span>
        <span className="absolute right-2 text-xs font-semibold text-[#6d6a64]">3</span>
        <span className="absolute bottom-1 text-xs font-semibold text-[#6d6a64]">6</span>
        <span className="absolute left-2 text-xs font-semibold text-[#6d6a64]">9</span>

        {/* Hour tick dots for 1, 2, 4, 5, 7, 8, 10, 11 */}
        {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
          <div
            key={deg}
            className="absolute w-full h-full flex justify-center items-start pointer-events-none"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <div className="w-1 h-1 rounded-full bg-[#bbb7ad] mt-2.5 opacity-80" />
          </div>
        ))}

        {/* Hour Hand */}
        <div
          className="absolute w-1.5 h-10 bg-[#484a4d] rounded-full origin-bottom shadow-sm transition-transform"
          style={{
            transform: `translateY(-50%) rotate(${hourAngle}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute w-1 h-14 bg-[#484a4d] rounded-full origin-bottom shadow-sm transition-transform"
          style={{
            transform: `translateY(-50%) rotate(${minuteAngle}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        />

        {/* Second Hand (shown if live) */}
        {isLive && (
          <div
            className="absolute w-0.5 h-15 bg-[#f06292] rounded-full origin-bottom transition-transform"
            style={{
              transform: `translateY(-50%) rotate(${secondAngle}deg)`,
              transformOrigin: "bottom center",
              bottom: "50%",
            }}
          />
        )}

        {/* Center Pivot Pin with pink accent center */}
        <div className="w-3.5 h-3.5 rounded-full bg-[#eae7e1] border-2 border-[#484a4d] flex items-center justify-center z-10 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#f06292]" />
        </div>
      </div>
    </div>
  );
};

export const SoftUiGreeting = ({
  title = "Hello.March",
  subtitle = "Live every day with ease!"
}) => {
  return (
    <div className="flex flex-col justify-center items-start select-none pl-2">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#43413d] font-handwriting">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-[#78756e] font-medium mt-1 font-handwriting tracking-wide">
        {subtitle}
      </p>
    </div>
  );
};

export const SoftUiDigitalCard = ({ time, isLive = false, customDay, customDate }) => {
  const pad = (n) => String(n).padStart(2, "0");
  const hoursStr = pad(time.getHours());
  const minutesStr = pad(time.getMinutes());

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = customDay || daysOfWeek[time.getDay()];

  const year = time.getFullYear();
  const month = pad(time.getMonth() + 1);
  const date = pad(time.getDate());
  const dateStr = customDate || `${year}/${month}/${date}`;

  return (
    <div className="w-full soft-ui-raised rounded-[28px] p-5 flex items-center justify-between transition-all duration-300">
      {/* Inset Screen Display */}
      <div className="soft-ui-inset rounded-[20px] px-6 py-4 flex items-center justify-center min-w-[170px] bg-[#e3e0d8]">
        <div className="flex items-center text-4xl sm:text-5xl font-black text-[#383a3d] font-digital tracking-widest">
          <span>{hoursStr}</span>
          <span className={`mx-1 text-[#424448] ${isLive ? "animate-pulse" : ""}`}>:</span>
          <span>{minutesStr}</span>
        </div>
      </div>

      {/* Date & Day Information */}
      <div className="flex flex-col items-start pr-3 pl-4 select-none">
        <span className="text-xl sm:text-2xl font-bold text-[#3c3a37] tracking-tight">
          {dayName}
        </span>
        <span className="text-xs sm:text-sm text-[#7a7770] font-semibold tracking-wider mt-1">
          {dateStr}
        </span>
      </div>
    </div>
  );
};

export const SoftUiProgressBar = ({ percent = 29, label = "The rest of the year" }) => {
  return (
    <div className="w-full flex flex-col gap-2 select-none">
      <div className="flex justify-end items-center pr-2 text-xs sm:text-sm font-semibold text-[#66635d]">
        <span>{label}&nbsp;</span>
        <span className="text-[#f06292] font-bold">{percent}%</span>
      </div>

      {/* Sunken track */}
      <div className="w-full h-8 soft-ui-inset rounded-full p-1 flex items-center overflow-hidden bg-[#e5e2da]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#e8527a] via-[#f06292] to-[#f48fb1] shadow-[0_1px_4px_rgba(240,98,146,0.35)]"
        />
      </div>
    </div>
  );
};

export const SoftUiCapsuleMeter = ({ title, percent = 50, fillColor = "#c6c3b6", onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[78px] sm:w-[84px] shrink-0 h-52 soft-ui-raised rounded-[26px] p-2 flex flex-col justify-between items-center relative overflow-hidden cursor-pointer select-none transition-all active:scale-95"
    >
      {/* Title */}
      <div className="text-center pt-2 px-0.5 text-[10.5px] sm:text-[11px] font-semibold text-[#5a5751] font-handwriting leading-tight z-10">
        {title}
      </div>

      {/* Dynamic fluid reservoir */}
      <div className="w-full flex flex-col justify-end items-center h-32 relative">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ backgroundColor: fillColor }}
          className="w-full rounded-b-[22px] rounded-t-[16px] flex items-center justify-center transition-all duration-300 shadow-inner"
        >
          <span className="text-xs sm:text-sm font-bold text-[#3d3b37] pb-1">{percent}%</span>
        </motion.div>
      </div>
    </div>
  );
};

export const SoftUiCalendar = ({
  monthNumber = 9,
  highlightDay = 13,
  onSelectDay,
}) => {
  const [selectedDay, setSelectedDay] = useState(highlightDay);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Sep 2021: 1st is Wednesday (index 3). 30 days.
  const emptyDaysCount = 3;
  const totalDays = 30;

  const daysArray = [
    ...Array(emptyDaysCount).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay(day);
    if (onSelectDay) onSelectDay(day);
  };

  return (
    <div className="flex-1 min-w-0 soft-ui-raised rounded-[28px] p-3 sm:p-4 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2">
        <span className="text-sm sm:text-base font-bold text-[#45433e]">
          {monthNumber}
        </span>
        <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#59564f]">
          CALENDAR
        </span>
      </div>

      {/* Weekday strip */}
      <div className="w-full soft-ui-inset-subtle rounded-full py-1 px-1 grid grid-cols-7 text-center font-bold text-[#e69138] mb-2 bg-[#e6e3dc]">
        {daysOfWeek.map((d) => (
          <span key={d} className="text-[7.5px] sm:text-[8.5px] tracking-tighter">
            {d}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] sm:text-[11px] font-bold text-[#464440]">
        {daysArray.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="w-5 h-5 mx-auto" />;
          }

          const isSelected = day === selectedDay;

          return (
            <div
              key={`day-${day}`}
              onClick={() => handleDayClick(day)}
              className="flex items-center justify-center cursor-pointer py-0.5"
            >
              <div
                className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-[7px] flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-[#e59845] text-white shadow-sm font-black scale-105"
                    : "hover:bg-[#dfdbd2] text-[#464440]"
                }`}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const NeumorphicDashboard = () => {
  // Modes: "exact" (matches screenshot) vs "live" (current real time)
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Screenshot default static time: 09:21 Monday 2021/09/13
  const staticDate = new Date(2021, 8, 13, 9, 21, 0);
  const [currentTime, setCurrentTime] = useState(staticDate);

  // Custom interactive values
  const [yearPercent, setYearPercent] = useState(29);
  const [todayPercent, setTodayPercent] = useState(58);
  const [batteryPercent, setBatteryPercent] = useState(51);
  const [activeDate, setActiveDate] = useState(13);

  // Live timer effect
  useEffect(() => {
    if (!isLiveMode) {
      setCurrentTime(staticDate);
      return;
    }

    const updateLiveTime = () => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate real remaining percentage of today
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const elapsedMs = now.getTime() - startOfDay;
      const todayTotalMs = 24 * 60 * 60 * 1000;
      const todayElapsedPct = Math.round((elapsedMs / todayTotalMs) * 100);
      setTodayPercent(100 - todayElapsedPct);

      // Calculate remaining percentage of current year
      const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1).getTime();
      const yearElapsedPct = Math.round(((now.getTime() - startOfYear) / (endOfYear - startOfYear)) * 100);
      setYearPercent(100 - yearElapsedPct);

      setActiveDate(now.getDate());
    };

    updateLiveTime();
    const interval = setInterval(updateLiveTime, 1000);

    // Read real battery if available
    if (typeof navigator !== "undefined" && navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        setBatteryPercent(Math.round(battery.level * 100));
        battery.addEventListener("levelchange", () => {
          setBatteryPercent(Math.round(battery.level * 100));
        });
      }).catch(() => {});
    }

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const copyComponentCode = () => {
    const snippet = `/* Soft UI Neumorphic Card CSS */
.soft-ui-canvas {
  background-color: #eae7e1;
}
.soft-ui-raised {
  background: #eae7e1;
  box-shadow: 10px 10px 20px #cfcbc2, -10px -10px 20px #ffffff;
}
.soft-ui-inset {
  background: #e4e1d9;
  box-shadow: inset 4px 4px 8px #cac5bb, inset -4px -4px 8px #ffffff;
}
.soft-ui-inset-subtle {
  background: #e6e3dc;
  box-shadow: inset 2px 2px 4px #cdc8be, inset -2px -2px 4px #ffffff;
}`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-4 font-sans select-none">
      {/* Interactive Controls Bar */}
      <div className="w-full max-w-[430px] mb-6 flex items-center justify-between gap-2 px-3 py-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur shadow-sm border border-zinc-200/60 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isLiveMode
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
            }`}
          >
            {isLiveMode ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLiveMode ? "Live Clock & Battery" : "Screenshot Mockup"}</span>
          </button>
        </div>

        <button
          onClick={copyComponentCode}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Copy Neumorphic CSS"
        >
          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedCode ? "Copied CSS" : "Copy CSS"}</span>
        </button>
      </div>

      {/* Phone Screen Mockup Frame */}
      <div className="relative w-full max-w-[390px] sm:max-w-[420px] rounded-[44px] p-6 sm:p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18)] bg-[#eae7e1] border-[6px] border-[#dedad1] transition-all">
        {/* Soft UI Styles Injected Inline */}
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
            .soft-ui-raised:hover {
              box-shadow: 12px 12px 26px #c8c4bb, -12px -12px 26px #ffffff;
            }
            .soft-ui-inset {
              background: #e4e1d9;
              box-shadow: inset 4px 4px 8px #cac5bb, inset -4px -4px 8px #ffffff;
            }
            .soft-ui-inset-subtle {
              background: #e6e3dc;
              box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
            }
          `
        }} />

        <div className="flex flex-col gap-6 sm:gap-7">
          {/* Top Section: Analog Clock & Hello March greeting */}
          <div className="flex items-center justify-between">
            <SoftUiClock time={currentTime} isLive={isLiveMode} />
            <SoftUiGreeting
              title={isLiveMode ? `Hello.${currentTime.toLocaleString("default", { month: "short" })}` : "Hello.March"}
              subtitle="Live every day with ease!"
            />
          </div>

          {/* Middle Row 1: Digital Clock Card */}
          <SoftUiDigitalCard
            time={currentTime}
            isLive={isLiveMode}
            customDay={isLiveMode ? undefined : "Monday"}
            customDate={isLiveMode ? undefined : "2021/09/13"}
          />

          {/* Middle Row 2: Year Progress Bar */}
          <SoftUiProgressBar
            percent={yearPercent}
            label="The rest of the year"
          />

          {/* Bottom Row: 3 Widget Cards */}
          <div className="flex items-stretch gap-3">
            {/* The remaining today capsule */}
            <SoftUiCapsuleMeter
              title={<>The remaining<br />today</>}
              percent={todayPercent}
              fillColor="#c6c3b6"
              onClick={() => {
                if (!isLiveMode) {
                  setTodayPercent((prev) => (prev >= 90 ? 20 : prev + 10));
                }
              }}
            />

            {/* electricity capsule */}
            <SoftUiCapsuleMeter
              title="electricity"
              percent={batteryPercent}
              fillColor="#d4c7cf"
              onClick={() => {
                if (!isLiveMode) {
                  setBatteryPercent((prev) => (prev >= 90 ? 25 : prev + 10));
                }
              }}
            />

            {/* Mini Calendar widget */}
            <SoftUiCalendar
              monthNumber={isLiveMode ? currentTime.getMonth() + 1 : 9}
              highlightDay={activeDate}
              onSelectDay={(day) => setActiveDate(day)}
            />
          </div>
        </div>
      </div>

      {/* Interactive Adjustment Sliders (collapsible / quick controls) */}
      <div className="w-full max-w-[420px] mt-6 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-3">
        <div className="flex items-center justify-between font-semibold text-zinc-800 dark:text-zinc-200">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-rose-500" />
            Interactive Tweaks
          </span>
          <span className="text-[11px] text-zinc-400 font-normal">Click cards or adjust below</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Year Remaining: {yearPercent}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={yearPercent}
              disabled={isLiveMode}
              onChange={(e) => setYearPercent(Number(e.target.value))}
              className="w-32 accent-rose-500 cursor-pointer disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Day Remaining: {todayPercent}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={todayPercent}
              disabled={isLiveMode}
              onChange={(e) => setTodayPercent(Number(e.target.value))}
              className="w-32 accent-stone-500 cursor-pointer disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Electricity: {batteryPercent}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={batteryPercent}
              disabled={isLiveMode}
              onChange={(e) => setBatteryPercent(Number(e.target.value))}
              className="w-32 accent-purple-400 cursor-pointer disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeumorphicDashboard;
