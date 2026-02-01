import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Talks.css";
import TalkCard from "../../components/talkCard/TalkCard";
import { talkSection } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Talks() {
  const { isDark } = useContext(StyleContext);
  if (!talkSection.display) {
    return null;
  }
  return (
    <div className="main" id="talks">
      <Fade bottom duration={1000} distance="20px">
        <div className="talk-header">
          <h1
            className={
              isDark
                ? "dark-mode heading talk-title"
                : "heading talk-title"
            }
          >
            {talkSection.title}
          </h1>
          <p
            className={
              isDark
                ? "dark-mode talk-subtitle"
                : "talk-subtitle"
            }
          >
            {talkSection.subtitle}
          </p>
        </div>
        <div className="talk-main-div">
          {talkSection.talks.map((talk, i) => {
            return <TalkCard key={i} talkDetails={talk} />;
          })}
        </div>
      </Fade>
    </div>
  );
}