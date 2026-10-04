import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Copy, Check, Sliders, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Neumorphic Soft UI Widgets
 * Recreating authentic soft clay / skeuomorphic neumorphism in both Dark & Light modes.
 * Dark mode matches the reference image: deep charcoal slab, coral pink digital LCD,
 * year progress groove, fluid & cutout meters, and interactive calendar.
 */

// =========================================================================
// 1. ANALOG CLOCK COMPONENT
// =========================================================================
export const SoftUiClock = ({ time, isLive = false, theme = "dark" }) => {
  const isDark = theme === "dark";
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotations
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div
      className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex items-center justify-center select-none transition-all duration-300 ${
        isDark ? "soft-ui-dark-raised" : "soft-ui-raised"
      }`}
    >
      {/* Dial Face */}
      <div className="w-[88%] h-[88%] rounded-full relative flex items-center justify-center">
        {/* Cardinal Hour Numbers */}
        <span
          className={`absolute top-1 text-xs font-semibold font-digital tracking-tighter ${
            isDark ? "text-[#eae7e1]" : "text-[#6d6a64]"
          }`}
        >
          12
        </span>
        <span
          className={`absolute right-2 text-xs font-semibold font-digital ${
            isDark ? "text-[#eae7e1]" : "text-[#6d6a64]"
          }`}
        >
          3
        </span>
        <span
          className={`absolute bottom-1 text-xs font-semibold font-digital ${
            isDark ? "text-[#eae7e1]" : "text-[#6d6a64]"
          }`}
        >
          6
        </span>
        <span
          className={`absolute left-2 text-xs font-semibold font-digital ${
            isDark ? "text-[#eae7e1]" : "text-[#6d6a64]"
          }`}
        >
          9
        </span>

        {/* Hour tick dots for 1, 2, 4, 5, 7, 8, 10, 11 */}
        {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
          <div
            key={deg}
            className="absolute w-full h-full flex justify-center items-start pointer-events-none"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <div
              className={`w-1 h-1 rounded-full mt-2.5 ${
                isDark ? "bg-[#555a66]/80" : "bg-[#bbb7ad]/80"
              }`}
            />
          </div>
        ))}

        {/* Hour Hand */}
        <div
          className={`absolute w-1.5 h-10 rounded-full origin-bottom shadow-sm transition-transform ${
            isDark ? "bg-[#eae7e1]" : "bg-[#484a4d]"
          }`}
          style={{
            transform: `translateY(-50%) rotate(${hourAngle}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        />

        {/* Minute Hand */}
        <div
          className={`absolute w-1 h-14 rounded-full origin-bottom shadow-sm transition-transform ${
            isDark ? "bg-[#eae7e1]" : "bg-[#484a4d]"
          }`}
          style={{
            transform: `translateY(-50%) rotate(${minuteAngle}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        />

        {/* Second Hand (shown if live or static mockup matching reference) */}
        <div
          className="absolute w-0.5 h-15 bg-[#ff5768] rounded-full origin-bottom transition-transform z-10"
          style={{
            transform: `translateY(-50%) rotate(${isLive ? secondAngle : 48}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        />

        {/* Center Pivot Pin with red/pink center dot */}
        <div
          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center z-20 shadow-sm border-2 ${
            isDark
              ? "bg-[#181a20] border-[#eae7e1]"
              : "bg-[#eae7e1] border-[#484a4d]"
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff5768]" />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. GREETING COMPONENT
// =========================================================================
export const SoftUiGreeting = ({
  title = "Hello.Oct",
  subtitle = "Live every day with ease!",
  theme = "dark",
}) => {
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col justify-center items-start select-none pl-2">
      <h2
        className={`text-2xl sm:text-3xl font-black tracking-tight font-digital leading-tight ${
          isDark ? "text-[#eae7e1]" : "text-[#43413d]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-xs sm:text-sm font-medium mt-1 font-handwriting tracking-wide ${
          isDark ? "text-[#787a82]" : "text-[#78756e]"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
};

// =========================================================================
// 3. DIGITAL CLOCK LCD INSET CARD
// =========================================================================
export const SoftUiDigitalCard = ({
  time,
  isLive = false,
  customDay,
  customDate,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
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
    <div
      className={`w-full rounded-[28px] p-5 flex items-center justify-between transition-all duration-300 ${
        isDark ? "soft-ui-dark-raised" : "soft-ui-raised"
      }`}
    >
      {/* Inset Screen Display (Sunken Bezel LCD) */}
      <div
        className={`rounded-[20px] px-6 py-3.5 flex items-center justify-center min-w-[170px] ${
          isDark ? "soft-ui-dark-inset bg-[#13151a]" : "soft-ui-inset bg-[#e3e0d8]"
        }`}
      >
        <div className="flex items-center text-4xl sm:text-5xl font-black font-digital tracking-widest">
          <span className={isDark ? "text-[#ff5768]" : "text-[#383a3d]"}>
            {hoursStr}
          </span>
          <span
            className={`mx-1 ${
              isDark ? "text-[#50535b]" : "text-[#424448]"
            } ${isLive ? "animate-pulse" : ""}`}
          >
            :
          </span>
          <span className={isDark ? "text-[#eae7e1]" : "text-[#383a3d]"}>
            {minutesStr}
          </span>
        </div>
      </div>

      {/* Date & Day Information */}
      <div className="flex flex-col items-start pr-3 pl-4 select-none">
        <span
          className={`text-xl sm:text-2xl font-bold font-digital tracking-tight leading-snug ${
            isDark ? "text-[#eae7e1]" : "text-[#3c3a37]"
          }`}
        >
          {dayName}
        </span>
        <span
          className={`text-xs sm:text-sm font-semibold font-mono tracking-wider mt-0.5 ${
            isDark ? "text-[#787a82]" : "text-[#7a7770]"
          }`}
        >
          {dateStr}
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// 4. YEAR PROGRESS BAR
// =========================================================================
export const SoftUiProgressBar = ({
  percent = 24,
  label = "The rest of the year",
  theme = "dark",
}) => {
  const isDark = theme === "dark";

  return (
    <div className="w-full flex flex-col gap-2 select-none">
      <div
        className={`flex justify-end items-center pr-2 text-xs sm:text-sm font-medium font-handwriting ${
          isDark ? "text-[#787a82]" : "text-[#66635d]"
        }`}
      >
        <span>{label}&nbsp;</span>
        <span
          className={`font-black font-digital ${
            isDark ? "text-[#ff5768]" : "text-[#f06292]"
          }`}
        >
          {percent}%
        </span>
      </div>

      {/* Sunken track */}
      <div
        className={`w-full h-8 rounded-full p-1 flex items-center overflow-hidden ${
          isDark ? "soft-ui-dark-inset bg-[#13151a]" : "soft-ui-inset bg-[#e5e2da]"
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full shadow-sm ${
            isDark
              ? "bg-gradient-to-r from-[#ff4d61] via-[#ff6575] to-[#ff7a8a] shadow-[0_0_12px_rgba(255,87,104,0.4)]"
              : "bg-gradient-to-r from-[#e8527a] via-[#f06292] to-[#f48fb1] shadow-[0_1px_4px_rgba(240,98,146,0.35)]"
          }`}
        />
      </div>
    </div>
  );
};

// =========================================================================
// 5. CAPSULE METERS (Remaining Today & Electricity)
// =========================================================================
export const SoftUiCapsuleMeter = ({
  title,
  percent = 40,
  fillColor,
  variant = "cutout", // "cutout" | "fluid"
  onClick,
  theme = "dark",
}) => {
  const isDark = theme === "dark";

  return (
    <div
      onClick={onClick}
      className={`w-[78px] sm:w-[84px] shrink-0 h-52 rounded-[26px] p-2 flex flex-col justify-between items-center relative overflow-hidden cursor-pointer select-none transition-all active:scale-95 ${
        isDark ? "soft-ui-dark-raised" : "soft-ui-raised"
      }`}
    >
      {/* Title */}
      <div
        className={`text-center pt-2 px-0.5 text-[10.5px] sm:text-[11px] font-semibold font-handwriting leading-tight z-10 ${
          isDark ? "text-[#787a82]" : "text-[#5a5751]"
        }`}
      >
        {title}
      </div>

      {variant === "cutout" ? (
        // Inset Cutout Well (matching "The remaining today 40%" in reference)
        <div className="w-full pb-1">
          <div
            className={`w-full h-14 rounded-[18px] flex items-center justify-center ${
              isDark ? "soft-ui-dark-inset bg-[#13151a]" : "soft-ui-inset bg-[#e3e0d8]"
            }`}
          >
            <span
              className={`text-xs sm:text-sm font-bold font-digital ${
                isDark ? "text-[#eae7e1]" : "text-[#3d3b37]"
              }`}
            >
              {percent}%
            </span>
          </div>
        </div>
      ) : (
        // Fluid Level Reservoir (matching "electricity 80%" in reference)
        <div className="w-full flex flex-col justify-end items-center h-32 relative pb-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${percent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              backgroundColor:
                fillColor ||
                (isDark ? "rgba(95, 60, 75, 0.75)" : "#d4c7cf"),
            }}
            className={`w-full rounded-b-[20px] rounded-t-[16px] flex items-center justify-center transition-all duration-300 shadow-inner ${
              isDark ? "border border-[#ff5768]/20" : ""
            }`}
          >
            <span
              className={`text-xs sm:text-sm font-bold font-digital pb-1 ${
                isDark ? "text-[#eae7e1]" : "text-[#3d3b37]"
              }`}
            >
              {percent}%
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 6. INTERACTIVE CALENDAR WIDGET
// =========================================================================
export const SoftUiCalendar = ({
  monthNumber = 10,
  highlightDay = 13,
  onSelectDay,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [selectedDay, setSelectedDay] = useState(highlightDay);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Oct 2026: 1st is Thursday (index 4). 31 days.
  const emptyDaysCount = 4;
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
    <div
      className={`flex-1 min-w-0 rounded-[28px] p-3 sm:p-4 flex flex-col justify-between select-none ${
        isDark ? "soft-ui-dark-raised" : "soft-ui-raised"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2">
        <span
          className={`text-base sm:text-lg font-black font-digital ${
            isDark ? "text-[#eae7e1]" : "text-[#45433e]"
          }`}
        >
          {monthNumber}
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-black font-digital tracking-widest ${
            isDark ? "text-[#787a82]" : "text-[#59564f]"
          }`}
        >
          CALENDAR
        </span>
      </div>

      {/* Weekday strip */}
      <div
        className={`w-full rounded-full py-1 px-1 grid grid-cols-7 text-center font-bold font-digital mb-2 ${
          isDark
            ? "soft-ui-dark-inset bg-[#13151a] text-[#ff7a29]"
            : "soft-ui-inset-subtle bg-[#e6e3dc] text-[#e69138]"
        }`}
      >
        {daysOfWeek.map((d) => (
          <span key={d} className="text-[7.5px] sm:text-[8.5px] tracking-tighter">
            {d}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        className={`grid grid-cols-7 gap-y-1 text-center text-[10px] sm:text-[11px] font-bold font-digital ${
          isDark ? "text-[#eae7e1]" : "text-[#464440]"
        }`}
      >
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
                className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-[8px] flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-gradient-to-br from-[#ff6e30] to-[#ff4c24] text-white font-black scale-105 shadow-[0_2px_8px_rgba(255,110,48,0.5)]"
                    : isDark
                    ? "hover:bg-[#252a34] text-[#eae7e1]"
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

// =========================================================================
// 7. NEUMORPHIC DASHBOARD CONTAINER WITH THEME TOGGLE & INTERACTION
// =========================================================================
export const NeumorphicDashboard = ({
  theme: controlledTheme,
  onThemeChange,
}) => {
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();

  // Internal theme fallback or controlled theme
  const [localTheme, setLocalTheme] = useState("dark");
  const currentTheme = controlledTheme || localTheme;
  const isDark = currentTheme === "dark";

  const handleToggleTheme = (newTheme) => {
    setLocalTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    if (setNextTheme) {
      setNextTheme(newTheme);
    }
  };

  // Mode: static reference mockup vs live real time
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Reference mockup time: 14:21 Sunday 2026/10/04
  const referenceDate = new Date(2026, 9, 4, 14, 21, 0);
  const [currentTime, setCurrentTime] = useState(referenceDate);

  // Interactive widget values matching reference
  const [yearPercent, setYearPercent] = useState(24);
  const [todayPercent, setTodayPercent] = useState(40);
  const [batteryPercent, setBatteryPercent] = useState(80);
  const [activeDate, setActiveDate] = useState(13);

  // Live timer effect
  useEffect(() => {
    if (!isLiveMode) {
      setCurrentTime(referenceDate);
      setYearPercent(24);
      setTodayPercent(40);
      setBatteryPercent(80);
      setActiveDate(13);
      return;
    }

    const updateLiveTime = () => {
      const now = new Date();
      setCurrentTime(now);

      // Remaining today percentage
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const elapsedMs = now.getTime() - startOfDay;
      const todayTotalMs = 24 * 60 * 60 * 1000;
      const todayElapsedPct = Math.round((elapsedMs / todayTotalMs) * 100);
      setTodayPercent(100 - todayElapsedPct);

      // Remaining year percentage
      const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1).getTime();
      const yearElapsedPct = Math.round(((now.getTime() - startOfYear) / (endOfYear - startOfYear)) * 100);
      setYearPercent(100 - yearElapsedPct);

      setActiveDate(now.getDate());
    };

    updateLiveTime();
    const interval = setInterval(updateLiveTime, 1000);

    // Read real battery if supported
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
    const snippet = isDark
      ? `/* Dark Neumorphic Soft UI CSS */
.soft-ui-dark-canvas {
  background-color: #181a20;
}
.soft-ui-dark-raised {
  background: #191c23;
  box-shadow: 10px 10px 22px #0f1115, -10px -10px 22px #232731;
}
.soft-ui-dark-inset {
  background: #13151a;
  box-shadow: inset 4px 4px 8px #0b0c0f, inset -4px -4px 8px #21252e;
}`
      : `/* Light Neumorphic Soft UI CSS */
.soft-ui-canvas {
  background-color: #eae7e1;
}
.soft-ui-raised {
  background: #eae7e1;
  box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
}
.soft-ui-inset {
  background: #e4e1d9;
  box-shadow: inset 4px 4px 8px #cac5bb, inset -4px -4px 8px #ffffff;
}`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 sm:px-4 font-sans select-none">
      {/* Interactive Controls Bar: Theme Toggle, Live Mode, Copy CSS */}
      <div
        className={`w-full max-w-[420px] mb-6 flex items-center justify-between gap-2 px-3 py-2 rounded-2xl transition-colors ${
          isDark
            ? "bg-[#181a20]/90 border border-[#262a33] text-[#eae7e1] shadow-lg shadow-black/40"
            : "bg-white/90 border border-zinc-200 text-zinc-800 shadow-sm"
        }`}
      >
        {/* Theme Toggle Pill */}
        <div className="flex items-center gap-1 bg-black/10 dark:bg-black/30 p-1 rounded-xl">
          <button
            onClick={() => handleToggleTheme("dark")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isDark
                ? "bg-[#282d38] text-[#eae7e1] shadow-sm font-bold"
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-[#ff5768]" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => handleToggleTheme("light")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              !isDark
                ? "bg-white text-zinc-900 shadow-sm font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#e59845]" />
            <span>Light</span>
          </button>
        </div>

        {/* Live vs Mockup Switch */}
        <button
          onClick={() => setIsLiveMode(!isLiveMode)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            isLiveMode
              ? "bg-[#ff5768] text-white shadow-md shadow-[#ff5768]/30"
              : isDark
              ? "bg-[#232731] text-[#787a82] hover:text-[#eae7e1]"
              : "bg-zinc-100 text-zinc-600 hover:text-zinc-900"
          }`}
        >
          {isLiveMode ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isLiveMode ? "Live" : "Mockup"}</span>
        </button>

        {/* Copy CSS Button */}
        <button
          onClick={copyComponentCode}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            isDark
              ? "text-[#787a82] hover:text-[#eae7e1] hover:bg-[#232731]"
              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
          }`}
          title="Copy Neumorphic CSS Tokens"
        >
          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="text-[11px]">{copiedCode ? "Copied" : "CSS"}</span>
        </button>
      </div>

      {/* Main Neumorphic Slab Frame (Faithful Phone Widget Container) */}
      <div
        className={`relative w-full max-w-[390px] sm:max-w-[420px] rounded-[48px] p-6 sm:p-7 transition-all duration-300 ${
          isDark
            ? "bg-[#181a20] border-[6px] border-[#22252e] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)]"
            : "bg-[#eae7e1] border-[6px] border-[#dedad1] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18)]"
        }`}
      >
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

            /* Light Soft UI Tokens */
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

            /* Dark Soft UI Tokens (Matching Reference Image) */
            .soft-ui-dark-raised {
              background: #191c23;
              box-shadow: 10px 10px 22px #0f1115, -10px -10px 22px #232731;
            }
            .soft-ui-dark-raised:hover {
              box-shadow: 12px 12px 26px #0c0e11, -12px -12px 26px #272c37;
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

        <div className="flex flex-col gap-6 sm:gap-7">
          {/* Top Section: Analog Clock & Greeting */}
          <div className="flex items-center justify-between">
            <SoftUiClock time={currentTime} isLive={isLiveMode} theme={currentTheme} />
            <SoftUiGreeting
              title={
                isLiveMode
                  ? `Hello.${currentTime.toLocaleString("default", { month: "short" })}`
                  : isDark
                  ? "Hello.Oct"
                  : "Hello.March"
              }
              subtitle="Live every day with ease!"
              theme={currentTheme}
            />
          </div>

          {/* Middle Row 1: Digital Clock LCD Inset Card */}
          <SoftUiDigitalCard
            time={currentTime}
            isLive={isLiveMode}
            customDay={isLiveMode ? undefined : isDark ? "Sunday" : "Monday"}
            customDate={isLiveMode ? undefined : isDark ? "2026/10/04" : "2021/09/13"}
            theme={currentTheme}
          />

          {/* Middle Row 2: Year Progress Bar */}
          <SoftUiProgressBar
            percent={yearPercent}
            label="The rest of the year"
            theme={currentTheme}
          />

          {/* Bottom Row: 3 Widget Cards */}
          <div className="flex items-stretch gap-3">
            {/* The remaining today cutout */}
            <SoftUiCapsuleMeter
              title={<>The<br />remaining<br />today</>}
              percent={todayPercent}
              variant="cutout"
              theme={currentTheme}
              onClick={() => {
                if (!isLiveMode) {
                  setTodayPercent((prev) => (prev >= 80 ? 20 : prev + 20));
                }
              }}
            />

            {/* electricity fluid reservoir */}
            <SoftUiCapsuleMeter
              title="electricity"
              percent={batteryPercent}
              variant="fluid"
              theme={currentTheme}
              onClick={() => {
                if (!isLiveMode) {
                  setBatteryPercent((prev) => (prev >= 90 ? 30 : prev + 10));
                }
              }}
            />

            {/* Mini Calendar widget */}
            <SoftUiCalendar
              monthNumber={isLiveMode ? currentTime.getMonth() + 1 : isDark ? 10 : 9}
              highlightDay={activeDate}
              onSelectDay={(day) => setActiveDate(day)}
              theme={currentTheme}
            />
          </div>
        </div>
      </div>

      {/* Interactive Adjustment Sliders */}
      <div
        className={`w-full max-w-[420px] mt-6 p-4 rounded-2xl border text-xs space-y-3 transition-colors ${
          isDark
            ? "bg-[#181a20]/90 border-[#262a33] text-[#787a82]"
            : "bg-white/70 border-zinc-200 text-zinc-600"
        }`}
      >
        <div
          className={`flex items-center justify-between font-semibold ${
            isDark ? "text-[#eae7e1]" : "text-zinc-800"
          }`}
        >
          <span className="flex items-center gap-1.5 font-digital font-bold">
            <Sliders className="w-3.5 h-3.5 text-[#ff5768]" />
            Interactive Widget Controls
          </span>
          <span className="text-[11px] font-normal text-zinc-500">
            Click cards or slide below
          </span>
        </div>

        <div className="space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span>Year Remaining: {yearPercent}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={yearPercent}
              disabled={isLiveMode}
              onChange={(e) => setYearPercent(Number(e.target.value))}
              className="w-32 accent-[#ff5768] cursor-pointer disabled:opacity-50"
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
              className="w-32 accent-[#e59845] cursor-pointer disabled:opacity-50"
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
              className="w-32 accent-[#ff5768] cursor-pointer disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeumorphicDashboard;
