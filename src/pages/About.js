import React, { useEffect, useState } from "react";
import { aboutContent } from "../utils/constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
const convertMarkdownToHTML = (text) => {
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Bold
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>"); // Italic
  return text;
};
function About() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    let skillsArray = [];
    // Render each item in the array with dangerouslySetInnerHTML
    aboutContent.forEach((content) => {
      const container = document.createElement("div");
      container.innerHTML = convertMarkdownToHTML(content);

      // Use Array.from to convert NodeList to an array and then map to extract text content
      const skillText = Array.from(container.querySelectorAll("strong")).map(
        (strongTag) => strongTag.textContent
      );

      // Join the strongTexts array into a sentence with commas
      skillsArray.push(skillText.join(", "));
    });
    setSkills(skillsArray);
  }, []);

  return (
    <div>
      <Header />
      <Footer />
      <article className="container fade-in">
        <section>
          <h1 className="sub-title">About</h1>
          <ul>
            {aboutContent.map((content) => (
              <li>
                <p
                  className="left-align"
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdownToHTML(content),
                  }}
                />
              </li>
            ))}
          </ul>
        </section>
      </article>
      <article className="container fade-in">
        <section>
          <h1 className="sub-title">Skills</h1>
          <ul className="left-align">
            {skills.map((skill, index) => (
              <li>{skill}</li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}

export default About;
