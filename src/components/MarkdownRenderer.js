import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const MarkdownRenderer = ({ filePath }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchMarkdown = async () => {
      try {
        const response = await fetch(filePath);
        if (isMounted) {
          const text = await response.text();
          setMarkdown(text);
        }
      } catch (error) {
        console.error("Error fetching markdown:", error);
      }
    };

    const fetchTimeout = setTimeout(fetchMarkdown, 0); // Debounce fetch

    return () => {
      clearTimeout(fetchTimeout); // Clean up timeout
      isMounted = false;
    };
  }, [filePath]);

  return (
    <div>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ExternalLink,
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
