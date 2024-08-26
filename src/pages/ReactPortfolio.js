import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const filePaths = {
  main: "react-portfolio.md",
  tabs: [],
};

function Jankbot() {
  const [main, setMain] = useState("");
  const [sections, setSections] = useState([]);

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
    <div className="main-container">
      <Markdown remarkPlugins={[remarkGfm]}>{main}</Markdown>
      <p>TODO: query</p>
    </div>
  );
}

export default Jankbot;
