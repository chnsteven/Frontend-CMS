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

export const operatorMap = {
  "greater-than": (a, b) => a > b,
  "greater-than-equal": (a, b) => a >= b,
  "less-than": (a, b) => a < b,
  "less-than-equal": (a, b) => a <= b,
  equal: (a, b) => a === b,
  "not-equal": (a, b) => a !== b,
};

export const stringMatchingFields = [
  "dept",
  "id",
  "instructor",
  "title",
  "uuid",
];

export const insightUBCDemoData = [
  {
    course_avg: 85.2,
    course_pass: 200,
    course_fail: 15,
    course_audit: 5,
    course_year: 2023,
    course_dept: "CS",
    course_id: "CPSC110",
    course_instructor: "Dr. Smith",
    course_title: "Introduction to Programming",
    course_uuid: "CPSC110-2023S",
  },
  {
    course_avg: 90.1,
    course_pass: 180,
    course_fail: 10,
    course_audit: 12,
    course_year: 2022,
    course_dept: "MATH",
    course_id: "MATH100",
    course_instructor: "Dr. Lee",
    course_title: "Calculus I",
    course_uuid: "MATH100-2022W",
  },
  {
    course_avg: 78.3,
    course_pass: 220,
    course_fail: 25,
    course_audit: 8,
    course_year: 2021,
    course_dept: "PHYS",
    course_id: "PHYS101",
    course_instructor: "Dr. Johnson",
    course_title: "General Physics I",
    course_uuid: "PHYS101-2021F",
  },
  {
    course_avg: 92.5,
    course_pass: 150,
    course_fail: 5,
    course_audit: 2,
    course_year: 2020,
    course_dept: "CHEM",
    course_id: "CHEM120",
    course_instructor: "Dr. Brown",
    course_title: "Organic Chemistry",
    course_uuid: "CHEM120-2020F",
  },
  {
    course_avg: 87.4,
    course_pass: 210,
    course_fail: 18,
    course_audit: 10,
    course_year: 2019,
    course_dept: "BIO",
    course_id: "BIOL200",
    course_instructor: "Dr. Davis",
    course_title: "Cell Biology",
    course_uuid: "BIOL200-2019S",
  },
  {
    course_avg: 54.5,
    course_pass: 206,
    course_fail: 5,
    course_audit: 2,
    course_year: 2018,
    course_dept: "BIO",
    course_id: "BIO281",
    course_instructor: "Dr. Johnson",
    course_title: "Genetics",
    course_uuid: "BIO281-2018S",
  },
  {
    course_avg: 67.8,
    course_pass: 231,
    course_fail: 15,
    course_audit: 19,
    course_year: 2021,
    course_dept: "PHYS",
    course_id: "PHYS183",
    course_instructor: "Dr. Johnson",
    course_title: "Quantum Mechanics",
    course_uuid: "PHYS183-2021W",
  },
  {
    course_avg: 63.6,
    course_pass: 261,
    course_fail: 6,
    course_audit: 14,
    course_year: 2018,
    course_dept: "CS",
    course_id: "CS420",
    course_instructor: "Dr. Lee",
    course_title: "Algorithms",
    course_uuid: "CS420-2018S",
  },
  {
    course_avg: 89.4,
    course_pass: 207,
    course_fail: 31,
    course_audit: 16,
    course_year: 2021,
    course_dept: "MATH",
    course_id: "MATH296",
    course_instructor: "Dr. Brown",
    course_title: "Probability Theory",
    course_uuid: "MATH296-2021F",
  },
];
