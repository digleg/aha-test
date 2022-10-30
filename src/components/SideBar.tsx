import React from "react";
import "./SideBar.css";

function SideBar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__logo">Logo</div>
        <div className="sidebar__home">
          <a href="/">
            <img src="/svg/menuIcon.svg" alt="" />
          </a>
          <div>
            <a href="/">Home</a>
          </div>
        </div>
        <div className="sidebar__icon">
          <a href="/tags">
            <img src="/svg/menuIcon.svg" alt="" />
          </a>
          <div>
            <a href="/tags">Tags</a>
          </div>
        </div>
        <div className="sidebar__icon">
          <a href="/passwordInput">
            <img src="/svg/menuIcon.svg" alt="" />
          </a>
          <div>
            <a href="/passwordInput">Password Input</a>
          </div>
        </div>
        <div className="sidebar__icon">
          <a href="/advancedEffect">
            <img src="/svg/menuIcon.svg" alt="" />
          </a>
          <div>
            <a href="/advancedEffect">Advanced Effect</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
