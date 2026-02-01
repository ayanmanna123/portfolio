import React from "react";
import "./SplashScreen.css";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import { splashScreen } from "../../portfolio";

export default function SplashScreen() {
  return (
    <div className="splash-container">
      <div className="splash-animation-container">
        <DisplayLottie src={splashScreen.animation} />
      </div>
      <h1 className="splash-title">Welcome</h1>
    </div>
  );
}