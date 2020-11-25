import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import Navigation from "../components/navigation/Navigation";
import Topbar from "../components/sidebar/Topbar";


const Dashboard = ({ sidebarIsOpen, toggleSidebar }) => (

  <Container fluid className={classNames("content p-1", { "is-open": sidebarIsOpen })}>
    
    <Navigation />

    <Topbar toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />

    <Switch>
      <Route path='/' />
      <Route path='/constrains' />
    </Switch>

  </Container>
  
);

export default Dashboard;
