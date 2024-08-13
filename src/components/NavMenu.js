import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menus } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

function NavMenu() {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubMenu = (menuTitle) => {
    setActiveMenu((prevMenu) => (prevMenu === menuTitle ? null : menuTitle));
  };

  return (
    <nav className="nav-menu">
      <ul>
        {menus.map((menu) => (
          <li key={`nav-menu ${menu.title}`}>
            <Link
              to={encodeURI(menu.path)}
              onClick={() => toggleSubMenu(menu.title)}
              className={location.pathname === menu.path ? "active" : ""}
            >
              {menu.title}{" "}
              {menu.subSections &&
                (activeMenu === menu.title ? (
                  <FontAwesomeIcon icon={faCaretDown} />
                ) : (
                  <FontAwesomeIcon icon={faCaretLeft} />
                ))}
            </Link>
            {menu.subSections &&
              location.pathname.startsWith(menu.path) &&
              activeMenu === menu.title && (
                <ul className="nav-sub-menu">
                  {menu.subSections.map((subMenu) => (
                    <li key={`nav-sub-menu ${subMenu.title}`}>
                      <Link
                        to={encodeURI(subMenu.path)}
                        className={
                          location.pathname === menu.path ? "active" : ""
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
