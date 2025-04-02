import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons"; 
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import "./ModeToggle.css";

const ModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <button onClick={toggleMode}>
        <FontAwesomeIcon icon={darkMode ? faMoon : faMoon} />  
        {darkMode ? " Light Mode" : " Dark Mode"}
        <FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} className="toggle-icon"/>
      </button>
    </div>
  );
};

export default ModeToggle;