import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./twitter.css";
import { twitterDetails } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Twitter() {
  const { isDark } = useContext(StyleContext);
  if (!twitterDetails.display) {
    return null;
  }
  return (
    <div className="main" id="twitter">
      <Fade bottom duration={1000} distance="20px">
        <div className="heading-div">
          <h1 className={isDark ? "dark-mode heading" : "heading"}>Tweets</h1>
        </div>
        <div className="row">
          <div className="column">
            <div className="twitter-component">
              <a 
                className="twitter-timeline" 
                data-theme={isDark ? "dark" : "light"}
                href={`https://twitter.com/${twitterDetails.userName}`}
                data-tweet-limit="3"
              >
                Tweets by {twitterDetails.userName}
              </a>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}