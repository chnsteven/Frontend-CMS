import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const filePaths = {
  main: "about/about.md",
  tabs: [],
};
function About() {
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
    em: ({ children }) => (
      <video width="480" height="270" controls muted={true}>
        <source src={children} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
