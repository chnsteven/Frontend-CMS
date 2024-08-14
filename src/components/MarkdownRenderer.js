import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
