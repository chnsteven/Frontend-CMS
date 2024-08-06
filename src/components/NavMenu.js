import React from "react";
import { Link } from "react-router-dom";
import { menus } from "../utils/constants";

function NavMenu() {
  return (
    <nav className="nav-menu">
      <ul>
        {menus.map((menu) => (
          <li key={menu.title}>
            <Link to={encodeURI(menu.path)}>{menu.title}</Link>
            {menu.subSections && (
              <ul className="sub-menu">
                {menu.subSections.map((subMenu) => (
                  <li key={subMenu.title}>
                    <Link to={encodeURI(subMenu.path)}>{subMenu.title}</Link>
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
