import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { menus } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import "./nav-bar.css";

function NavBar() {
  const location = useLocation();

  const isActivePath = (path) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  // Find the default active menu based on the current pathname
  const defaultActiveMenu = menus.find(
    (menu) =>
      isActivePath(menu.path) ||
      (menu.subSections &&
        menu.subSections.some((subMenu) => isActivePath(subMenu.path)))
  )?.title;

  const [activeMenu, setActiveMenu] = useState(defaultActiveMenu);

  useEffect(() => {
    localStorage.setItem("activeMenu", activeMenu);
  }, [activeMenu]);

  const toggleSubMenu = (menuTitle) => {
    setActiveMenu((prevMenu) => (prevMenu === menuTitle ? null : menuTitle));
  };

  const isParentActive = (menu) => {
    return (
      isActivePath(menu.path) ||
      (menu.subSections &&
        menu.subSections.some((subMenu) => isActivePath(subMenu.path)))
    );
  };

  const handleMenuClick = (event, menu) => {
    if (menu.subSections) {
      event.preventDefault(); // Prevent navigation
      toggleSubMenu(menu.title); // Toggle the submenu
    }
  };

  const handleSubMenuClick = () => {
    // Collapse the submenu by setting activeMenu to null
    setActiveMenu(null);
  };

  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        {menus.map((menu) => (
          <li key={`nav-bar ${menu.title}`}>
            <Link
              to={encodeURI(menu.path)}
              onClick={(event) => handleMenuClick(event, menu)}
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
                        onClick={handleSubMenuClick}
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
