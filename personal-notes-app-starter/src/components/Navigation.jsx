import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import ThemeContext from "../contexts/ThemeContext";

function Navigation({ logout, name }) {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <button className="toggle-theme" onClick={toggleTheme}>
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                </button>
              </li>
              <li>
                <button className="button-logout" onClick={logout}>
                  {name} <FiLogOut />
                </button>
              </li>
            </ul>
          </nav>
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default Navigation;
