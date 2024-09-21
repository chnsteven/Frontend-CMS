import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VisualNovel from "../components/VisualNovel";

const filePaths = {
  main: "java-application/main.md",
  tabs: [],
};

function JavaApplication() {
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
      <VisualNovel />
    </div>
  );
}

export default JavaApplication;
