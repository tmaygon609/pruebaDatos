import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarToggler,
  Collapse,
  Navbar,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Menu() {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);
  const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="lg" light className="bg-primary" sticky="top">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white" to="/">
          Inicio
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={!isOpen} navbar>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Dropdown isOpen={dropdownOpen1} toggle={toggleDropdown1}>
                <DropdownToggle nav caret className="text-white">
                  Documentos
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/documentacion"
                    >
                      Documentación
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/presentacion"
                    >
                      Presentación
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>

            <li className="nav-item dropdown">
              <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
                <DropdownToggle nav caret className="text-white">
                  Prácticas
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/practica1"
                    >
                      Primera Práctica
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/practica2"
                    >
                      Segunda Práctica
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Menu;
