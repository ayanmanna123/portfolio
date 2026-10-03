import React, { useState } from "react";
import { RefreshCw, ShieldAlert } from "lucide-react";
import { useTheme } from "next-themes";
import { githubUsername } from "@/data";

const GITHUB_USER = githubUsername || "ayanmanna123";
const LOCAL_GIF_PATH = "/assets/space-shooter.gif";
const REMOTE_GIF_PATH = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_USER}/main/assets/space-shooter.gif`;

export const GithubSpaceShooter = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const [imgSrc, setImgSrc] = useState(LOCAL_GIF_PATH);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleImageError = () => {
        if (imgSrc === LOCAL_GIF_PATH) {
            setImgSrc(`${REMOTE_GIF_PATH}?t=${Date.now()}`);
        } else {
            setHasError(true);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full overflow-x-auto pb-2 pt-1 custom-scrollbar">
            <div className="min-w-[700px] flex justify-center py-2 relative">
                {isLoading && (
                    <div className="h-[140px] sm:h-[160px] w-full flex items-center justify-center text-muted-foreground animate-pulse text-sm">
                        <RefreshCw className="w-5 h-5 animate-spin mr-2 text-[#EC844D]" />
                        Loading space shooter...
                    </div>
                )}

                {hasError ? (
                    <div className="h-[140px] sm:h-[160px] flex flex-col items-center justify-center text-muted-foreground text-sm">
                        <ShieldAlert className="w-6 h-6 text-amber-500 mb-2" />
                        <p>GIF not generated yet.</p>
                    </div>
                ) : (
                    <img
                        src={imgSrc}
                        alt="GitHub Contribution Space Shooter Game"
                        onLoad={() => setIsLoading(false)}
                        onError={handleImageError}
                        className={`w-full max-w-[860px] h-auto object-contain rounded-lg transition-opacity duration-300 ${
                            isLoading ? "opacity-0 absolute" : "opacity-100"
                        }`}
                        style={{
                            imageRendering: "pixelated",
                            filter: isDark ? "none" : "invert(1) hue-rotate(180deg)",
                            mixBlendMode: isDark ? "normal" : "multiply",
                        }}
                    />
                )}
            </div>
        </div>
    );
};
