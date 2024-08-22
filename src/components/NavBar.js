import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { menus } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import "./nav-bar.css";

function NavBar() {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    localStorage.setItem("activeMenu", activeMenu);
  }, [activeMenu]);

  const isActiveMenu = (path) => {
    return path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  };

  const toggleSubMenu = (menuTitle) => {
    setActiveMenu((prevMenu) => (prevMenu === menuTitle ? null : menuTitle));
  };

  const handleMenuClick = (event, menu) => {
    if (menu.subSections) {
      event.preventDefault();
      toggleSubMenu(menu.title);
    } else {
      setActiveMenu(null);
    }
  };

  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        {menus.map((menu) => (
          <li key={`nav-bar-${menu.title}`}>
            <Link
              to={encodeURI(menu.path)}
              onClick={(event) => handleMenuClick(event, menu)}
              className={
                isActiveMenu(menu.path) && !menu.subSections ? "active" : ""
              }
            >
              {menu.title}{" "}
              {menu.subSections && (
                <FontAwesomeIcon
                  icon={activeMenu === menu.title ? faCaretDown : faCaretLeft}
                />
              )}
            </Link>
            {menu.subSections && activeMenu === menu.title && (
              <ul className="nav-sub-menu">
                {menu.subSections.map((subMenu) => (
                  <li key={`nav-sub-menu-${subMenu.title}`}>
                    <Link
                      to={encodeURI(subMenu.path)}
                      onClick={() => setActiveMenu(null)}
                      className={
                        location.pathname === subMenu.path ? "active" : ""
                      }
                    >
                      {subMenu.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
