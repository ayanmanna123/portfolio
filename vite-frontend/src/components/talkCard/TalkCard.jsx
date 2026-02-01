import React, { useContext } from "react";
import "./TalkCard.css";
import StyleContext from "../../contexts/StyleContext";

export default function TalkCard({ talkDetails }) {
  const { isDark } = useContext(StyleContext);
  return (
    <div className="talk-card">
      <div className="talk-card-title">{talkDetails.title}</div>
      <div className="talk-card-subtitle">{talkDetails.subtitle}</div>
      <div className="talk-card-links">
        {talkDetails.slides_url && (
          <a
            href={talkDetails.slides_url}
            target="_blank"
            rel="noopener noreferrer"
            className="talk-card-link"
          >
            Slides
          </a>
        )}
        {talkDetails.event_url && (
          <a
            href={talkDetails.event_url}
            target="_blank"
            rel="noopener noreferrer"
            className="talk-card-link"
          >
            Event
          </a>
        )}
      </div>
    </div>
  );
}