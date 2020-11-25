import React, { useState } from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from "reactstrap";
import { Link } from "react-router-dom";

const Navigation = ({sidebarIsOpen, toggleSidebar}) => {
    const [topbarIsOpen, setTopbarOpen] = useState(true);
    const toggleTopbar = () => {
      setTopbarOpen(!topbarIsOpen);
    }
    
    return (
        <Navbar color="light" light className="navbar shadow-sm p-3 bg-white rounded" expand="md" >
            <NavbarBrand className="pl-2 pr-5">
                <NavLink tag={Link} to={"/"}>
                    AssetNXT
                </NavLink>
            </NavbarBrand>
                
            <NavbarToggler onClick={toggleTopbar} />

            <Collapse isOpen={topbarIsOpen} navbar>
                <Nav className="mr-auto" navbar>
                    
                    <NavItem className="mx-2">
                        <NavLink tag={Link} to={"/constrains"}>
                            Constrains
                        </NavLink>
                    </NavItem>

                    <NavItem  className="mx-2">
                        <NavLink tag={Link} to={"/notifications"}>
                            Notifications
                        </NavLink>
                    </NavItem>
                    
                    <NavItem  className="mx-2">
                        <NavLink tag={Link} to={"/geo"}>
                            Geometrics
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Navigation;