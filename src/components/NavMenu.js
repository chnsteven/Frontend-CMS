import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { menus } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

function NavMenu() {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(() => {
    // Retrieve stored active menu from localStorage, default to null if not found
    return localStorage.getItem("activeMenu") || null;
  });

  useEffect(() => {
    // Store active menu in localStorage whenever it changes
    localStorage.setItem("activeMenu", activeMenu);
  }, [activeMenu]);

  const toggleSubMenu = (menuTitle) => {
    setActiveMenu((prevMenu) => (prevMenu === menuTitle ? null : menuTitle));
  };

  const isActivePath = (path) => {
    // Ensure the "Home" path ("/") is only active when exactly on the home page
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  const isParentActive = (menu) => {
    // Check if the parent menu or any of its sub-menus is active
    return (
      isActivePath(menu.path) ||
      (menu.subSections &&
        menu.subSections.some((subMenu) => isActivePath(subMenu.path)))
    );
  };

  return (
    <nav className="nav-menu">
      <ul>
        {menus.map((menu) => (
          <li key={`nav-menu ${menu.title}`}>
            <Link
              to={encodeURI(menu.path)}
              onClick={() => toggleSubMenu(menu.title)}
              className={isParentActive(menu) ? "active" : ""}
            >
              {menu.title}{" "}
              {menu.subSections && (
                <FontAwesomeIcon
                  icon={activeMenu === menu.title ? faCaretDown : faCaretLeft}
                />
              )}
            </Link>
            {menu.subSections &&
              isParentActive(menu) &&
              activeMenu === menu.title && (
                <ul className="nav-sub-menu">
                  {menu.subSections.map((subMenu) => (
                    <li key={`nav-sub-menu ${subMenu.title}`}>
                      <Link
                        to={encodeURI(subMenu.path)}
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

export default NavMenu;
