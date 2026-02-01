import React, { useState, useEffect, useContext } from "react";
import "./ExperienceCard.css";
import StyleContext from "../../contexts/StyleContext";

export default function ExperienceCard({ cardInfo }) {
  const [firstRender, setFirstRender] = useState(true);
  const { isDark } = useContext(StyleContext);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, [firstRender]);

  return (
    <div className="experience-card">
      <div className="experience-card-left">
        <img
          className="experience-card-logo"
          src={cardInfo.companylogo}
          alt={cardInfo.company}
        />
      </div>
      <div className="experience-card-right">
        <h3
          className={
            isDark
              ? "dark-mode experience-text-role"
              : "experience-text-role heading"
          }
        >
          {cardInfo.role}
        </h3>
        <p
          className={
            isDark
              ? "dark-mode experience-text-company"
              : "experience-text-company"
          }
        >
          {cardInfo.company}
        </p>
        <p className="experience-text-date">{cardInfo.date}</p>
        <p
          className={
            isDark ? "dark-mode experience-text-desc" : "experience-text-desc"
          }
        >
          {cardInfo.desc}
        </p>
        {cardInfo.descBullets ? (
          <ul className="experience-text-bullets">
            {cardInfo.descBullets.map((item, i) => (
              <li
                key={i}
                className={
                  isDark ? "dark-mode experience-text-desc" : "experience-text-desc"
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