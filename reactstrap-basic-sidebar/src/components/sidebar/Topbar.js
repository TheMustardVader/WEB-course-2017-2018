import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

const Topbar = ({ sidebarIsOpen, toggleSidebar }) => {

  
  return (

      <Button className="btn btn-light shadow-none" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={sidebarIsOpen ? faAngleLeft : faAngleRight} size="2x" color="#696969"/>  
      </Button>
  );
};

export default Topbar;
