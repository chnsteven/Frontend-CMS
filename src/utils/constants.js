import Home from "../pages/Home";
import About from "../pages/About";
import Cosmania from "../pages/Cosmania";
import InsightUBC from "../pages/InsightUBC";
import Education from "../pages/Education";

export const menus = [
  { title: "Home", path: "/", component: Home },
  { title: "About", path: "/about", component: About },
  {
    title: "Projects",
    path: "",
    component: null,
    subSections: [
      {
        title: "cosmania",
        path: "/projects/cosmania",
        component: <Cosmania />,
      },
      {
        title: "insight-ubc",
        path: "/projects/insight-ubc",
        component: <InsightUBC />,
      },
      {
        title: "jankbot",
        path: "/projects/jankbot",
        component: Cosmania,
      },
      {
        title: "java-application",
        path: "/projects/java-application",
        component: Cosmania,
      },
      {
        title: "react-portfolio",
        path: "/projects/react-portfolio",
        component: Cosmania,
      },
      {
        title: "verloren",
        path: "/projects/verloren",
        component: Cosmania,
      },
      {
        title: "test",
        path: "/projects/test",
        component: Cosmania,
      },
    ],
  },
  {
    title: "Education",
    path: "/education/education",
    component: Education,
  },
];

export const projectIds = [
  "insight-ubc",
  "jankbot",
  "java-application",
  "react-portfolio",
  "verloren",
];
