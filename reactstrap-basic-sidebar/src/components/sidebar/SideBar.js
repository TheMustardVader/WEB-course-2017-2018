import React from "react";
import classNames from "classnames";


const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })} style={{ background: "#ff922e" }}>
    <div className="sidebar-header" style={{ background: "#ff922e" }}>
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>AssetNXT</h3>
    </div>
    <div className="side-menu" style={{ background: "#ffa048" }}>

    </div>
  </div>
);

export default SideBar;
