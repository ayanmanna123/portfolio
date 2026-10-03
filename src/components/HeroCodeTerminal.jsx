import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Award } from "lucide-react";
import { heroData } from "@/data";

// Soft UI Syntax Highlighter calibrated for #e4e1d9 clay inset background
const highlightJsCode = (codeText) => {
  if (!codeText) return null;

  if (codeText.trim().startsWith("//")) {
    return (
      <span className="text-[#8a867c] italic font-mono whitespace-pre">
        {codeText}
      </span>
    );
  }

  const tokenRegex =
    /('(?:\\[\s\S]|[^'\\])*'?|"(?:\\[\s\S]|[^"\\])*"?|`(?:\\[\s\S]|[^`\\])*`?|\/\/.*|\b(?:import|from|const|new|await|function|return|export|default|class|if|else)\b|\b(?:console)\b|\b[A-Za-z_$][A-Za-z0-9_$]*(?=\s*:)|[A-Za-z_$][A-Za-z0-9_$]*|[0-9]+|[{}(),;:[\]=.]|\s+|.+?)/g;

  const tokens = [];
  let match;
  let keyIndex = 0;

  while ((match = tokenRegex.exec(codeText)) !== null) {
    const token = match[0];
    const rest = codeText.slice(tokenRegex.lastIndex);

    if (token.startsWith("'") || token.startsWith('"') || token.startsWith("`")) {
      tokens.push(
        <span key={keyIndex++} className="text-[#b45309] font-medium whitespace-pre">
          {token}
        </span>
      );
    } else if (token.startsWith("//")) {
      tokens.push(
        <span key={keyIndex++} className="text-[#8a867c] italic whitespace-pre">
          {token}
        </span>
      );
    } else if (
      ["import", "from", "const", "new", "await", "function", "return", "export", "default", "class", "if", "else"].includes(
        token
      )
    ) {
      tokens.push(
        <span key={keyIndex++} className="text-[#7c3aed] font-bold whitespace-pre">
          {token}
        </span>
      );
    } else if (token === "console") {
      tokens.push(
        <span key={keyIndex++} className="text-[#0891b2] font-semibold whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(token) && rest.trimStart().startsWith("(")) {
      tokens.push(
        <span key={keyIndex++} className="text-[#d97706] font-semibold whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(token) && rest.trimStart().startsWith(":")) {
      tokens.push(
        <span key={keyIndex++} className="text-[#0284c7] whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Z][A-Za-z0-9_$]*$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-[#059669] font-bold whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[a-z_$][A-Za-z0-9_$]*$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-[#2563eb] whitespace-pre">
          {token}
        </span>
      );
    } else if (/^\d+$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-[#0d9488] font-bold whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[{}(),;:[\]=.]+$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-[#4b5563] font-mono whitespace-pre">
          {token}
        </span>
      );
    } else {
      tokens.push(
        <span key={keyIndex++} className="text-[#2d2b28] whitespace-pre">
          {token}
        </span>
      );
    }
  }

  return tokens;
};

export const HeroCodeTerminal = () => {
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const { codeSnippets } = heroData;

  useEffect(() => {
    const currentLine = codeSnippets[currentCodeLine];
    if (displayedCode.length < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(currentLine.slice(0, displayedCode.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (currentCodeLine < heroData.codeSnippets.length - 1) {
          setCurrentCodeLine((prev) => prev + 1);
          setDisplayedCode("");
        } else {
          setTimeout(() => {
            setCurrentCodeLine(0);
            setDisplayedCode("");
          }, 5000);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [displayedCode, currentCodeLine, codeSnippets]);

  return (
    <motion.div
      className="flex-1 flex justify-center lg:justify-end w-full pt-6 sm:pt-10 lg:pt-12"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
      }}
    >
      <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-[520px]">
        {/* Soft UI Clay Workstation Card */}
        <motion.div
          className="soft-ui-raised-card bg-[#eae7e1] border border-[#dedad1] rounded-3xl p-4 sm:p-7 shadow-[10px_10px_22px_#cfcbc2,-10px_-10px_22px_#ffffff] w-full transition-all duration-300"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Workstation Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            {/* Skeuomorphic tactile pins */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f06292] shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#e59845] shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#61c554] shadow-sm" />
            </div>
            <div className="text-xs sm:text-sm font-digital font-bold text-[#5a5751]">
              portfolio.js
            </div>
            <div className="w-12 flex justify-end">
              <div className="w-2 h-2 rounded-full bg-[#dedad1]" />
            </div>
          </div>

          {/* Inset Debossed Clay Code Display Screen */}
          <div className="font-mono text-[11px] sm:text-xs md:text-sm soft-ui-inset bg-[#e4e1d9] rounded-2xl border border-[#cdc8be] min-h-[260px] sm:min-h-[460px] flex shadow-[inset_3px_3px_6px_#cac5bb,inset_-3px_-3px_6px_#ffffff] overflow-x-auto custom-scrollbar">
            <div className="p-3.5 sm:p-5 w-full">
              <div className="grid grid-cols-1 gap-1 sm:gap-1.5 h-full content-start text-left">
                {heroData.codeSnippets.map((line, index) => (
                  <div
                    key={index}
                    className={`
                      min-h-[18px] sm:min-h-[22px] py-0.5 whitespace-pre font-mono leading-relaxed flex items-center flex-wrap
                      ${index < currentCodeLine ? "opacity-100" : "opacity-0"}
                      ${index === currentCodeLine ? "opacity-100" : ""}
                      transition-opacity duration-150 ease-in-out
                    `}
                  >
                    {index < currentCodeLine ? highlightJsCode(line) : ""}
                    {index === currentCodeLine ? (
                      <>
                        {highlightJsCode(displayedCode)}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="ml-0.5 text-[#e59845] inline-block font-bold"
                        >
                          ▊
                        </motion.span>
                      </>
                    ) : (
                      ""
                    )}
                    {line === "" && (
                      <span className="inline-block min-h-[18px] sm:min-h-[22px]">
                        &nbsp;
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Right Floating Soft UI Clay Badge */}
          <motion.div
            className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 w-11 h-11 sm:w-13 sm:h-13 soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#e59845] rounded-2xl flex items-center justify-center shadow-lg active:scale-95"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
          </motion.div>

          {/* Top Left Floating Soft UI Badge */}
          <motion.div
            className="hidden sm:flex absolute -top-3 -left-3 soft-ui-raised bg-[#eae7e1] border border-[#dedad1] px-3.5 py-1.5 rounded-xl shadow-md items-center gap-1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <Award className="h-4 w-4 text-[#e59845]" />
            <span className="text-xs font-digital font-bold text-[#383a3d]">Solutions</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroCodeTerminal;
