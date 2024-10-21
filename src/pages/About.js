import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const filePaths = {
  main: "about/about.md",
  tabs: [],
};
function About() {
  const [main, setMain] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchAllMarkdown = async () => {
      const { mainContent } = await fetchMarkdownContent(filePaths);

      if (isMounted) {
        setMain(mainContent);
      }
    };

    fetchAllMarkdown();

    return () => {
      isMounted = false;
    };
  }, []);

  const components = {
    em: ({ children }) => (
      <span className="video-container collapsible-container">
        <p>
          A Short Animation Clip &nbsp;
          <FontAwesomeIcon
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? faCaretUp : faCaretDown}
            style={{ cursor: "pointer", marginTop: "10px" }}
          />
        </p>
        <video
          className="video-content"
          controls
          muted={true}
          style={{ display: isCollapsed ? "none" : "block" }}
        >
          <source src={children} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </span>
    ),
  };

  return (
    <div className="main-container">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {main}
      </Markdown>
    </div>
  );
}

export default About;
