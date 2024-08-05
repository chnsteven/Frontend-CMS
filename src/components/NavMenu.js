import React from "react";
import { Link } from "react-router-dom";
import { menus } from "../utils/constants";

function NavMenu() {
  return (
    <nav className="nav-menu">
      {menus.map((menu) => (
        <ul key={menu.title}>
          <li>
            <Link to={encodeURI(menu.path)}>{menu.title}</Link>
          </li>
          {menu.subSections && (
            <ul className="sub-menu">
              {menu.subSections.map((subMenu) => (
                <li>
                  <Link key={subMenu.title} to={encodeURI(subMenu.path)}>
                    {subMenu.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ul>
      ))}
    </nav>
  );
}

export default NavMenu;
