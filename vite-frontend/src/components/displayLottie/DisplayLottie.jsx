import React, {useContext} from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import StyleContext from "../../contexts/StyleContext";

export default function DisplayLottie({ animationData, src }) {
  const {isDark} = useContext(StyleContext);
  return (
    <Player
      src={src || animationData}
      loop={true}
      autoplay={true}
      style={{ width: "100%", height: "100%" }}
      className={isDark ? "filter-black" : ""}
    />
  );
}