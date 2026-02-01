import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Achievement.css";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import { achievementSection } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Achievement() {
  const { isDark } = useContext(StyleContext);
  if (!achievementSection.display) {
    return null;
  }
  return (
    <div className="main" id="achievements">
      <Fade bottom duration={1000} distance="20px">
        <div className="achievement-heading-div">
          <h1
            className={
              isDark
                ? "dark-mode heading achievement-heading"
                : "heading achievement-heading"
            }
          >
            {achievementSection.title}
          </h1>
          <p
            className={
              isDark
                ? "dark-mode achievement-message"
                : "achievement-message"
            }
          >
            {achievementSection.subtitle}
          </p>
        </div>
        <div className="achievement-cards-div">
          {achievementSection.achievementsCards.map((card, i) => {
            return <AchievementCard key={i} card={card} />;
          })}
        </div>
      </Fade>
    </div>
  );
}