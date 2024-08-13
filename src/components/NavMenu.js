// import React from "react";
// import { Link } from "react-router-dom";
// import { menus } from "../utils/constants";

// function NavMenu() {
//   return (
//     <nav className="nav-menu">
//       <ul>
//         {menus.map((menu) => (
//           <li key={menu.title}>
//             <Link to={encodeURI(menu.path)}>{menu.title}</Link>
//             {menu.subSections && (
//               <ul className="sub-menu">
//                 {menu.subSections.map((subMenu) => (
//                   <li key={subMenu.title}>
//                     <Link to={encodeURI(subMenu.path)}>{subMenu.title}</Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }
// export default NavMenu;

// import React from "react";
// import { Link, useMatch } from "react-router-dom";
// import { menus } from "../utils/constants";

// function NavMenu({ customStyles }) {
//   const match = useMatch();

//   const getActiveClass = (path) => {
//     return match.path.includes(path) ? "active" : "";
//   };

//   return (
//     <nav className={`nav-menu ${customStyles}`}>
//       <ul>
//         {menus.map((menu) => (
//           <li key={menu.title} className={getActiveClass(menu.path)}>
//             <Link to={encodeURI(menu.path)}>{menu.title}</Link>
//             {menu.subSections && (
//               <ul className="sub-menu">
//                 {menu.subSections.map((subMenu) => (
//                   // <li
//                   //   key={subMenu.title}
//                   //   className={getActiveClass(subMenu.path)}
//                   // >
//                   //   <Link to={encodeURI(subMenu.path)}>{subMenu.title}</Link>
//                   // </li>
//                   <> </>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

// export default NavMenu;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { menus } from "../utils/constants";

function NavMenu({ customStyles }) {
  const location = useLocation();

  const getActiveClass = (path) => {
    if (path === "/") {
      return location.pathname === path ? "active" : "";
    }
    return location.pathname.includes(path) ? "active" : "";
  };

  return (
    <nav className={`nav-menu ${customStyles}`}>
      <ul>
        {menus.map((menu) => (
          <li key={menu.title} className={getActiveClass(menu.path)}>
            <Link to={encodeURI(menu.path)}>{menu.title}</Link>
            {menu.subSections && (
              <ul className="sub-menu">
                {menu.subSections.map((subMenu) => (
                  <li
                    key={subMenu.title}
                    className={getActiveClass(subMenu.path)}
                  >
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
