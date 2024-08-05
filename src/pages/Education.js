import React from "react";
import Badge from "../assets/badge.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Education({ education }) {
  const { frontMatter } = education;
  if (!frontMatter) return null;


  return (
    <div>
      <Header />
      <Footer />
      <div className="education container fade-in">
        <header className="header">
          <h1>Steven Chen</h1>
          <p>
            <strong>Major courses:{" "}</strong>
            {
              frontMatter.major_courses.map((course, index) => {
                return (index !== frontMatter.major_courses.length - 1 ? (
                  <span key={course}>
                    {course}{", "}
                  </span>) : (
                  <span key={course}>
                    {course}
                  </span>)
                )
              })
            }
          </p>
        </header>

        <section className="education-section">
          <img className="certificate-badge" src={Badge} alt="Badge or Icon" />
          <div className="certificate">

            <div className="certificate-header">
              <h2>University of British Columbia</h2>
              <p>Graduation Certificate</p>
            </div>
            <div className="certificate-body">
              <p>
                This is to certify that
                <br />
                <strong>Steven Chen</strong>
                <br />
                has successfully completed the requirements for the degree of
                <br />
                <strong>Bachelor of Science in Combined major in Computer Science and Statistics</strong>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>


  );
}

export default Education;
