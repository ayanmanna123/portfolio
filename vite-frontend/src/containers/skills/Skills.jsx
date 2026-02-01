import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Skills.css";
import { skillsSection } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Skills() {
  const { isDark } = useContext(StyleContext);
  if (!skillsSection.display) {
    return null;
  }
  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div">
        <Fade left duration={1000}>
          <div className="skills-image-div">
            {/* Add your image here */}
          </div>
        </Fade>
        <Fade right duration={1000}>
          <div className="skills-text-div">
            <h1
              className={isDark ? "dark-mode skills-heading" : "skills-heading"}
            >
              {skillsSection.title}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode skills-message"
                  : "skills-message"
              }
            >
              {skillsSection.subTitle}
            </p>
            <div className="software-skills-div">
              {skillsSection.softwareSkills.map((skill, i) => {
                return (
                  <div
                    key={i}
                    className="software-skill-inline"
                    name={skill.skillName}
                  >
                    <i className={skill.fontAwesomeClassname}></i>
                    <p>{skill.skillName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}