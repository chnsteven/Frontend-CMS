import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
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
        <p className="copy" id="textToCopy" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faEnvelope} />
          chensteven0617@gmail.com
        </p>

        <p className="copy" id="textToCopy" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faPhone} />
          604-765-4987
        </p>
      </address>
    </footer>
  );
}

export default Footer;
