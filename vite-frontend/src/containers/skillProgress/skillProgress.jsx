import React, { useContext } from "react";
import { Fade } from "react-reveal";
import ProgressBar from "@ramonak/react-progress-bar";
import "./Progress.css";
import { techStack } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function StackProgress() {
  const { isDark } = useContext(StyleContext);
  if (!techStack.viewSkillBars) {
    return null;
  }
  return (
    <div className={isDark ? "dark-mode" : null} id="skill">
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className={isDark ? "dark-mode skills-heading" : "skills-heading"}>
              {techStack.experience.map((exp, i) => {
                return (
                  <div key={i} className="skill">
                    <div className="skill-info">
                      <h3>{exp.Stack}</h3>
                      <span>{exp.progressPercentage}</span>
                    </div>
                    <ProgressBar
                      completed={parseInt(exp.progressPercentage)}
                      height="6px"
                      isLabelVisible={false}
                      bgColor={isDark ? "#868e96" : "#55198b"}
                    />
                  </div>
                );
              })}
            </h1>
          </div>
        </div>
      </Fade>
    </div>
  );
}