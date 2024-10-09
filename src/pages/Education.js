import React, { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../utils/functions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const filePaths = {
  main: "education/education.md",
  tabs: [],
};

const components = {
  li: ({ node, ...props }) => {
    const childrenArray = React.Children.toArray(props.children);
    const description = childrenArray.find((child) => child.type !== "strong");
    const title = childrenArray.find((child) => child.type === "strong");

    const tooltipId = `tooltip-${title}`;

    return (
      <li>
        <div className="tooltip-container">
          <span>{title}</span>
          <FontAwesomeIcon
            icon={faCircleInfo}
            data-tooltip-id={tooltipId}
            data-tooltip-content={description}
            className="icon"
          />
          <ReactTooltip
            id={tooltipId}
            place="right"
            type="info"
            effect="solid"
          />
        </div>
      </li>
    );
  },
};
function Education() {
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
      <Markdown
        className="education-style"
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {main}
      </Markdown>
    </div>
  );
}

export default Education;
