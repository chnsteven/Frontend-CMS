import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ filePath }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
      .catch((error) => console.error("Error fetching markdown:", error));
  }, [filePath]);

  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
