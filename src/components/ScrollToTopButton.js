import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollThreshold = 200;
    setIsVisible(scrollY > scrollThreshold);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-to-top-button">
      <button
        onClick={scrollToTop}
        className={`${isVisible ? "visible" : "hidden"}`}
        title="Scroll to top"
      >
        <FontAwesomeIcon icon={faArrowUpLong} />
      </button>
    </div>
  );
}

export default ScrollToTopButton;
