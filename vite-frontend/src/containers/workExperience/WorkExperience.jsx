import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./WorkExperience.css";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import { workExperiences } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const { isDark } = useContext(StyleContext);
  if (!workExperiences.display) {
    return null;
  }
  return (
    <div className="experience" id="experience">
      <Fade bottom duration={1000} distance="20px">
        <div className="experience-header">
          <h1
            className={
              isDark
                ? "dark-mode heading experience-title"
                : "heading experience-title"
            }
          >
            Experiences
          </h1>
        </div>
        <div className="experience-cards-div">
          {workExperiences.experience.map((card, i) => {
            return <ExperienceCard key={i} cardInfo={card} />;
          })}
        </div>
      </Fade>
    </div>
  );
}