export const menus = [
  { title: "Home", path: "/", component: () => import("../pages/Home") },
  { title: "About", path: "/about", component: () => import("../pages/About") },
  {
    title: "Projects",
    path: "/projects",
    component: () => import("../pages/Projects"),
    subSections: [
      {
        title: "cosmania",
        path: "/projects/cosmania/cosmania",
        component: () => import("../pages/ProjectPage"),
      },
      {
        title: "insight-ubc",
        path: "/projects/insight-ubc.md",
        component: () => import("../pages/ProjectPage"),
      },
      {
        title: "jankbot",
        path: "/projects/jankbot.md",
        component: () => import("../pages/ProjectPage"),
      },
      {
        title: "java-application",
        path: "/projects/java-application.md",
        component: () => import("../pages/ProjectPage"),
      },
      {
        title: "react-portfolio",
        path: "/projects/react-portfolio.md",
        component: () => import("../pages/ProjectPage"),
      },
      {
        title: "verloren",
        path: "/projects/verloren.md",
        component: () => import("../pages/ProjectPage"),
      },
    ],
  },
  {
    title: "Education",
    path: "/education/education.md",
    component: () => import("../pages/Education"),
  },
];

export const projectIds = [
  "insight-ubc",
  "jankbot",
  "java-application",
  "react-portfolio",
  "verloren",
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
