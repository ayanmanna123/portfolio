import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Education.css";
import EducationCard from "../../components/educationCard/EducationCard";
import { educationInfo } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Education() {
  const { isDark } = useContext(StyleContext);
  if (!educationInfo.display) {
    return null;
  }
  return (
    <div className="education-section" id="education">
      <Fade bottom duration={1000} distance="20px">
        <div className="education-heading-div">
          <h1
            className={
              isDark
                ? "dark-mode heading education-heading"
                : "heading education-heading"
            }
          >
            Education
          </h1>
        </div>
        <div className="education-cards-div">
          {educationInfo.schools.map((school, i) => {
            return <EducationCard key={i} school={school} />;
          })}
        </div>
      </Fade>
    </div>
  );
}