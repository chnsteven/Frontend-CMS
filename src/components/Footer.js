import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLink,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
function Footer() {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard", err);
      });
  };

  return (
    <footer>
      <address>
        <p className="phone" onClick={() => copyToClipboard("604-765-4987")}>
          <FontAwesomeIcon icon={faPhone} className="icon" />
          604-765-4987
        </p>
        <p
          className="email"
          onClick={() => copyToClipboard("chensteven0617@gmail.com")}
        >
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          chensteven0617@gmail.com
        </p>
        <p className="linkedin">
          <FontAwesomeIcon icon={faLink} className="icon" />
          <a
            href="https://www.linkedin.com/in/steven-chen-a62226276/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
        <p className="github">
          <FontAwesomeIcon icon={faCodeBranch} className="icon" />
          <a
            href="https://github.com/chnsteven"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </p>
      </address>
    </footer>
  );
}

export default Footer;
