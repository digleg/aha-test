import React from "react";
import Profile from "./Profile";
import Search from "./Search";
import "./index.css";

function home() {
  return (
    <div className="home">
      <div className="home__search">
        <Search />
      </div>
      <div className="home__profile">
        <Profile />
      </div>
    </div>
  );
}

export default home;
