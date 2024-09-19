import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Roadmap from "../components/RoadMap";
import QueryEngine from "../components/QueryEngine";

const filePaths = {
  main: "insight-ubc.md",
  tabs: [],
};

function InsightUBC() {
  const [main, setMain] = useState("");

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
  return (
    <div className="main-container">
      <Markdown remarkPlugins={[remarkGfm]}>{main}</Markdown>
      <Roadmap />
      <QueryEngine />
    </div>
  );
}

export default InsightUBC;
