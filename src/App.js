import "./utils/css/projectCard.css";
import "./utils/css/education.css";
import "./utils/css/animations.css";
import "./utils/css/nav-menu.css";
import "./utils/css/projects.css";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { projectIds, menus } from "./utils/constants";
import { useState, useEffect } from "react";
import AppRouter from "./components/AppRouter";
import axios from "axios";
import ProjectPage from "./pages/ProjectPage";

const PORT =
  "localhost:5001" || "https://steven-chen-portfolio-server.onrender.com/";

function App() {
  // const [projects, setProjects] = useState([]);
  // const [education, setEducation] = useState({});
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // await new Promise(resolve => setTimeout(resolve, 2000));
  //       const educationResponse = await axios.get(`${PORT}education`);
  //       setEducation(educationResponse.data);

  //       const projectRequests = projectIds.map((projectId) =>
  //         axios.get(`${PORT}projects/${projectId}`)
  //       );
  //       const projectPromises = await Promise.all(projectRequests);
  //       const projectsData = projectPromises.map((project) => project.data);
  //       setProjects(projectsData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false); // Set loading to false in case of an error
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="loading-screen">
  //       {/* <p>loading...</p> */}
  //       <p>
  //         Please bear with me while my website loads. I'm on a free server, so
  //         it may take a bit longer (at most 1 minute). I appreciate your
  //         patience!
  //       </p>
  //     </div>
  //   );
  // }
  return (
    <div className="body">
      <AppRouter />
      {/* <Router>
        <Routes>
          {projects.map(
            (project) =>
              project && (
                <Route
                  path={"/projects/" + project.frontMatter.title}
                  key={project.frontMatter.title}
                  element={<ProjectPage project={project} />}
                />
              )
          )}
          {menus.map((link) => {
            if (link.title === "Projects") {
              return (
                <Route
                  path={link.path}
                  key={link.title}
                  element={<link.component projects={projects} />}
                />
              );
            } else if (link.title === "Education") {
              return (
                <Route
                  path={link.path}
                  key={link.title}
                  element={<link.component education={education} />}
                />
              );
            } else {
              return (
                <Route
                  path={link.path}
                  key={link.title}
                  element={<link.component />}
                />
              );
            }
          })}
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
