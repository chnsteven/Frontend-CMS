import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./cosmania.css";

const filePaths = {
  main: "/projects/cosmania/main.md",
  tabs: [
    {
      path: "/projects/cosmania/tab1.md",
    },
    {
      path: "/projects/cosmania/tab2.md",
    },
    {
      path: "/projects/cosmania/tab3.md",
    },
  ],
};

const Cosmania = () => {
  const [main, setMain] = useState("");
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchMarkdown = async (filePath) => {
      // console.log("Fetching:", filePath);
      try {
        const response = await fetch(filePath);
        if (isMounted) {
          return await response.text();
        }
      } catch (error) {
        console.error("Error fetching markdown:", error);
        return "";
      }
    };

    const fetchAllMarkdown = async () => {
      const mainContent = await fetchMarkdown(filePaths.main);
      const sectionsContent = await Promise.all(
        filePaths.tabs.map((tab) => fetchMarkdown(tab.path))
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
      <div className="tab-container">
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
                <section key={`activeTab ${index}`}>
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
