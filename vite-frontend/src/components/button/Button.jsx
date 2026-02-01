import React from "react";
import "./Button.css";

export default function Button({ text, className, href, onClick }) {
  return (
    <div className={className}>
      {href ? (
        <a href={href} onClick={onClick} className="btn">
          {text}
        </a>
      ) : (
        <button onClick={onClick} className="btn">
          {text}
        </button>
      )}
    </div>
  );
}