import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLink } from "@fortawesome/free-solid-svg-icons";
function Footer() {
  const copyToClipboard = () => {
    const textToCopy = document.getElementById("textToCopy").textContent;

    navigator.clipboard
      .writeText(textToCopy)
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
        <p className="phone" id="textToCopy" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faPhone} className="icon" />
          604-765-4987
        </p>
        <p className="email" id="textToCopy" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          chensteven0617@gmail.com
        </p>
        <p className="linkedin" id="textToCopy">
          <FontAwesomeIcon icon={faLink} className="icon" />
          <a
            href="https://www.linkedin.com/in/steven-chen-a62226276/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </address>
    </footer>
  );
}

export default Footer;
