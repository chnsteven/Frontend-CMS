import Markdown from "react-markdown";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const convertMarkdownToHTML = (text) => {
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Bold
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>"); // Italic
  return text;
};
function ProjectPage({ project }) {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const handleReturnToProjects = () => {
    navigate("/projects");
  };
  useEffect(() => {
    let keywordArray = [];
    // Render each item in the array with dangerouslySetInnerHTML
    project.frontMatter.features.forEach((content) => {
      const container = document.createElement("div");
      container.innerHTML = convertMarkdownToHTML(content);

      // Use Array.from to convert NodeList to an array and then map to extract text content
      const keyword = Array.from(container.querySelectorAll("strong")).map(
        (strongTag) => strongTag.textContent
      );

      // Join the strongTexts array into a sentence with commas
      keywordArray.push(keyword.join(", "));
    });
    setKeywords(keywordArray);
  }, [project]);

  return (
    <div>
      <Header />
      <Footer />
      <article className="container fade-in">
        <h1 className="title">
          <Markdown>{project.frontMatter.title}</Markdown>
        </h1>
        {project.frontMatter.overview && (
          <section className="container-column">
            <h1 className="sub-title">Overview</h1>
            <ul className="left-align">
              <li>
                <Markdown>{project.frontMatter.overview}</Markdown>
              </li>
            </ul>
          </section>
        )}
        {project.frontMatter.features && (
          <section className="container-column">
            <h1 className="sub-title">Features</h1>
            <ul className="left-align">
              {project.frontMatter.features.map((feature) => (
                <li>
                  <Markdown>{feature}</Markdown>
                </li>
              ))}
            </ul>
          </section>
        )}
        {keywords.length > 0 && (
          <section className="container-column">
            <h1 className="sub-title">Keywords</h1>
            <ul className="left-align">
              {keywords.map((keyword) => keyword !== "" && <li>{keyword}</li>)}
            </ul>
          </section>
        )}
        <button
          className="return-to-projects-button fade-in"
          onClick={handleReturnToProjects}
        >
          Return to project page
        </button>
      </article>
    </div>
  );
}

export default ProjectPage;
