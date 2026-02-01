import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Podcast.css";
import { podcastSection } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Podcast() {
  const { isDark } = useContext(StyleContext);
  if (!podcastSection.display) {
    return null;
  }
  return (
    <div className="main" id="podcast">
      <Fade bottom duration={1000} distance="20px">
        <div className="podcast-header">
          <h1
            className={
              isDark
                ? "dark-mode heading podcast-title"
                : "heading podcast-title"
            }
          >
            {podcastSection.title}
          </h1>
          <p
            className={
              isDark
                ? "dark-mode podcast-subtitle"
                : "podcast-subtitle"
            }
          >
            {podcastSection.subtitle}
          </p>
        </div>
        <div className="podcast-embed">
          {podcastSection.podcast.map((podcast, i) => {
            return (
              <div key={i} className="podcast-iframe-container">
                <iframe
                  src={podcast}
                  frameBorder="0"
                  scrolling="no"
                  seamless
                  className="podcast-iframe"
                  title={`podcast-${i}`}
                ></iframe>
              </div>
            );
          })}
        </div>
      </Fade>
    </div>
  );
}