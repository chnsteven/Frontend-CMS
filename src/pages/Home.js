import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const filePaths = {
  main: "home/main.md",
  tabs: [],
};

function Home() {
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
    img: ({ src, alt }) => <img id="img-float" src={src} alt={alt} />,
  };

  return (
    <div className="main-container">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {main}
      </Markdown>
    </div>
  );
}

export default Home;
