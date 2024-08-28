import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VisualNovel2 from "../components/VisualNovel2";

const filePaths = {
  main: "java-application.md",
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
      <VisualNovel2 />
    </div>
  );
}

export default Jankbot;
