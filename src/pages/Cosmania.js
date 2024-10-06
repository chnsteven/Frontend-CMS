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

  const renderers = {
    table: ({ children }) => <table className="tab-table">{children}</table>,
    thead: ({ children }) => <thead className="tab-thead">{children}</thead>,
    tbody: ({ children }) => <tbody className="tab-tbody">{children}</tbody>,
    tr: ({ children }) => <tr className="tab-tr">{children}</tr>,
    th: ({ children }) => <th className="tab-th">{children}</th>,
    td: ({ children }) => <td className="tab-td">{children}</td>,
  };

  return (
    <div>
      <div className="main-container">
        <Markdown remarkPlugins={[remarkGfm]}>{main}</Markdown>
      </div>
      <div className="tab-container" ref={tabContentRef}>
        <div className="tab-button-container">
          <button className="tab-button" onClick={() => handleTabClick(1)}>
            <h3>1. Core Game Mechanics</h3>
          </button>
          <button className="tab-button" onClick={() => handleTabClick(2)}>
            <h3>2. User Interface (UI) Elements</h3>
          </button>
          <button className="tab-button" onClick={() => handleTabClick(3)}>
            <h3>3. State Management</h3>
          </button>
        </div>
        <div className="tab-content-container">
          {sections.map((section, index) => (
            <section
              key={`section-${index}`}
              className={
                activeTab - 1 === index
                  ? "tab-content-active"
                  : "tab-content-inactive"
              }
            >
              <Markdown remarkPlugins={[remarkGfm]} components={renderers}>
                {section}
              </Markdown>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cosmania;
