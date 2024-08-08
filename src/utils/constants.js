import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Education from "../pages/Education";
import ProjectPage from "../pages/ProjectPage";

export const menus = [
  { title: "Home", path: "/", component: Home },
  { title: "About", path: "/about", component: About },
  {
    title: "Projects",
    path: "/projects",
    component: Projects,
    subSections: [
      {
        title: "react-portfolio",
        path: "/projects/react-portfolio",
        component: ProjectPage,
      },
      { title: "verloren", path: "/projects/verloren", component: ProjectPage },
      { title: "cosmania", path: "/projects/cosmania", component: ProjectPage },
      {
        title: "insight-ubc",
        path: "/projects/insight-ubc",
        component: ProjectPage,
      },
      {
        title: "java-application",
        path: "/projects/java-application",
        component: ProjectPage,
      },
      { title: "jankbot", path: "/projects/jankbot", component: ProjectPage },
    ],
  },
  { title: "Education", path: "/education", component: Education },
];

export const projectIds = [
  "react-portfolio",
  "verloren",
  "cosmania",
  "insight-ubc",
  "java-application",
  "jankbot",
];

export const aboutContent = [
  "Proficient with programming languages such as **C**/**C++**, **Java**, **JS**/**TS**,**Python**, and **R**.",
  "Experience with frameworks such as **Node.js**, **Next.js**, **React.js** and **Three.js**.",
  "Experience with Test-driven developments, **OOP**, **ECS**.",
  "Experience with version control with **git**.",
  "Participated in a simulated **Agile** work environment.",
  "Understand **design principles**, **design patterns**, **data structures** and **algorithms**.",
  "Understand **Intelligent** system, **computer graphics**, and **computer animations**.",
  "Familiar with developing React application using **React-Router**, **Bootstrap**, **API calls**.",
];
