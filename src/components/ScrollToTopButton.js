import React from "react";
import { useState, useEffect } from "react";
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
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-button ${isVisible ? "visible" : "hidden"}`}
      title="Scroll to top"
    >
      ↑
    </button>
  );
}

export default ScrollToTopButton;
