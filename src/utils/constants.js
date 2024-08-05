import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Education from "../pages/Education";

export const headerLinks = [
  { title: "Home", path: "/", component: Home },
  { title: "About", path: "/about", component: About },
  { title: "Projects", path: "/projects", component: Projects },
  { title: "Education", path: "/education", component: Education },
  // { title: "Experience", path: "/experience", component: Experience },
];

export const projectIds = [
  "reactPortfolio",
  "verloren",
  "cosmania",
  "insightUBC",
  "javaApplication",
  "jankbot"
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
