import React, { useEffect, useState, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchMarkdownContent } from "../utils/functions";

const filePaths = {
  main: "cosmania/main.md",
  tabs: [
    {
      path: "cosmania/tab1.md",
    },
    {
      path: "cosmania/tab2.md",
    },
    {
      path: "cosmania/tab3.md",
    },
  ],
};

const Cosmania = () => {
  const [main, setMain] = useState("");
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
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
          <button className="tab-button" onClick={() => handleTabClick(0)}>
            1. Core Game Mechanics
          </button>
          <button className="tab-button" onClick={() => handleTabClick(1)}>
            2. User Interface (UI) Elements
          </button>
          <button className="tab-button" onClick={() => handleTabClick(2)}>
            3. State Management
          </button>
        </div>
        <div className="tab-content-container">
          {sections.map(
            (section, index) =>
              activeTab === index && (
                <section
                  key={`section-${index}`}
                  style={{ display: activeTab === index ? "block" : "none" }}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>{section}</Markdown>
                </section>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Cosmania;
