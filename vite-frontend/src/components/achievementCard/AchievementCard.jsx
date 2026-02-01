import React, { useContext } from "react";
import "./AchievementCard.css";
import StyleContext from "../../contexts/StyleContext";

export default function AchievementCard({ card }) {
  const { isDark } = useContext(StyleContext);
  return (
    <div className="certificate-card">
      <div className="certificate-image-div">
        <img
          src={card.image}
          alt={card.title}
          className="certificate-image"
        />
      </div>
      <div className="certificate-detail-div">
        <h3
          className={
            isDark
              ? "dark-mode certificate-card-title"
              : "certificate-card-title"
          }
        >
          {card.title}
        </h3>
        <p
          className={
            isDark
              ? "dark-mode certificate-card-subtitle"
              : "certificate-card-subtitle"
          }
        >
          {card.subtitle}
        </p>
      </div>
      <div className="certificate-card-footer">
        {card.footerLink.map((footer, i) => {
          return (
            <a
              key={i}
              href={footer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-card-link"
            >
              {footer.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}