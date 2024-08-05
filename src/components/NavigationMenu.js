import React from "react";

function NavigationMenu({ buttonNames }) {
  const scrollToProject = (name) => {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderNavigationMenu = () => (
    <div className="navigationMenu">
      Navigation menu
      <ul>
        {buttonNames.map((buttonName) => (
          <li>
            <button onClick={() => scrollToProject(buttonName)}>
              {buttonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  return <div>{renderNavigationMenu()}</div>;
}

export default NavigationMenu;
