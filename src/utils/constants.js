import Home from "../pages/Home";
import About from "../pages/About";
import Cosmania from "../pages/Cosmania";
import InsightUBC from "../pages/InsightUBC";
import Jankbot from "../pages/Jankbot";
import Education from "../pages/Education";
import JavaApplication from "../pages/JavaApplication";
import ReactPortfolio from "../pages/ReactPortfolio";
import Verloren from "../pages/Verloren";

export const menus = [
  { title: "Home", path: "/", component: <Home /> },
  { title: "About", path: "/about", component: <About /> },
  {
    title: "Projects",
    path: "/projects",
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
        path: "/projects/jank-bot",
        component: <Jankbot />,
      },
      {
        title: "java-application",
        path: "/projects/java-application",
        component: <JavaApplication />,
      },
      {
        title: "react-portfolio",
        path: "/projects/react-portfolio",
        component: <ReactPortfolio />,
      },
      {
        title: "verloren",
        path: "/projects/verloren",
        component: <Verloren />,
      },
    ],
  },
  {
    title: "Education",
    path: "/education",
    component: <Education />,
  },
];

export const projectIds = [
  "insight-ubc",
  "jankbot",
  "java-application",
  "react-portfolio",
  "verloren",
];
