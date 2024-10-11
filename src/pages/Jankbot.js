import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const filePaths = {
  main: "jank-bot.md",
  tabs: [],
};

function Jankbot() {
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

  const components = {
    a: ({ href, alt, children }) => (
      <a href={href} alt={alt} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  };
  return (
    <div className="main-container jank-bot-theme">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {main}
      </Markdown>
    </div>
  );
}

export default Jankbot;
