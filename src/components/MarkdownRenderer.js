// Import the React Markdown component
import React from "react";
import ReactMarkdown from "react-markdown";

// Sample markdown text
const markdown = `
# Hello, Markdown!
This is a sample Markdown text with **bold** and _italic_ formatting.

## List
- Item 1
- Item 2
- Item 3
`;

// Create a React component to render the Markdown
const MarkdownRenderer = () => {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
