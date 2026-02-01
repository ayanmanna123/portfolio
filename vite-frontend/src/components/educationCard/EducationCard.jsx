import React, { useState, useEffect, useContext } from "react";
import "./EducationCard.css";
import StyleContext from "../../contexts/StyleContext";

export default function EducationCard({ school }) {
  const [firstRender, setFirstRender] = useState(true);
  const { isDark } = useContext(StyleContext);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, [firstRender]);

  return (
    <div className="education-card">
      <div className="education-card-left">
        <img
          className="education-card-logo"
          src={school.logo}
          alt={school.schoolName}
        />
      </div>
      <div className="education-card-right">
        <h3
          className={
            isDark
              ? "dark-mode education-text-school"
              : "education-text-school heading"
          }
        >
          {school.schoolName}
        </h3>
        <p
          className={
            isDark
              ? "dark-mode education-text-subHeader"
              : "education-text-subHeader"
          }
        >
          {school.subHeader}
        </p>
        <p className="education-text-duration">{school.duration}</p>
        <p
          className={
            isDark ? "dark-mode education-text-desc" : "education-text-desc"
          }
        >
          {school.desc}
        </p>
        {school.descBullets ? (
          <ul className="education-text-bullets">
            {school.descBullets.map((item, i) => (
              <li
                key={i}
                className={
                  isDark ? "dark-mode education-text-desc" : "education-text-desc"
                }
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}