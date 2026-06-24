import React, { useState } from "react";
import logo from "../assets/logo.svg";
import Home from "../assets/home-solid.svg";

import { NavLink } from "react-router-dom";

import {
  UserRectangle,
  Trophy,
  ClipboardText,
  Files,
  UserCircle,
} from "@phosphor-icons/react";

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);

  const handleClick = () => setClick(!click);
  const handleProfileClick = () => setProfileClick(!profileClick);

  const getItemClass = ({ isActive }) =>
    `sidebar-item${isActive ? " active" : ""}`;

  return (
    <div className="sidebar">
      <button
        className={`sidebar-toggle${click ? " is-open" : ""}`}
        onClick={handleClick}
      >
        Menu
      </button>

      <div className="sidebar-shell">
        <div className="sidebar-logo">
          <img src={logo} alt="GradShow Logo" />
        </div>

        <ul className={`sidebar-list${click ? " is-open" : ""}`}>
          <NavLink
            onClick={() => setClick(false)}
            to="/"
            end
            className={getItemClass}
          >
            <img src={Home} alt="Home" />
            <span className={`sidebar-text${click ? " is-open" : ""}`}>
              Home
            </span>
          </NavLink>

          <NavLink
            onClick={() => setClick(false)}
            to="/dashboard"
            className={getItemClass}
          >
            <UserRectangle
              className="sidebar-icon"
              size={20}
              weight="fill"
            />
            <span className={`sidebar-text${click ? " is-open" : ""}`}>
              Dashboard
            </span>
          </NavLink>

          <NavLink
            onClick={() => setClick(false)}
            to="/tasks"
            className={getItemClass}
          >
            <ClipboardText
              className="sidebar-icon"
              size={20}
              weight="fill"
            />
            <span className={`sidebar-text${click ? " is-open" : ""}`}>
              My Tasks
            </span>
          </NavLink>

          <NavLink
            onClick={() => setClick(false)}
            to="/submissions"
            className={getItemClass}
          >
            <Files
              className="sidebar-icon"
              size={20}
              weight="fill"
            />
            <span className={`sidebar-text${click ? " is-open" : ""}`}>
              Submissions
            </span>
          </NavLink>

          <NavLink
            onClick={() => setClick(false)}
            to="/scores"
            className={getItemClass}
          >
            <Trophy
              className="sidebar-icon"
              size={20}
              weight="fill"
            />
            <span className={`sidebar-text${click ? " is-open" : ""}`}>
              Scores
            </span>
          </NavLink>

          <NavLink
            onClick={() => setClick(false)}
            to="/profile"
            className={getItemClass}
          >
            <UserCircle
              className="sidebar-icon"
              size={20}
              weight="fill"
            />
            <span className={`sidebar-text${click ? " is-open" : ""}`}>
              Profile
            </span>
          </NavLink>
        </ul>

        <div className={`sidebar-profile${profileClick ? " is-open" : ""}`}>
          <img
            onClick={handleProfileClick}
            src="https://picsum.photos/200"
            alt="Profile"
          />

          <div
            className={`sidebar-details${profileClick ? " is-open" : ""}`}
          >
            <div className="sidebar-name">
              <h4>Sarah Ahmad</h4>
              <a href="/profile">View Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;