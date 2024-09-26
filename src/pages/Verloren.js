import React, { useEffect, useState, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchMarkdownContent } from "../utils/functions";

const filePaths = {
  main: "verloren/main.md",
  tabs: [
    {
      path: "verloren/tab1.md",
    },
    {
      path: "verloren/tab2.md",
    },
  ],
};

const Verloren = () => {
  const [main, setMain] = useState("");
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const tabContentRef = useRef(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (tabContentRef.current) {
      tabContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAllMarkdown = async () => {
      const { mainContent, sectionsContent } = await fetchMarkdownContent(
        filePaths
      );

      if (isMounted) {
        setMain(mainContent);
        setSections(sectionsContent);
      }
    };

    fetchAllMarkdown();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="main-container">
        <Markdown remarkPlugins={[remarkGfm]}>{main}</Markdown>
      </div>
      <div className="tab-container" ref={tabContentRef}>
        <div className="tab-button-container">
          <button className="tab-button" onClick={() => handleTabClick(1)}>
            1. Tutorials
          </button>
          <button className="tab-button" onClick={() => handleTabClick(2)}>
            2. Features
          </button>
        </div>
        <div className="tab-content-container">
          {sections.map((section, index) => (
            <section
              key={`section-${index}`}
              style={{
                display: activeTab - 1 === index ? "block" : "none",
              }}
            >
              <Markdown remarkPlugins={[remarkGfm]}>{section}</Markdown>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Verloren;
