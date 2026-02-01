import React from "react";
import "./Top.css";
import { FiArrowUp } from "react-icons/fi";

export default function Top() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="top-button" onClick={handleClick}>
      <FiArrowUp />
    </div>
  );
}