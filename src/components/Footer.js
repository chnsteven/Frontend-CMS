import React from "react";
import emailIcon from "../assets/icons/email.svg";
import mobilePhoneIcon from "../assets/icons/mobile.svg";
function Footer() {
  const copyToClipboard = () => {
    const textToCopy = document.getElementById('textToCopy').textContent;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch((err) => {
        console.error('Unable to copy to clipboard', err);
      });
  }
  return (
    <footer>
      <img className="icon" src={emailIcon} alt="email icon" />
      <p className="copy" id="textToCopy" onClick={copyToClipboard}>
        chensteven0617@gmail.com
      </p>
      <img className="icon" src={mobilePhoneIcon} alt="mobile phone icon"
      />
      <p className="copy" id="textToCopy" onClick={copyToClipboard}>
        604-765-4987
      </p>

      <div className="license-link">
        <p>
          Uicons by{" "}
          <a
            className="footer-link hover-text-shadow"
            href="https://www.flaticon.com/uicons"
            target="_blank"
            rel="noreferrer"
          >
            Flaticon
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
