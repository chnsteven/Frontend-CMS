import React from "react";
import { Link } from "react-router-dom";
import { headerLinks } from "../utils/constants";
import githubIcon from "../assets/icons/github.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";

function Header() {
  return (
    <header>
      <nav className="container-fluid" id="navigation-bar">
        {headerLinks.map((headerLink) => (
          headerLink.title !== "Home" && (
            <Link
              to={headerLink.path}
              key={headerLink.title}
              className="navigation-bar-link"
            >
              {headerLink.title}
            </Link>)

        ))}
      </nav>
      <div id="navigation-link">
        <a
          href="https://www.linkedin.com/in/steven-chen-a62226276/"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
        >
          <img
            className="icon"
            src={linkedinIcon}
            alt="linkedin icon"
          />
        </a>
        <a
          href="https://github.com/chnsteven"
          target="_blank"
          rel="noreferrer"
          title="Github"
        >
          <img className="icon" src={githubIcon} alt="github icon" />
        </a>
      </div>
    </header>

  );
}

export default Header;
