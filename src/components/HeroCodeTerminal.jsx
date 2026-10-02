import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Award } from "lucide-react";
import { heroData } from "@/data";

// Realistic JS Syntax Highlighter for Code Snippet Card
const highlightJsCode = (codeText) => {
  if (!codeText) return null;

  if (codeText.trim().startsWith("//")) {
    return (
      <span className="text-slate-500 dark:text-slate-400/80 italic font-mono whitespace-pre">
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
        <span key={keyIndex++} className="text-amber-600 dark:text-amber-300 whitespace-pre">
          {token}
        </span>
      );
    } else if (token.startsWith("//")) {
      tokens.push(
        <span key={keyIndex++} className="text-slate-500 dark:text-slate-400/80 italic whitespace-pre">
          {token}
        </span>
      );
    } else if (
      ["import", "from", "const", "new", "await", "function", "return", "export", "default", "class", "if", "else"].includes(
        token
      )
    ) {
      tokens.push(
        <span key={keyIndex++} className="text-purple-600 dark:text-purple-400 font-semibold whitespace-pre">
          {token}
        </span>
      );
    } else if (token === "console") {
      tokens.push(
        <span key={keyIndex++} className="text-cyan-600 dark:text-cyan-400 font-medium whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(token) && rest.trimStart().startsWith("(")) {
      tokens.push(
        <span key={keyIndex++} className="text-amber-600 dark:text-yellow-300 font-medium whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(token) && rest.trimStart().startsWith(":")) {
      tokens.push(
        <span key={keyIndex++} className="text-sky-600 dark:text-sky-300 whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Z][A-Za-z0-9_$]*$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-emerald-600 dark:text-emerald-400 font-semibold whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[a-z_$][A-Za-z0-9_$]*$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-blue-600 dark:text-blue-300 whitespace-pre">
          {token}
        </span>
      );
    } else if (/^\d+$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-teal-600 dark:text-cyan-300 whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[{}(),;:[\]=.]+$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-slate-700 dark:text-slate-300 font-mono whitespace-pre">
          {token}
        </span>
      );
    } else {
      tokens.push(
        <span key={keyIndex++} className="text-foreground dark:text-slate-200 whitespace-pre">
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
      setTimeout(() => {
        setDisplayedCode(currentLine.slice(0, displayedCode.length + 1));
      }, 30);
    } else {
      setTimeout(() => {
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
    }
  }, [displayedCode, currentCodeLine, codeSnippets]);

  return (
    <motion.div
      className="flex-1 flex justify-center lg:justify-end w-full pt-10 sm:pt-14 lg:pt-16"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
      }}
    >
      <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-[510px]">
        {/* Code Snippet Card Window */}
        <motion.div
          className="bg-card/40 dark:bg-card/20 backdrop-blur-md border border-border/70 dark:border-stone-800/80 rounded-2xl p-4 sm:p-7 shadow-xl w-full group hover:shadow-[0_0_35px_rgba(236,132,77,0.15)] transition-all duration-300"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Window Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFD8B2]"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EC844D]"></div>
            </div>
            <div className="text-xs sm:text-sm font-mono font-semibold text-foreground/80 dark:text-stone-300">
              portfolio.js
            </div>
            <div className="w-8 sm:w-12"></div>
          </div>

          {/* Code Container */}
          <div className="font-mono text-[11px] sm:text-xs md:text-sm bg-background/50 dark:bg-black/30 rounded-lg border border-border/60 dark:border-stone-800/70 min-h-[260px] sm:min-h-[480px] flex shadow-inner overflow-x-auto custom-scrollbar">
            <div className="p-3 sm:p-5 w-full">
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
                          className="ml-0.5 text-[#EC844D] dark:text-[#FFAE80] inline-block font-bold"
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

          {/* Corner Accents - scaled nicely for mobile */}
          <motion.div
            className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-[#EC844D] to-[#DE743C] rounded-xl flex items-center justify-center border-2 border-background shadow-xl shadow-[#EC844D]/35"
            animate={{ y: [0, -4, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Code className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </motion.div>

          <motion.div
            className="hidden sm:flex absolute -top-3 -left-3 bg-background/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-border shadow-lg items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            <Award className="h-4 w-4 text-[#EC844D] dark:text-[#FFAE80]" />
            <span className="text-xs font-semibold text-foreground">Solutions</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroCodeTerminal;
