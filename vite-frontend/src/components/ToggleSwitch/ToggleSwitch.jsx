import React, { useContext } from "react";
import StyleContext from "../../contexts/StyleContext";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const { isDark, changeTheme } = useContext(StyleContext);

  return (
    <div className="toggle-btn">
      <input
        checked={isDark}
        onChange={changeTheme}
        type="checkbox"
        className="checkbox"
        id="checkbox"
      />
      <label htmlFor="checkbox" className="switch">
        <i className="fas fa-sun"></i>
        <i className="fas fa-moon"></i>
      </label>
    </div>
  );
};

export default ToggleSwitch;